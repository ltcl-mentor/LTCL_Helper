import React, { useState, useCallback } from "react";
import axios from "axios";
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
            const res = await axios.post(route('delete.info', {'info': deleteInfo}));
            setInfos(res.data.infos);
            setDates(res.data.dates);
            setDeleteOpen(false);
            setType("user");
        })();
    });

    return [{ open, type, events, dates, infos }, { handleOpen, handleClose, handleDelete }];
};
