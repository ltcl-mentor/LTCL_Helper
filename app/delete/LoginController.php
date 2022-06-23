<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Lang;
use Illuminate\Http\Response;
use App\User;
use App\Student;
use App\Slack;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    // 入力値の属性名をnameに変更
    public function username()
    {
        return 'name';
    }

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    // ログイン処理
    public function login(Request $request)
    {
        // ロック中のユーザがログインしようとした際は弾く
        if(User::where('name', $request->name)->exists()){
            $user = User::firstWhere('name', $request->name);

            if($user->lock){
                return redirect("/lockout");
            }
        }

        $this->validateLogin($request);

        // If the class is using the ThrottlesLogins trait, we can automatically throttle
        // the login attempts for this application. We'll key this by the username and
        // the IP address of the client making these requests into this application.
        if (method_exists($this, 'hasTooManyLoginAttempts') &&
            $this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);

            return $this->sendLockoutResponse($request);
        }

        if ($this->attemptLogin($request)) {
            return $this->sendLoginResponse($request);
        }

        // If the login attempt was unsuccessful we will increment the number of attempts
        // to login and redirect the user back to the login form. Of course, when this
        // user surpasses their maximum number of attempts they will get locked out.
        $this->incrementLoginAttempts($request);

        return $this->sendFailedLoginResponse($request);
    }

    public function decayMinutes()
    {
        return property_exists($this, 'decayMinutes') ? $this->decayMinutes : 60;
    }

    /**
     * ロックアウト処理
     * 6回連続でログインに失敗したユーザをロック
     */
    protected function sendLockoutResponse(Request $request)
    {
        $user = User::firstWhere('name', $request->name);
        $user_name = $user->name;

        // 受講生の場合、スプレッドシートから取ってきた名前を通知
        $users = User::getStudentsApiData()["values"];
        array_splice($users, 0, 2);

        if ($user->is_admin == null) {
            foreach($users as $student) {
                if ($student[7] == $user_name) {
                    $user_name = $student[5] . "(ID：" . $student[7] . ")";
                    break;
                }
            }
        }

        // 入力されたnameに該当するユーザデータが存在した場合にロック
        if($user !== null){
            // 該当ユーザのロックを有効化
            $user->lock = true;
            $user->save();

            // 受講生のデータだった場合は受講生テーブルにも反映
            if(Student::where('user_id', $user->id)->exists()){
                $student = Student::firstWhere('user_id', $user->id);
                $student->lock = true;
                $student->save();
            }

            $message = "ユーザがロックされました。\n該当ユーザ：" . $user_name . "さん";
            Slack::sendMessage($message, "mentor");

            $this->clearLoginAttempts($request);

            return redirect("/lockout");

        // 該当ユーザが存在しない場合は1時間入力不可にする
        }else{
            $seconds = $this->limiter()->availableIn(
                $this->throttleKey($request)
            );

            throw ValidationException::withMessages([
                $this->username() => [Lang::get('auth.throttle', [
                    'seconds' => $seconds,
                    'minutes' => ceil($seconds / 60),
                ])],
            ])->status(Response::HTTP_TOO_MANY_REQUESTS);
        }
    }

    /**
     * ロックアウト時の画面表示
     */
    public function lockout()
    {
        return view('lockout');
    }
}
