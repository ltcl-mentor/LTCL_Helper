import React from 'react';

import Typography from "@material-ui/core/Typography";

import Location from './location';

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
 * モバイル版フッター
 */
const contentMobile = (props) => {
    return (
       <div style={styleContent}>
            {/*.ロゴ */}
            <Typography component="div">
                <img src="images/helper_logo.png" style={styleLogo} />
            </Typography>
            
            {/*.お問い合せ */}
            <Typography onClick={() => props.handleOpen('contact')} component="span" sx={styleContact}>
                お問い合わせ
            </Typography>
            <Location
                mapKey={props.mapKey}
            />
        </div>
    );
};

export default contentMobile;