import React from "react";
import { useContact } from "@/Logics/Public/Home/Top/Footer/contact";
import ContactForm from "./contact/contactForm";
import ConfirmModal from "./contact/confirmModal";
import { CloseButton, SubmitButton } from "@/Components/Shared/Modal/sharedPart";
import { StyleBox } from "@/Styles/Public/Home/Top/Footer/contact";
import { ModalHeading } from "@/Styles/Shared/Modal/modal";

/**
 * お問い合わせ
 */
const contact = ({ onClose }) => {
    const [{ open, input, validation, }, { handleChange, confirm, handleSubmit }] = useContact();

    return (
        <React.Fragment>
            <CloseButton onClose={onClose} />
            <ModalHeading>お問い合せ</ModalHeading>
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
