<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Student;
use App\Question;

class UserController extends Controller
{
    // 初期画面表示
    public function index(User $user, Student $student)
    {
        return view('Mentor.User.index')->with([
            'staffs' => $user->where('is_admin', 'staff')->get(),
            'students' => $student->orderBy('password', 'asc')->get(),
        ]);
    }
    
    // 削除実行
    public function delete(User $user)
    {
        User::userDelete($user);
        return redirect('/users/index');
    }
}
