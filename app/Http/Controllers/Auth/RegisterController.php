<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\User;
use App\Student;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;
    
    // 管理者の新規作成画面表示
    public function showRegistrationForm()
    {
        return view('User.register');
    }
    
    // 管理者の新規作成実行（デフォルトのものからログイン処理を削除、redirectを指定）
    public function register(Request $request)
    {
        $this->validator($request->all())->validate();

        event(new Registered($user = $this->create($request->all())));

        return $this->registered($request, $user)
                        ?: redirect('/users/index');
    }
    
    // 受講生の新規作成画面表示
    public function showPublicRegistrationForm()
    {
        return view('User.publicRegister');
    }
    
    // 受講生の新規作成実行
    public function publicRegister(Request $request)
    {
        $this->publicValidator($request->all())->validate();
        
        for($i=1;$i<=20;$i++){
            if($request["name$i"]){
                $user = User::create([
                    'name' => $request["name$i"],
                    'password' => Hash::make($request['password']),
                    'is_admin' => null,
                ]);
                
                Student::create([
                    'name' => $request["name$i"],
                    'password' => $request['password'],
                    'user_id' => $user->id,
                ]);
            }
            
        }

        return redirect('/users/index');
    }

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    // public function __construct()
    // {
    //     $this->middleware('guest');
    // }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => ['required', 'string', 'max:8'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
    }
    
    protected function publicValidator(array $data)
    {
        return Validator::make($data, [
            'name1' => ['string'],
            'name2' => ['string'],
            'name3' => ['string'],
            'name4' => ['string'],
            'name5' => ['string'],
            'name6' => ['string'],
            'name7' => ['string'],
            'name8' => ['string'],
            'name9' => ['string'],
            'name10' => ['string'],
            'password' => ['required', 'string'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'password' => Hash::make($data['password']),
            'is_admin' => 'staff',
        ]);
    }
}
