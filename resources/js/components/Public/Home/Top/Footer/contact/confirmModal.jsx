import React from "react";
import useMedia from "use-media";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { CloseModal, SubmitButton, style } from "../../../modal";
import { ConfirmMessage } from "@/Styles/Public/Home/Top/Footer/contact";
import BreakingPoint from "@/Styles/BreakingPoint";

/**
 * お問い合わせ
 */
const confirmModal = ({ open, confirm, handleSubmit }) => {
    const isWide = useMedia({ minWidth: `${BreakingPoint}px` });
    let width;
    if (isWide) {
        width = { width: "65%" };
    } else {
        width = { width: "90%" };
    }

    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{ ...style, ...width }}>
                <CloseModal onClose={() => confirm(false)} />
                <ConfirmMessage>お問い合わせを送信します。<br />よろしいですか？</ConfirmMessage>
                <SubmitButton text="送信する" handleSubmit={handleSubmit} />
            </Box>
        </Modal>
    );
};

export default confirmModal;
