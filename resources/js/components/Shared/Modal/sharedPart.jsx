import React from 'react';
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { ButtonPos, Submit, Close } from '@/Styles/Shared/Modal/modal';

export const SubmitButton = ({ text, handleSubmit }) => {
    return (
        <ButtonPos>
            <Submit onClick={() => handleSubmit()} variant="outlined">
                {text}
            </Submit>
        </ButtonPos>
    );
};

export const CloseButton = ({ onClose }) => {
    return (
        <Close onClick={() => onClose()}>
            <HighlightOffIcon />
        </Close>
    );
};
