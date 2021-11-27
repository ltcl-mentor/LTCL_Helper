<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Student;
use App\Question;

class UserController extends Controller
{
    /**
     * 削除実行
     */
    public function delete(User $user, Student $student)
    {
        // 該当するstudentsテーブルのデータとquestion_userテーブル（質問閲覧履歴）データを削除
        User::userDelete($user);
        
        return [
            'staffs' => User::where('is_admin','staff')->get(),
            'students' => Student::orderBy('password', 'asc')->get(),
        ];
    }
    
    /**
     * 初期画面表示
     */
    // public function index(User $user, Student $student)
    // {
    //     return view('Mentor.User.index')->with([
    //         'staffs' => $user->where('is_admin', 'staff')->get(),
    //         'students' => $student->orderBy('password', 'asc')->get(),
    //     ]);
    // }
}
