<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Question;
use App\User;
use App\Student;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'password', 'is_admin'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    
    /**
     * リレーション関係
     */
    public function questions()
    {
        return $this->belongsToMany('App\Question')->withPivot(['created_at'])->orderBy('pivot_created_at', 'desc');
    }
    
    /**
     * 質問作成者名取得
     */
    public static function getAuthorName($question_id)
    {
        $question = Question::find($question_id);
        $author = self::find($question->user_id);
        return $author->name;
    }
    
    /**
     * ログインユーザ情報取得
     */
    public static function getUser()
    {
        $user = Auth::user();
        
        if($user->is_admin !== "staff"){
            $student = Student::firstWhere('user_id', $user->id);
            if($student){
                $user->entry = "20" . substr($student->password, 4, 2) . "年" . substr($student->password, 6, 2) . "月";
            }
        }
        
        $user->reply_count = Question::replyCheck();
        
        return $user;
    }
    
    /**
     * 削除対象のユーザに関連するstudentsテーブルのデータとquestion_userテーブル（質問閲覧履歴）データを削除
     */
    public static function userDelete($data)
    {
        Student::where('user_id', $data->id)->delete();
        
        $data->questions()->detach();
        
        $related_questions = Question::where('user_id', $data->id)->get();
        
        foreach($related_questions as $related_question){
            $related_question['user_id'] = 0;
            $related_question->save();
        }
        
        $data->delete();
    }
    
    /**
     * スプレッドシートから未登録の受講生情報を取得
     */
    public static function getUnRegisterApiData()
    {
        $client = new \GuzzleHttp\Client();
        $url = 'https://sheets.googleapis.com/v4/spreadsheets/'. env('GoogleSheetsStudentsID') .'/values/アプリ未登録ID';
        
        $response = $client->request(
            'GET',
            $url,
            ['query' => ['key' => env('GoogleSheetsKey'), 'majorDimension' => 'COLUMNS']]
        );
        
        return json_decode($response->getBody(), true);
    }
    
    /**
     * スプレッドシートから受講生情報を取得
     */
    public static function getStudentsApiData()
    {
        $client = new \GuzzleHttp\Client();
        $url = 'https://sheets.googleapis.com/v4/spreadsheets/'. env('GoogleSheetsStudentsID') .'/values/ID';
        
        $response = $client->request(
            'GET',
            $url,
            ['query' => ['key' => env('GoogleSheetsKey'), 'majorDimension' => 'ROWS']]
        );
        
        return json_decode($response->getBody(), true);
    }
    
    /**
     * 受講生情報をテーブルに追加
     */
    public static function registerStudents()
    {
        $date = new Carbon();
        $datas = self::getUnRegisterApiData();
        
        // 受講生ID
        $students = $datas['values'][7];
        array_splice($students, 0, 2);
        $password = 'ltcl' . $date->year%100 . sprintf('%02d', $date->month);
        
        foreach($students as $student) {
            
            // 値があるかつ登録されていないユーザーのみ追加
            if ($student != "" && !User::where('name', $student)->exists()) {
                $user = User::create([
                    'name' => $student,
                    'password' => Hash::make($password),
                    'is_admin' => null,
                ]);
                
                Student::create([
                    'name' => $student,
                    'password' => $password,
                    'user_id' => $user->id,
                ]);
            }
        }
    }
}
