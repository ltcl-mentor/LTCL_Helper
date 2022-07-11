import React from "react";
import useMedia from "use-media";
import BreakingPoint from "../../../Styles/BreakingPoint";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import UserRegister from "./modal/userRegister";
import ShowEvent from "./modal/showEvent";
import AddEvent from "./modal/addEvent";
import Create from "./Top/Information/information/create/create";
import ShowInfo from "./modal/showInfo";
import DeleteInfo from "./modal/deleteConfirm";
import Contact from "./modal/contact";
import Button from "@mui/material/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

// モーダルCSS
const styleCloseButton = {
    color: "red",
    ml: "95%"
};
const styleSubmitButtonPosition = {
    marginTop: 4,
    marginBottom: 3
};
const styleSubmitButtonDesign = {
    color: "#771AF8",
    border: "1px solid #771AF8",
    "&:hover": {
        color: "white",
        backgroundColor: "#771AF8",
        border: "1px solid #771AF8"
    }
};
export let style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    borderRadius: "4px",
    p: 3,
    maxHeight: "80%",
    overflowY: "scroll",
    "&:focus": {
        border: "none"
    }
};
export const styleHeading = {
    color: "#771AF8",
    fontSize: "24px",
    fontWeight: "bold"
};
export const styleWarningTitle = {
    color: "red",
    fontSize: "30px",
    fontWeight: "bold"
};
export const styleWarningBody = {
    color: "red",
    fontSize: "20px",
    fontWeight: "bold",
    mt: "10px"
};

export const CloseModal = props => {
    return (
        <IconButton onClick={() => props.onClose()} sx={styleCloseButton}>
            <HighlightOffIcon />
        </IconButton>
    );
};

export const SubmitButton = props => {
    return (
        <Typography
            align="center"
            component="div"
            sx={styleSubmitButtonPosition}
        >
            <Button
                onClick={() => props.handleSubmit()}
                variant="outlined"
                sx={styleSubmitButtonDesign}
            >
                {props.text}
            </Button>
        </Typography>
    );
};

/**
 * モーダル
 */
export const Modals = props => {
    const isWide = useMedia({ minWidth: `${BreakingPoint}px` });

    let content;
    switch (props.type) {
        // お知らせ作成
        case "create_info":
            content = (
                <Create onClose={props.handleClose} events={props.events} />
            );
            break;

        // お知らせ詳細
        case "show_info":
            content = (
                <ShowInfo onClose={props.handleClose} info={props.info} />
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
            content = (
                <AddEvent
                    setEvents={props.setEvents}
                    onClose={props.handleClose}
                    isWide={isWide}
                />
            );
            break;

        // お問い合わせ
        case "contact":
            content = <Contact onClose={props.handleClose} isWide={isWide} />;
            break;
    }

    if (isWide) {
        style = { ...style, width: "70%" };
    } else {
        style = { ...style, width: "100%" };
    }

    return (
        <Modal
            open={props.open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>{content}</Box>
        </Modal>
    );
};
