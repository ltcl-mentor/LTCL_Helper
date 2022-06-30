<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\User;

class AuthenticatedSessionController extends Controller
{
    /**
     * ログイン画面表示
     */
    public function create()
    {
        return Inertia::render('Auth/Login', ['status' => session('status')]);
    }

    /**
     * ログイン処理
     */
    public function store(LoginRequest $request)
    {
        $locking = $this->locking($request['name']);
        if ($locking) return $locking;

        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(RouteServiceProvider::HOME);
    }

    /**
     * ログアウト処理
     */
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }

    /**
     * ロック中ユーザーをはじく
     */
    public function locking(String $user_name)
    {
        $user = User::firstWhere('name', $user_name);
        if ($user && $user->lock) return redirect()->route('lockout');
    }
}
