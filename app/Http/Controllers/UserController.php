<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
    public function index(User $user)
    {
        return view('user')->with([
            'staffs' => $user->where('is_admin', 'staff')->get(),
            'publics' => $user->where('is_admin', null)->get(),
        ]);
    }
    
    public function delete(User $user)
    {
        $user->delete();
        return redirect('/users/index');
    }
}
