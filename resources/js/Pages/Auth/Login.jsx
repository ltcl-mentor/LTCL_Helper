import React from 'react';
import Button from '@/Components/Atom/Default/Button';
import Checkbox from '@/Components/Atom/Default/Checkbox';
import Input from '@/Components/Atom/Default/Input';
import Label from '@/Components/Atom/Default/Label';
import ValidationErrors from '@/Components/Atom/Default/ValidationErrors';
import { useForm } from '@inertiajs/inertia-react';

// ログイン画面
const Login = ({ status }) => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        password: '',
        remember: '',
    });

    // ログイン状態保持チェックボックス
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    // ログイン処理
    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <>
            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <div className="w-screen h-screen bg-[url('/images/login_image.png')]">
                <form className="w-52 absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4" onSubmit={submit}>
                    <h1 className='text-4xl text-purple-700 text-center'>Welcome</h1>

                    {/* ID */}
                    <div>
                        <Label className="text-purple-700 font-bold" forInput="name" value="ID" />
                        <Input
                            type="text"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            handleChange={onHandleChange}
                        />
                    </div>

                    {/* パスワード */}
                    <div className="mt-4">
                        <Label className="text-purple-700 font-bold" forInput="password" value="Pass" />
                        <Input
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="current-password"
                            handleChange={onHandleChange}
                        />
                    </div>

                    <div className="mt-4">
                        <label className="flex items-center">
                            <Checkbox name="remember" value={data.remember} handleChange={onHandleChange} />
                            <span className="ml-2 text-sm text-purple-700 font-bold">ログイン状態を保持</span>
                        </label>
                    </div>

                    <div className="mt-4">
                        <Button className="justify-center w-full bg-purple-800 font-bold" processing={processing}>
                            Login
                        </Button>
                    </div>

                    <ValidationErrors errors={errors} />
                </form>
            </div>
        </>
    );
};

export default Login;
