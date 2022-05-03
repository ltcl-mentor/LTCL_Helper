import React from 'react';

import Grid from "@mui/material/Grid";
import Typography from "@material-ui/core/Typography";

import Location from './location';

// 各パーツのスタイル設定
const gridWidth = { width: '50%' };
const content = { 
    width: '80%',
    margin: '0 auto'
};
const logo = {
    width: '165px',
    height: '45px',
    marginTop: '5px'
};
const contact = {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    display: 'inline-block',
    cursor: "pointer",
    mt: 2
};


/**
 * PC版フッター
 */
const contentPC = (props) => {
    return (
        <Grid container sx={content}>
            <Grid sx={gridWidth} item>
                {/*.ロゴ */}
                <Typography component="div">
                    <img src="images/helper_logo.png" style={logo} />
                </Typography>
                
                {/*.お問い合せ */}
                <Typography onClick={() => props.handleOpen('contact')} component="span" sx={contact}>
                    お問い合わせ
                </Typography>
            </Grid>
            <Grid sx={gridWidth} item>
                <Location
                    mapKey={props.mapKey}
                />
            </Grid>
        </Grid>
    );
};

export default contentPC;