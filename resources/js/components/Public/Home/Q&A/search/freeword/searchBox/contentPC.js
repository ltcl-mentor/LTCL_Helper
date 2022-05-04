import React from 'react';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@material-ui/core/Button';

// 各パーツのスタイル設定
const styleGrid = { flex: 1 };
const styleContent = { 
    width: '85%', 
    margin: '0 auto 40px',
};
const styleInputBase = {
    ml: 1,
    flex: 1
};
const styleSearchArea = {
    p: "4px",
    display: 'flex',
    alignItems: "center",
};
const styleSearchButton = {
    backgroundColor: '#771AF8', 
    color: 'white', 
    height: '100%',
    minWidth: '30px',
    width: '40px',
    '&:hover': {
        backgroundColor: '#6633CC' 
    } 
};


/**
 * PC版検索ボックス
 */
const contentPC = (props) => {
    return (
        <Grid container sx={styleContent}>
            <Grid item sx={styleGrid}>
                <Paper component="form" sx={styleSearchArea}>
                    <InputBase
                        sx={styleInputBase}
                        placeholder="検索ワードを入力してください"
                        inputProps={{ 'aria-label': 'search word' }}
                        onChange={event => props.handleFreeword(event)}
                        onKeyDown={event => {if (event.key === 'Enter') event.preventDefault();}}
                    />
                </Paper>
            </Grid> 
            <Grid item>
                <Button variant="contained" startIcon={<SearchIcon />} sx={styleSearchButton}
                >
                </Button>
            </Grid>
        </Grid>
    );
};

export default contentPC;