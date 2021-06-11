<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Student;

class UserController extends Controller
{
    public function index(User $user, Student $student)
    {
        return view('User.index')->with([
            'staffs' => $user->where('is_admin', 'staff')->get(),
            'students' => $student->orderBy('password', 'asc')->get(),
        ]);
    }
    
    public function delete(User $user)
    {
        Student::where('user_id', $user->id)->delete();
        $user->questions()->detach();
        $user->delete();
        return redirect('/users/index');
    }
}
