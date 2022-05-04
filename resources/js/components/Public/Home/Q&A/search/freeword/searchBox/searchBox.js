import React, { useCallback } from 'react';

import ContentPC from './contentPC';
import ContentMobile from './contentMobile';


/**
 * 検索フォーム
 */
const searchBox = (props) => {
    
    // 検索ワードの入力内容を取得
    const handleFreeword = useCallback(event => {
        // 入力に空白があれば"/"に置換
        // 空白は半角でも全角でも良い
        props.setFreeword(event.target.value.replace(/\s+/g,'/'));
    });
    
    let searchField;
    if (props.isWide) {
        searchField = <ContentPC handleFreeword={handleFreeword} />;
    } else {
        searchField = <ContentMobile handleFreeword={handleFreeword} />;
    }
    
    return (
        <React.Fragment>
            {searchField}
        </React.Fragment>
    );
};

export default searchBox;