import React from 'react';

import TextField from '@material-ui/core/TextField';
import Box from '@mui/material/Box';

// 各パーツの設定
const styleWidth = { width: '90%' };
const styleBox = {
    textAlign: "left",
    marginTop: 1,
    marginBottom: 3
};


/**
 * キーワード入力欄
 */
const keyword = (props) => {
    
    // 入力されたキーワード取得
    const handleKeyword = (event) => {
        props.setKeyword(event.target.value);
    };
    
    return (
        <Box sx={styleBox}>
            <TextField id="standard-basic" label="キーワード" onChange={event => handleKeyword(event)} sx={styleWidth} />
        </Box>
    );
};

export default keyword;