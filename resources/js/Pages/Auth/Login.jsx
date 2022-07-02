import React from 'react';
import LoginForm from '@/Components/Auth/LoginForm';

/**
 * ログインページ
 */
const Login = ({ status }) => {
    return (
        <>
            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <LoginForm />
        </>
    );
};

export default Login;
