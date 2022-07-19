import React, { useCallback } from "react";
import { Inertia } from "@inertiajs/inertia";
import axios from "axios";

// 管理者登録
export const registerAdmin = ({ setValidate, clickCount, setClickCount, input, validate }) => {
    const submitAdmin = useCallback(async () => {
        let validationKey = false;
        setValidate({ name: "", password: "", confirmPassword: "" });

        if (clickCount !== 0) return false;

        setClickCount(1);

        // バリデーション
        // パスワード不一致
        if (input.password !== input.confirmPassword) {
            setValidate({ ...validate, password: { error: true, message: "パスワードが一致しません。"}});
            validationKey = true;
        }

        // 名前が空欄
        if (input.name.length == 0) {
            setValidate({ ...validate, name: { error: true, message: "名前を入力してください。"}});
            validationKey = true;
        }

        // 確認用パスワードが空欄
        if (input.confirmPassword.length < 8) {
            setValidate({ ...validate, confirmPassword: { error: true, message: "パスワード(確認)は8文字以上を入力してください。"}});
            validationKey = true;
        }

        // パスワードが8文字以下
        if (input.password.length < 8) {
            setValidate({ ...validate, password: { error: true, message: "パスワードは8文字以上を入力してください。"}});
            validationKey = true;
        }

        if (validationKey) {
            setClickCount(0);
            return false;
        }

        await axios.post(route('register'), {
            name: input.name,
            password: input.password
        })
        .catch(err => { setClickCount(0); });
        Inertia.get(route('home', { page: 'manage' }));
    });

    return submitAdmin;
};
