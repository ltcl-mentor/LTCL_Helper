import React, { useCallback } from 'react';
import { useForm } from '@inertiajs/inertia-react';

// ログイン処理の関数
export const useLogin = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        password: '',
        remember: '',
    });

    // ログイン処理
    const submit = (event) => {
        event.preventDefault();
        post(route('login'));
    };

    // ログイン状態保持チェックボックス
    const onHandleChange = useCallback((event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    });

    return [{ data, processing, errors }, { onHandleChange, submit }];
};
