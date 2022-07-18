import React from 'react';
import Grid from '@mui/material/Grid';
import Buttons from './buttons';
import { SubHeading } from '@/Styles/Mentor/Home/Manage/Event/Modal/showEvent';

/**
 * イベント詳細ヘッド部分
 */
const head = ({ event, state, handleState, handleDeleteOpen }) => {
    return (
        <React.Fragment>
            <Grid container justifyContent="space-between">
                <Grid item>
                    <SubHeading>Slack通知メッセージ</SubHeading>
                </Grid>
                <Grid item>
                    <Buttons
                        event={event}
                        state={state}
                        handleState={handleState}
                        handleDeleteOpen={handleDeleteOpen}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default head;
