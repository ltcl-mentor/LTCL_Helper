import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@mui/material/Box';

function Keyword(props) {
    const [keyword, setKeyword] = useState('');
    
    const handleKeyword = (event) => {
        setKeyword(event.target.value);
    };
    
    return (
        <Box sx={{ textAlign: "center", marginTop: 4, marginBottom: 3 }}>
            <TextField id="standard-basic" label="キーワード" onChange={ (event) => handleKeyword(event) } />
            { props.isCanceling ? '' : props.setKeyword(keyword) }
        </Box>
    );
}

export default Keyword;