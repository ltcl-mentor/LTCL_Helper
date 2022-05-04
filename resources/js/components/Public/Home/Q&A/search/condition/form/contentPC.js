import React from 'react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@mui/material/Grid';

import Keyword from './keyword';
import {
    styleHeadingCategory,
    styleChoiceCategory,
    styleReset,
} from '../condition';

// 各パーツのスタイル設定
const styleKeyword = { width: '70%' };
const styleSearch = { width: '30%' };
const styleAddChoiceCategory = {
    marginLeft: '20px', 
    fontSize: 18
};
const styleSearchButton = {
    height: '56px', 
    mt: 1, 
    width: '112px',
    ml: 'auto',
    color: '#771AF8', 
    border: '2px solid #771AF8',
    fontWeight: 'bold',
    fontSize: 20,
    display: 'block',
    '&:hover': { 
        backgroundColor: '#771AF8',
        color: 'white',
        border: '2px solid #771AF8', 
    }
};


export const CategoryPC = (props) => {
    return (
        <React.Fragment>
            <Typography sx={styleHeadingCategory}>
                1. カテゴリー
                <Typography sx={[styleChoiceCategory, styleAddChoiceCategory]} component="span">
                    どちらか1つを選択してください
                </Typography>
            </Typography>
            <Typography align="right" onClick={() => props.handleCanceling()} sx={styleReset}>
                検索条件をリセット
            </Typography>
        </React.Fragment>    
    );
};


export const KeywordPC = (props) => {
    return (
        <Grid container justifyContent='space-between'>
        
            {/* キーワード入力欄 */}
            <Grid item sx={styleKeyword}>
                <Keyword
                    setKeyword={props.setKeyword}
                    isCanceling={false}
                />
            </Grid>
            
            {/* カテゴリー選択欄 */}
            <Grid item sx={styleSearch}>
                {((((props.topic === 0) 
                    || (props.topic >= 1 && props.topic <= 13)) && props.category === 0) 
                    || (props.topic >= 14 && props.category === 1)) &&
                    <Button 
                        sx={styleSearchButton} 
                        onClick={() => props.setIsSearchButtonClicked(true)} 
                        variant="outlined"
                        disabled={props.isSearchButtonClicked}
                    >
                        検索
                    </Button>
                }
            </Grid>
        </Grid>
    );
};