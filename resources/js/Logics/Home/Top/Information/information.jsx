import React, { useState, useCallback } from "react";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
import { useGetInformation } from "./getInfo";

// informationのロジック
export const useInformation = ({ deleteInfo }) => {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("user");
    const [events, setEvents] = useState([]);
    const [dates, setDates] = useState([]);
    const [infos, setInfos] = useState([]);
    useGetInformation({ setInfos, setDates, setEvents });

    // モーダル開閉
    const handleOpen = useCallback((type) => {
        setOpen(true);
        setType(type);
    });
    const handleClose = useCallback(() => {
        setOpen(false);
        setType("user");
    });

    // 削除実行
    const handleDelete = useCallback(() =>{
        (async() => {
            await axios.post(route('delete.info', {'info': deleteInfo}));
            Inertia.get(route('home'));
        })();
    });

    return [{ open, type, events, dates, infos }, { handleOpen, handleClose, handleDelete }];
};
