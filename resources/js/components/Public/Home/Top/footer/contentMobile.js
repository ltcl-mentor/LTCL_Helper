import React from 'react';

import Typography from "@material-ui/core/Typography";

import Location from './location';

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
 * モバイル版フッター
 */
const contentMobile = (props) => {
    return (
       <div style={content}>
            {/*.ロゴ */}
            <Typography component="div">
                <img src="images/helper_logo.png" style={logo} />
            </Typography>
            
            {/*.お問い合せ */}
            <Typography onClick={() => props.handleOpen('contact')} component="span" sx={contact}>
                お問い合わせ
            </Typography>
            <Location
                mapKey={props.mapKey}
            />
        </div>
    );
};

export default contentMobile;