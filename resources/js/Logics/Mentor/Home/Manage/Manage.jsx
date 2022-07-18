import React, { useState, useCallback } from "react";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
import { useGetInfo } from "./getInfo";

// Manageのロジック
export const useManage = () => {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("user");
    const [event, setEvent] = useState([]);
    const [events, setEvents] = useState([]);
    const [value, setValue] = useState(0);
    const [students, setStudents] = useState({
        eventList: [],
        currentPage: 1,
        itemsCountPerPage: 1,
        totalItemsCount: 1,
        pageRangeDisplayed: 10,
        lastPage: 0
    });
    const [staffs, setStaffs] = useState({
        eventList: [],
        currentPage: 1,
        itemsCountPerPage: 1,
        totalItemsCount: 1,
        pageRangeDisplayed: 10,
        lastPage: 0
    });
    useGetInfo({ setStudents, setStaffs, setEvents });

    // タブ切り替え用
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // モーダル開閉
    const handleOpen = type => {
        setOpen(true);
        setType(type);
    };
    const handleClose = useCallback(() => {
        setOpen(false);
        setType("user");
    });

    const clickEvent = useCallback(event => {
        handleOpen("show_event");
        setEvent(event);
    });

    // 質問のバックアップ
    const backupQuestion = useCallback(async () => {
        if (window.confirm("質問のバックアップを復元しますか？")) {
            await axios.post(route("backup.question"));
            Inertia.get(route('home', { page: "manage" }))
        }
    });

    // 受講生のバックアップ
    const backupStudent = useCallback(async () => {
        if (window.confirm("受講生を一括登録しますか？")) {
            const res = await axios.post(route('backup.user'));
            setStudents({
                eventList: res.data.data,
                itemsCountPerPage: res.data.per_page,
                totalItemsCount: res.data.total,
                currentPage: res.data.current_page,
                pageRangeDisplayed: 10,
                lastPage: res.data.last_page
            });
            Inertia.get(route('home', { page: "manage" }))
        }
    });

    return [
        { open, type, event, value, students, staffs, events, setStaffs, setStudents },
        { handleOpen, handleClose, clickEvent, backupQuestion, backupStudent, handleChange }
    ];
};
