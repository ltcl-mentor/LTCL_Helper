import React, { useState, useCallback } from "react";
import { Inertia } from "@inertiajs/inertia";

// contactのロジック
export const useContact = () => {
    const [open, setOpen] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const [input, setInput] = useState({ body: "", category: "" });
    const [validation, setValidation] = useState({
        body: { error: false, message: "" },
        category: { error: false, message: "" },
    });

    // 送信確認
    const confirm = useCallback((status) => {
        if (status) {
            if (input.body.trim().length !== 0 && input.category !== "") {
                setOpen(true);
            } else {
                //本文のバリデーション
                if (input.body.trim().length === 0) {
                    setValidation({ ...validation, body: { error: true, message: "お問い合わせ内容を入力してください" } });
                }

                //カテゴリーのバリデーション
                if (input.category.trim().length === 0) {
                    setValidation({ ...validation, category: { error: true, message: "お問い合わせ項目を入力してください" } });
                }
            }
        } else {
            setOpen(false);
        }
    });

    // お問い合わせ送信
    const handleSubmit = useCallback(() => {
        if (clickCount === 0) {
            setClickCount(1);
            axios
                .post(route('contact'), { message: input.category + input.contact })
                .catch(err => setClickCount(0));
            Inertia.get(route('home'));
        } else {
            return false;
        }
    });

    const decisionErrorMessage = (target, value) => {
        let message;
        let errorMessage;
        switch (target) {
            case "body":
                message = value;
                errorMessage = "お問い合わせ内容を入力してください";
                break;
            case "category":
                message = "カテゴリー：" + value + "\n";
                errorMessage = "お問い合わせ内容を選択してください";
                break;
        }

        return { message, errorMessage }
    }

    // お問い合わせ内容、カテゴリー入力
    const handleChange = useCallback((event) => {
        const value = event.target.value;
        const name = event.target.name;
        const { message, errorMessage } = decisionErrorMessage(name, value);

        if (value.length === 0) {
            setValidation({ ...validation, [name]: { error: true, message: errorMessage } });
        } else {
            setValidation({ ...validation, [name]: { error: false, message: "" } });
        }
        setInput({ ...input, [name]: message });
    });


    return [{ open, input, validation, }, { handleChange, confirm, handleSubmit }];
};
