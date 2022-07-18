import React from 'react';
import { SearchArea, StyleInputBase } from '@/Styles/Public/Home/QA/Search/freeword/freeword';

/**
 * モバイル版検索ボックス
 */
const contentMobile = ({ handleFreeword }) => {
    return (
        <SearchArea component="form">
            <StyleInputBase
                placeholder="検索ワードを入力してください"
                inputProps={{ 'aria-label': 'search word' }}
                onChange={handleFreeword}
                onKeyDown={event => {if (event.key === 'Enter') event.preventDefault();}}
            />
        </SearchArea>
    );
};

export default contentMobile;