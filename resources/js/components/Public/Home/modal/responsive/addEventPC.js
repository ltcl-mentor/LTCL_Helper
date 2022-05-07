import React from 'react';

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { styleSubHeading } from '../addEvent';
import { styleTextField } from '../addEvent';

// 各パーツのスタイル設定
const styleGridContainer = { 
    justifyContent: "space-between",
    height: "70px"
};
const styleGridEventName = {
    flexGrow: 1,
    height: "100%"
};
const styleGridTextField = {
    flexGrow: 5,
    height: "100%"
};


/**
 * addEventのPC版
 */
const addEventPC = (props) => {
    return (
        <Grid container sx={styleGridContainer}>
            <Grid item sx={styleGridEventName}>
                <Typography component="p" sx={styleSubHeading}>
                    イベント名
                </Typography>
            </Grid>
            <Grid item sx={styleGridTextField}>
                <TextField
                    error={props.error}
                    label="イベント名を入力"
                    value={props.value}
                    onChange={() => props.onChange(event)}
                    helperText={props.helperText}
                    style={styleTextField}
                />
            </Grid>
        </Grid>
    );
};

export default addEventPC;