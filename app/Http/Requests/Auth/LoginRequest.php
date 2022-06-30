<?php

namespace App\Http\Requests\Auth;

use Illuminate\Auth\Events\Lockout;
use Illuminate\Support\Str;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Lang;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use App\Models\Student;
use App\Models\Slack;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => ['required', 'string'],
            'password' => ['required', 'string'],
        ];
    }

    /**
     * 認証確認
     */
    public function authenticate()
    {
        $this->ensureIsNotRateLimited();

        // 認証に失敗した場合
        if (! Auth::attempt($this->only('name', 'password'), $this->boolean('remember')))
        {
            // 試行回数を増やす
            RateLimiter::hit($this->throttleKey(), 3600);

            // バリデーションメッセージ表示
            throw ValidationException::withMessages([
                'name' => trans('auth.failed'),
            ]);
        }

        // 認証に成功した場合。試行回数をリセット
        RateLimiter::clear($this->throttleKey());
    }

    /**
     * ログイン要求がレート制限されていないことを確認する
     */
    public function ensureIsNotRateLimited()
    {
        // 6回認証に失敗していない場合は処理をスキップ
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 6)) return;

        event(new Lockout($this));

        // 上のLockoutイベントにまとめられるかもしれない
        $this->sendLockoutResponse($this->input('name'));

        // 試行回数が増えるまでの残り秒数を返す
        $seconds = RateLimiter::availableIn($this->throttleKey());
        throw ValidationException::withMessages([
            'name' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * Get the rate limiting throttle key for the request.
     *
     * @return string
     */
    public function throttleKey()
    {
        return Str::lower($this->input('name')).'|'.$this->ip();
    }

    /**
     * ロックアウト処理
     * 6回連続でログインに失敗したユーザをロック
     */
    protected function sendLockoutResponse(String $user_name)
    {
        $user = User::firstWhere('name', $user_name);

        // 入力されたnameに該当するユーザデータが存在した場合にロック
        if ($user !== null)
        {
            // 受講生の場合、スプレッドシートから取ってきた名前を通知
            $users = User::getStudentsApiData()["values"];
            array_splice($users, 0, 2);

            if ($user->is_admin == null)
            {
                foreach($users as $student)
                {
                    if ($student[7] == $user_name)
                    {
                        $user_name = $student[5] . "(ID：" . $student[7] . ")";
                        break;
                    }
                }
            }

            // 該当ユーザのロックを有効化
            $user->lock = true;
            $user->save();

            // 受講生のデータだった場合は受講生テーブルにも反映
            if (Student::where('user_id', $user->id)->exists())
            {
                $student = Student::firstWhere('user_id', $user->id);
                $student->lock = true;
                $student->save();
            }

            // slackに通知
            $message = "ユーザがロックされました。\n該当ユーザ：" . $user_name . "さん";
            // Slack::sendMessage($message, "mentor");

            // 認証情報をクリア
            RateLimiter::clear($this->throttleKey());

            return redirect()->route('lockout');

        // 該当ユーザが存在しない場合は1時間入力不可にする
        } else {
            $seconds = RateLimiter::availableIn($this->throttleKey());
            throw ValidationException::withMessages([
                $this->input('name') => [Lang::get('auth.throttle', [
                    'seconds' => $seconds,
                    'minutes' => ceil($seconds / 60),
                ])],
            ])->status(Response::HTTP_TOO_MANY_REQUESTS);
        }
    }
}
