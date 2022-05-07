import React from 'react';

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { styleSubHeading} from '../addEvent';
import { styleTextField } from '../addEvent';

// 各パーツのスタイル設定
const styleContent = { marginBottom: '16px' };


/**
 * addEventのモバイル版
 */
const addEventMobile = (props) => {
    return (
        <div style={styleContent}>
            <Typography component="p" sx={styleSubHeading}>
                イベント名
            </Typography>
            <TextField
                error={props.error}
                label="イベント名を入力"
                value={props.value}
                onChange={() => props.onChange(event)}
                helperText={props.helperText}
                style={styleTextField}
            />
        </div>
    );
};

export default addEventMobile;