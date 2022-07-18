import React from 'react';
import { StyleDiv, StyleTextField } from '@/Styles/Mentor/Home/Manage/Event/Modal/addEvent';
import { ModalSubHeading } from "@/Styles/Shared/Modal/modal";

/**
 * addEventのモバイル版
 */
const contentMobile = ({ value, validate, onChange }) => {
    return (
        <StyleDiv>
            <ModalSubHeading>イベント名</ModalSubHeading>
            <StyleTextField
                error={validate.name.error}
                label="イベント名を入力"
                value={value}
                onChange={(event) => onChange(event)}
                helperText={validate.name.message}
                name="name"
            />
        </StyleDiv>
    );
};

export default contentMobile;
