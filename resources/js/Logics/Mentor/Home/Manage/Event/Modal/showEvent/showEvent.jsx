import React, { useState, useCallback } from 'react';
import { useGetInfo } from "../../getInfo";

// showEventのロジック
export const useShowEvent = ({ event }) => {
    const [link, setLink] = useState('');
    const [input, setInput] = useState({ name: event.name, template: event.template });
    const [validate, setValidate] = useState({
        name: { error: false, message: "" },
        template: { error: false, message: "" },
        readOnly: true
    });
    const [state, setState] = useState('normal');
    const [open, setOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    useGetInfo({ setLink });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleDeleteOpen = () => setDeleteOpen(true);

    // 名前、テンプレートの入力
    const handleChange = useCallback((event) => {
        const value = event.target.value;
        const name = event.target.name;

        if (value.length == 0) {
            setValidate({ ...validate, [name]: { error: true, message: "入力してください" } });
        } else {
            setValidate({ ...validate, [name]: { error: false, message: "" } });
        }
        setInput({ ...input, [name]: value });
    });

    const handleState = useCallback((status) => {
        if (status == "edit") {
            setValidate({ ...validate, readOnly: true });
            setState("normal");
            setInput({ name: event.name, template: event.template });
        } else {
            setValidate({ ...validate, readOnly: false });
            setState("edit");
        }
    });

    return [
        { link, input, validate, setValidate, state, open, deleteOpen, setDeleteOpen },
        { handleOpen, handleClose, handleDeleteOpen, handleChange, handleState }
    ];
};
