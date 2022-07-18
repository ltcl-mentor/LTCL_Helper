import React from "react";
import Modal from "@mui/material/Modal";
import { CloseModal, SubmitButton } from "../../../modal";
import { ConfirmMessage } from "@/Styles/Public/Home/Top/Footer/contact";
import { Content } from "@/Styles/Shared/Modal/modal";

/**
 * お問い合わせ
 */
const confirmModal = ({ open, confirm, handleSubmit }) => {
    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Content>
                <CloseModal onClose={() => confirm(false)} />
                <ConfirmMessage>お問い合わせを送信します。<br />よろしいですか？</ConfirmMessage>
                <SubmitButton text="送信する" handleSubmit={handleSubmit} />
            </Content>
        </Modal>
    );
};

export default confirmModal;
