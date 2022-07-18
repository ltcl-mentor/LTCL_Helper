import React, { useState, useCallback } from "react";
import { useGetInfo } from "../../getInfo";

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

    return [{ open, link, validate, input, setValidate }, { handleOpen, handleClose, handleChange }];
};
