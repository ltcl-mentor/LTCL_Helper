<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Student;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Redirect;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        // $request->validate([
        //     'name' => 'required|string|max:255',
        //     'email' => 'required|string|email|max:255|unique:users',
        //     'password' => ['required', 'confirmed', Rules\Password::defaults()],
        // ]);

        // $user = User::create([
        //     'name' => $request->name,
        //     'password' => Hash::make($request->password),
        //     'is_admin' => "staff",
        // ]);

        // event(new Registered($user));

        // Auth::login($user);

        // return redirect(RouteServiceProvider::HOME);
    }

    /**
     * 管理者の新規作成実行
     */
    public function adminStore(Request $request)
    {
        $user = User::create([
            'name' => $request['name'],
            'password' => Hash::make($request['password']),
            'is_admin' => "staff",
        ]);

        return Redirect::route('home', ['page' => 'manage']);
    }

    /**
     * 受講生の新規作成実行
     */
    public function studentStore(Request $request)
    {
        foreach ($request['names'] as $student) {
            $username = $student['name'];

            if ($username && !User::where('name', $username)->exists()){
                $user = User::create([
                    'name' => $username,
                    'password' => Hash::make($request['password']),
                    'is_admin' => null,
                ]);

                Student::create([
                    'name' => $username,
                    'password' => $request['password'],
                    'user_id' => $user->id,
                ]);
            }
        }
    }
}
