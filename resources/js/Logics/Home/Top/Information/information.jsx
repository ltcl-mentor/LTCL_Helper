import React, { useState, useCallback } from "react";
import axios from "axios";
import Content from '@/Components/Public/Home/Top/Information/content';
import { AddInfoButton } from "@/Styles/Public/Home/Top/Information/information";
import { useGetInfo } from "./getInfo";

// informationのロジック
export const useInformation = ({ isAdmin, isWide }) => {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("user");
    const [dates, setDates] = useState([]);
    const [infos, setInfos] = useState([]);
    const [events, setEvents] = useState([]);
    const [deleteInfo, setDeleteInfo] = useState('');
    const [deleteOpen, setDeleteOpen] = useState(false);
    useGetInfo({ setInfos, setDates, setEvents });

    // モーダル開閉
    const handleOpen = type => {
        setOpen(true);
        setType(type);
    };
    const handleClose = useCallback(() => {
        setOpen(false);
        setType("user");
    });

    // 削除実行
    const handleDelete = useCallback(() =>{
        (async() => {
            const res = await axios.post(route('delete.info', {'info': deleteInfo}));
            setInfos(response.data.infos);
            setDates(response.data.dates);
            setDeleteOpen(false);
            setType("user");
        })();
    });

    const information =
        <Content
            isAdmin={isAdmin}
            dates={dates}
            infos={infos}
            handleDelete={handleDelete}
            setDeleteInfo={setDeleteInfo}
            deleteOpen={deleteOpen}
            setDeleteOpen={setDeleteOpen}
            isWide={isWide}
        />;

    const addButton = isAdmin == "staff" &&
        <AddInfoButton onClick={() => handleOpen("create_info")}>
            お知らせを追加する
        </AddInfoButton>

    return [{ information, addButton, open, type, events, setInfos, setDates }, handleClose];
};
