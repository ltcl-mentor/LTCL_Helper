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
    
    public function student()
    {
        return $this->hasOne('App\Student');
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
     * スプレッドシートのID一覧から受講生名を取得（特定の受講生）
     */
    public static function getStudentName($user_name)
    {
        $users = self::getStudentsApiData()["values"];
        array_splice($users, 0, 2);
        
        foreach($users as $student) {
            if ($student[7] == $user_name) {
                $user_name = $student[5] . "(ID：" . $student[7] . ")";
                break;
            }
        }
        
        return $user_name;
    }
    
    /**
     * スプレッドシートのID一覧から受講生名を取得（全受講生）
     */
    public static function getAllStudentsName()
    {
        $users = self::getStudentsApiData()["values"];
        array_splice($users, 0, 2);
        $students = Student::orderBy('password', 'asc')->get();
        
        // 受講生名追加
        $all_students = [];
        foreach($students as $student) {
            $key = array_search($student->name, array_column($users, 7));
            if ($key !== false) {
                $student['student_name'] = $users[$key][5];
            }
        }
        
        return $students;
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
            ['query' => ['key' => env('GoogleSheetsKey'), 'majorDimension' => 'ROWS']]
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
        
        // 受講生情報取得
        $students = $datas['values'];
        array_splice($students, 0, 2);
        
        foreach($students as $student) {
            $password = 'ltcl' . substr($student[1], 2) . sprintf('%02d', $student[2]);

            // 値があるかつ登録されていないユーザーのみ追加
            if ($student[7] != "" && !User::where('name', $student[7])->exists()) {
                $user = User::create([
                    'name' => $student[7],
                    'password' => Hash::make($password),
                    'is_admin' => null,
                ]);
                
                Student::create([
                    'name' => $student[7],
                    'password' => $password,
                    'user_id' => $user->id,
                ]);
            }
        }
    }
    
    public static function deleteGraduates()
    {
        // 4ヶ月前の年月を取得し、文字列のフォーマットを整える
        $three_month_ago = new Carbon("-4 month");
        $formated_year_and_month = $three_month_ago->format('ym');
        $deletion_target = "ltcl" . $formated_year_and_month;
        
        $users_data = Self::get();

        foreach($users_data as $user_data)
        {
            if(Hash::check($deletion_target, $user_data->password)){
                $user_data->delete();
                $user_data->student()->delete();
                logger("data was deleted");
            }else{
                logger("doesn't match");   
            }
        }
    }
}
