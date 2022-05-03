import React from 'react';

import Grid from "@mui/material/Grid";
import Typography from "@material-ui/core/Typography";

import Location from './location';

// 各パーツのスタイル設定
const styleGridWidth = { width: '50%' };
const styleContent = { 
    width: '80%',
    margin: '0 auto'
};
const styleLogo = {
    width: '165px',
    height: '45px',
    marginTop: '5px'
};
const styleContact = {
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
        <Grid container sx={styleContent}>
            <Grid sx={styleGridWidth} item>
                {/*.ロゴ */}
                <Typography component="div">
                    <img src="images/helper_logo.png" style={styleLogo} />
                </Typography>
                
                {/*.お問い合せ */}
                <Typography onClick={() => props.handleOpen('contact')} component="span" sx={styleContact}>
                    お問い合わせ
                </Typography>
            </Grid>
            <Grid sx={styleGridWidth} item>
                <Location
                    mapKey={props.mapKey}
                />
            </Grid>
        </Grid>
    );
};

export default contentPC;