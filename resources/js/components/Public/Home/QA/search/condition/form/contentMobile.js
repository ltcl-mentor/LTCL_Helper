import React from 'react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Keyword from './keyword';
import { 
    styleHeadingCategory, 
    styleChoiceCategory, 
    styleReset,
} from '../condition';

const styleAddChoiceCategory = {
    fontSize: 16
};
const styleSearchButton = {
    mb: '25px',
    width: '100px', 
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


export const CategoryMobile = (props) => {
    return (
        <React.Fragment>
            <Typography align="right" onClick={() => props.handleCanceling()} sx={styleReset}>
                検索条件をリセット
            </Typography>
            <Typography sx={styleHeadingCategory}>
                1. カテゴリー
            </Typography>
            <Typography sx={[styleChoiceCategory, styleAddChoiceCategory]} component="div">
                どちらか1つを選択してください
            </Typography>
        </React.Fragment>
    );
};


export const KeywordMobile = (props) => {
    return (
        <React.Fragment>
            <Keyword
                setKeyword={props.setKeyword}
                isCanceling={false}
            />
            
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
        </React.Fragment>
    );
};