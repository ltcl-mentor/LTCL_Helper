import React, { useCallback } from "react";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";

// お知らせ保存
export const store = ({ input, checked, setValidation }) => {
    const submit = useCallback(async () => {
        // バリデーションチェック
        let error = {
            isNext: true,
            title: { key: false, message: "" },
            body: { key: false, message: "" },
            target: { key: false, message: "" },
            date: { key: false, message: "" },
            slackBody: { key: false, message: "" },
            slackDate: { key: false, message: "" },
        };

        // お知らせ内容が入力されていない時
        if (input.title.trim().length === 0) {
            error.title.key = true;
            error.isNext = false;
            error.title.message = "お知らせタイトルを入力してください";
        }

        //本文が入力されてない時
        if (input.body.trim().length === 0) {
            error.body.key = true;
            error.isNext = false;
            error.body.message = "お知らせ詳細を入力してください";
        }

        //対象が入力されてない時
        if (input.target.length === 0) {
            error.target.key = true;
            error.isNext = false;
            error.target.message = "対象者を選択してください";
        }

        // 公開日を設定していない時
        if (input.date.length === 0) {
            error.date.key = true;
            error.isNext = false;
            error.date.message = "日付を入力してください";
        }

        // slack通知をする場合
        if (checked) {
            // 通知日を設定していない場合
            if (input.slackDate.length === 0) {
                error.slackDate.key = true;
                error.isNext = false;
                error.slackDate.message = "日付を入力してください";
            }

            // 通知内容を入力していない時
            if (input.slackBody.trim().length === 0) {
                error.slackBody.key = true;
                error.isNext = false;
                error.slackBody.message = "通知する内容を入力してください";
            }
        }

        // 入力されていないものがないかの確認
        if (!error.isNext) {
            setValidation({
                title : { error: error.title.key, message: error.title.message },
                body: { error: error.body.key, message: error.body.message },
                target: { error: error.target.key, message: error.target.message },
                date: { error: error.date.key, message: error.date.message },
                slackBody: { error: error.slackBody.key, message: error.slackBody.message },
                slackDate: { error: error.slackBody.key, message: error.slackBody.message },
            });
            return false;
        }

        await axios.post(route('store.info'), input);
        Inertia.get(route('home'));
    });

    return submit;
}
