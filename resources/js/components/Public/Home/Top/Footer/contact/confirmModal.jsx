import React from "react";
import Modal from "@mui/material/Modal";
import { ConfirmMessage } from "@/Styles/Public/Home/Top/Footer/contact";
import { CloseButton, SubmitButton } from "@/Components/Shared/Modal/sharedPart";
import { Content } from "@/Styles/Shared/Modal/modal";

/**
 * お問い合わせ
 */
const confirmModal = ({ open, confirm, handleSubmit }) => {
    return (
        <Modal open={open}>
            <Content>
                <CloseButton onClose={() => confirm(false)} />
                <ConfirmMessage>
                    お問い合わせを送信します。<br />よろしいですか？
                </ConfirmMessage>
                <SubmitButton text="送信する" handleSubmit={handleSubmit} />
            </Content>
        </Modal>
    );
};

export default confirmModal;
