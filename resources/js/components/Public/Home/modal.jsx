import React from "react";
import Modal from "@mui/material/Modal";
import { Content } from "@/Styles/Shared/Modal/modal";
import UserRegister from "../../Mentor/Home/Manage/User/userRegister/userRegister";
import ShowEvent from "../../Mentor/Home/Manage/Event/Modal/showEvent/showEvent";
import AddEvent from "../../Mentor/Home/Manage/Event/Modal/addEvent/addEvent";
import Create from "./Top/Information/information/create/create";
import ShowInfo from "./Top/Information/information/showInfo";
import DeleteInfo from "../../Shared/Modal/deleteConfirm";
import Contact from "./Top/Footer/contact";

/**
 * モーダル
 */
export const Modals = ({ open, type, handleClose, events, info, isAdmin, setOpen, deleted, value, event }) => {
    let content;
    switch (type) {

        // お知らせ作成
        case "create_info":
            content = <Create onClose={handleClose} events={events} />;
            break;

        // お知らせ詳細
        case "show_info":
            content = (
                <ShowInfo
                    onClose={handleClose}
                    info={info}
                    isAdmin={isAdmin}
                />
            );
            break;

        // お知らせ削除
        case "delete_info":
            content = (
                <DeleteInfo
                    open={open}
                    setOpen={setOpen}
                    deleted={deleted}
                />
            );
            break;

        // ユーザー作成
        case "user":
            content = <UserRegister value={value} onClose={handleClose} />
            break;

        // イベント詳細
        case "show_event":
            content = <ShowEvent event={event} onClose={handleClose} />
            break;

        // イベント追加
        case "add_event":
            content = <AddEvent onClose={handleClose} />;
            break;

        // お問い合わせ
        case "contact":
            content = <Contact onClose={handleClose} />;
            break;
    }

    return (
        <Modal open={open}>
            <Content>{content}</Content>
        </Modal>
    );
};
