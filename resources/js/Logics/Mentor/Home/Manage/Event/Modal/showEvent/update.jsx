import React, { useCallback } from 'react';
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia';

// イベント編集
export const update = ({ event, input, validate, setValidate }) => {
    const updated = useCallback(async () => {
        let validationKey = false;
        // バリデーションチェック
        // 名前が入力されていない時
        if (input.name.length === 0) {
            validationKey = true;
            setValidate({ ...validate, name: { error: true, message: "入力してください" } });
        }

        // 通知テンプレートを設定していない時
        if (input.template.trim().length === 0) {
            validationKey = true;
            setValidate({ ...validate, template: { error: true, message: "入力してください", readOnly: true } });
        }

        if (validationKey) return false;

        await axios.post("/api/events/" + event.id + "/update", input);
        Inertia.get(route('home', { page: 'manage' }));
    });

    return updated;
};
