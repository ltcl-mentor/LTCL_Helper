import React from 'react';
import { useLogin } from '@/Logics/Login';
import { BackImage, MiddleContent, Welcome } from '@/Styles/Auth/Login';
import Button from '@/Components/Default/Button';
import Input from '@/Components/Auth/Input';
import Label from '@/Components/Auth/Label';
import RememberBox from '@/Components/Auth/rememberBox';
import ValidationErrors from '@/Components/Default/ValidationErrors';

/**
 * ログインページ親コンポーネント
 */
const LoginForm = () => {
    const [{ data, processing, errors }, { onHandleChange, submit }] = useLogin();

    return (
        <BackImage>
            <MiddleContent>
                <Welcome>Welcome</Welcome>
                <form onSubmit={submit}>
                    <Label className="text-purple font-bold" forInput="name" value="ID" />
                    <Input
                        type="text"
                        name="name"
                        value={data.name}
                        autoComplete="username"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />
                    <Label className="text-purple font-bold mt-4" forInput="password" value="Pass" />
                    <Input
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="current-password"
                        handleChange={onHandleChange}
                    />
                    <RememberBox data={data} onHandleChange={onHandleChange} />
                    <Button className="justify-center w-full mt-4" processing={processing}>
                        Login
                    </Button>
                    <ValidationErrors errors={errors} />
                </form>
            </MiddleContent>
        </BackImage>
    );
};

export default LoginForm;
