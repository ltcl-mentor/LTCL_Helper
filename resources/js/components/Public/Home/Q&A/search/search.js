import React, { useState } from 'react';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';

import Freeword from './freeword/freeword';
import Condition from './condition/condition';

const PurpleButton = styled(Button)(({ theme }) => ({
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    width: '50%', 
    height: 60,
    boxShadow: 'none',
    backgroundColor: '#771AF8',
    borderRadius: '0',
    '&:hover': {
        backgroundColor: '#6633CC',
        boxShadow: 'none',
        color: 'white',
    },
}));

const GrayButton = styled(Button)(({ theme }) => ({
    color: '#ADA9A9',
    fontSize: 24,
    fontWeight: 'bold',
    width: '50%', 
    height: 60,
    boxShadow: 'none',
    backgroundColor: '#ECE9E9',
    borderRadius: '0',
    '&:hover': {
        backgroundColor: '#DDDDDD',
        boxShadow: 'none',
    },
}));


/**
 * 検索部分
 */
const Search = () => {
    const [value, setValue] = useState(1)
    
    let freewordButton;
    let conditionButton;
    let search;
    if (value == 0) {
        freewordButton = <PurpleButton onClick={() => setValue(0)} variant="contained">フリーワード検索</PurpleButton>;
        conditionButton = <GrayButton onClick={() => setValue(1)} variant="contained">絞り込み検索</GrayButton>;
        search = <Freeword />;
    } else {
        freewordButton = <GrayButton onClick={() => setValue(0)} variant="contained">フリーワード検索</GrayButton>;
        conditionButton = <PurpleButton onClick={() => setValue(1)} variant="contained">絞り込み検索</PurpleButton>;
        search = <Condition />;
    }
    
    return (
        <Card variant="outlined" sx={{ width: '90%', m: '16px auto 0', p: 0 }}>
        
            {/* 検索タブ */}
            <Stack direction="row">
                {freewordButton}
                {conditionButton}
            </Stack>
            
            {/* 検索内容 */}
            {search}
        </Card>
    );
};

export default Search;