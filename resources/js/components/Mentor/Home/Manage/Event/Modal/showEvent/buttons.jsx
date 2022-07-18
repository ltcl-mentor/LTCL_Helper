import React from 'react';
import Stack from '@mui/material/Stack';
import { StyleLink } from '@/Styles/Mentor/Home/Manage/Event/Modal/showEvent';

/**
 * イベント詳細の編集・削除ボタン
 */
const buttons = ({ state, handleDeleteOpen, handleState }) => {
    return (
        <Stack direction="row">
            <StyleLink onClick={() => handleState(state)} variant="text">
                {state == "edit" ? "戻る" : "編集"}
            </StyleLink>
            <StyleLink onClick={() => handleDeleteOpen()} variant="text" red="red">
                削除
            </StyleLink>
        </Stack>
    );
};

export default buttons;
