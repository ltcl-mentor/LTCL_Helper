import React from 'react';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';

// 各パーツのスタイル設定
const styleInputBase = {
    ml: 1,
    flex: 1
};
const styleSearchArea = {
    p: "4px",
    display: 'flex',
    alignItems: "center",
    width: '90%', 
    margin: '0 auto 20px'
};


/**
 * モバイル版検索ボックス
 */
const contentMobile = (props) => {
    return (
        <Paper component="form" sx={styleSearchArea}>
            <InputBase
                sx={styleInputBase}
                placeholder="検索ワードを入力してください"
                inputProps={{ 'aria-label': 'search word' }}
                onChange={event => props.handleFreeword(event)}
                onKeyDown={event => {if (event.key === 'Enter') event.preventDefault();}}
            />
        </Paper>
    );
};

export default contentMobile;