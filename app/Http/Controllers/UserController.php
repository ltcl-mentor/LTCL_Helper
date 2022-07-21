<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Student;
use App\Models\Question;
use App\Models\Slack;

class UserController extends Controller
{
    /**
     * 削除実行
     */
    public function delete(User $user, Student $student)
    {
        // 削除ユーザが作成した質問データの作成者カラムの値を０に変更
        $created_questions = Question::where('user_id', $user->id)->get();
        foreach($created_questions as $question){
            $question->user_id = 0;
            $question->save();
        }

        // 該当するstudentsテーブルのデータとquestion_userテーブル（質問閲覧履歴）データを削除
        User::userDelete($user);
    }

    /**
     * ユーザロック解除実行
     */

    public function unlock(User $user)
    {
        // 該当ユーザのロックを解除
        $user->lock = false;
        $user->save();

        // 受講生のデータだった場合は受講生テーブルにも反映
        if(Student::where('user_id', $user->id)->exists()){
            $student = Student::firstWhere('user_id', $user->id);
            $student->lock = false;
            $student->save();
        }

        $message = "ユーザのロックが解除されました。\n該当ユーザ：" . $user->name;
        // Slack::sendMessage($message);
    }

    public static function backup() {
        User::registerStudents();
        return User::getAllStudentsName();
    }
}
