import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
import { useGetInfo } from "./getInfo";

// addEventのロジック
export const useAddEvent = () => {
    const [open, setOpen] = useState(false);
    const [link, setLink] = useState("");
    const [input, setInput] = useState({ name: "", template: "" });
    const [validate, setValidate] = useState({
        name: { error: false, message: "" },
        template: { error: false, message: "" }
    });
    useGetInfo({ setLink });

    const handleOpen = useCallback(() => setOpen(true));
    const handleClose = useCallback(() => setOpen(false));

    // イベント名とslackテンプレートの入力
    const handleChange = useCallback(event => {
        const value = event.target.value;
        const name = event.target.name;

        if (value.length == 0) {
            setValidate({ ...validate, [name]: { error: true, message: "入力してください" } });
        } else {
            setValidate({ ...validate, [name]: { error: false, message: "" } });
        }
        setInput({ ...input, [name]: value });
    });

    // イベント保存
    const store = useCallback(async () => {
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

    return [{ open, link, validate, input }, { handleOpen, handleClose, handleChange, store }];
};
