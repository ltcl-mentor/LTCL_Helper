import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Box from '@mui/material/Box';


/**
 * キーワード入力欄
 */
const Keyword = (props) => {
    
    // 入力されたキーワード取得
    const handleKeyword = (event) => {
        props.setKeyword(event.target.value);
    };
    
    return (
        <Box sx={{ textAlign: "left", marginTop: 1, marginBottom: 3 }}>
            <TextField id="standard-basic" label="キーワード" onChange={ (event) => handleKeyword(event) } sx={{ width: '450px' }} />
        </Box>
    );
};

export default Keyword;