import React from 'react';
import { GridItem, StyleTextField, StyleGrid } from '@/Styles/Mentor/Home/Manage/Event/addEvent';
import { ModalSubHeading } from "@/Styles/Shared/Modal/modal";

/**
 * addEventのPC版
 */
const contentPC = ({ value, validate, onChange }) => {
    return (
        <StyleGrid container>
            <GridItem item grow="1">
                <ModalSubHeading>イベント名</ModalSubHeading>
            </GridItem>
            <GridItem item grow="5">
                <StyleTextField
                    error={validate.name.error}
                    label="イベント名を入力"
                    value={value}
                    onChange={(event) => onChange(event)}
                    helperText={validate.name.message}
                    name="name"
                />
            </GridItem>
        </StyleGrid>
    );
};

export default contentPC;
