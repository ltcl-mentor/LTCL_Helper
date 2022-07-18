import React from "react";
import useMedia from "use-media";
import BreakingPoint from "../../../Styles/BreakingPoint";
import Modal from "@mui/material/Modal";
import { Content } from "@/Styles/Shared/Modal/modal";
import UserRegister from "./modal/userRegister";
import ShowEvent from "./modal/showEvent";
import AddEvent from "../../Mentor/Home/Manage/Event/addEvent";
import Create from "./Top/Information/information/create/create";
import ShowInfo from "./Top/Information/information/showInfo";
import DeleteInfo from "./modal/deleteConfirm";
import Contact from "./Top/Footer/contact";

/**
 * モーダル
 */
export const Modals = props => {
    const isWide = useMedia({ minWidth: `${BreakingPoint}px` });

    let content;
    switch (props.type) {
        // お知らせ作成
        case "create_info":
            content = <Create onClose={props.handleClose} events={props.events} />;
            break;

        // お知らせ詳細
        case "show_info":
            content = (
                <ShowInfo
                    onClose={props.handleClose}
                    info={props.info}
                    isAdmin={props.isAdmin}
                />
            );
            break;

        // お知らせ削除
        case "delete_info":
            content = (
                <DeleteInfo
                    open={props.open}
                    setOpen={props.setOpen}
                    delete={props.delete}
                />
            );
            break;

        // ユーザー作成
        case "user":
            content = (
                <UserRegister
                    value={props.value}
                    onClose={props.handleClose}
                    setStudents={props.setStudents}
                    setStaffs={props.setStaffs}
                    isWide={isWide}
                />
            );
            break;

        // イベント詳細
        case "show_event":
            content = (
                <ShowEvent
                    event={props.event}
                    setEvents={props.setEvents}
                    onClose={props.handleClose}
                    isWide={isWide}
                />
            );
            break;

        // イベント追加
        case "add_event":
            content = <AddEvent onClose={props.handleClose} />;
            break;

        // お問い合わせ
        case "contact":
            content = <Contact onClose={props.handleClose} />;
            break;
    }

    return (
        <Modal open={props.open}>
            <Content>{content}</Content>
        </Modal>
    );
};
