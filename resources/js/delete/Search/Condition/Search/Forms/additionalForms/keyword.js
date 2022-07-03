import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@mui/material/Box';

/**
 * キーワード入力欄
 */
function Keyword(props) {
    const [keyword, setKeyword] = useState('');
    
    // 入力されたキーワード取得
    const handleKeyword = (event) => {
        setKeyword(event.target.value);
    };
    
    return (
        <Box sx={{ textAlign: "left", marginTop: 1, marginBottom: 3 }}>
            <TextField id="standard-basic" label="キーワード" onChange={ (event) => handleKeyword(event) } sx={{ width: '450px' }} />
            { props.isCanceling ? '' : props.setKeyword(keyword) }
        </Box>
    );
}

export default Keyword;