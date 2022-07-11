import React from "react";
import { useContact } from "@/Logics/Home/Top/Footer/contact";
import Typography from "@mui/material/Typography";
import ContactForm from "./contact/contactForm";
import ConfirmModal from "./contact/confirmModal";
import { CloseModal, SubmitButton, styleHeading } from "../../modal";
import { StyleBox } from "@/Styles/Public/Home/Top/Footer/contact";

/**
 * お問い合わせ
 */
const contact = ({ onClose }) => {
    const [{ open, input, validation, }, { handleChange, confirm, handleSubmit }] = useContact();

    return (
        <React.Fragment>
            <CloseModal onClose={onClose} />
            <Typography align="center" component="div" sx={styleHeading}>
                お問い合せ
            </Typography>
            <StyleBox>
                <ContactForm
                    input={input}
                    validation={validation}
                    handleChange={handleChange}
                />
                <SubmitButton
                    text="送信する"
                    handleSubmit={() => confirm(true)}
                />
            </StyleBox>

            {/* 確認モーダル */}
            <ConfirmModal
                open={open}
                confirm={confirm}
                handleSubmit={handleSubmit}
            />
        </React.Fragment>
    );
};

export default contact;
