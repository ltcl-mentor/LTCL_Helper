import React, { useCallback } from "react";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";

// イベント保存
export const store = ({ input, validate, setValidate }) => {
    const submit = useCallback(async () => {
        let validationKey = false;

        // 名前が入力されていない時
        if (input.name.length === 0) {
            validationKey = true;
            setValidate({ ...validate, name: { error: true, message: "入力してください" } });
        }

        // 通知テンプレートを設定していない時
        if (input.template.trim().length === 0) {
            validationKey = true;
            setValidate({ ...validate, template: { error: true, message: "入力してください" } });
        }

        if (validationKey) return false;

        await axios.post(route('store.event'), input);
        Inertia.get(route('home', { page: 'manage' }));
    });

    return submit;
};
