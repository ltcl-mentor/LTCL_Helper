import React from 'react';
import { StyleTextField } from '@/Styles/Public/Home/QA/Search/condition/form/form';
import { StyleBox } from '@/Styles/Public/Home/QA/Search/condition/condition';

// 各パーツの設定
const styleWidth = { width: '90%' };

/**
 * キーワード入力欄
 */
const keyword = ({ handleKeyword }) => {
    return (
        <StyleBox>
            <StyleTextField
                id="standard-basic"
                label="キーワード"
                name="keyword"
                onChange={() => handleKeyword()} sx={styleWidth}
            />
        </StyleBox>
    );
};

export default keyword;
