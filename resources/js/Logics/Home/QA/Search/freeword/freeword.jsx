import React, { useState, useCallback } from 'react';

// freewordのロジック
export const useFreeword = () => {
    const [searchType, setSearchType] = useState('OR');
    const [freeword, setFreeword] = useState('');

    const handleSearchType = useCallback((event) => {
        setSearchType(event.target.value);
    });

    // 検索ワードの入力内容を取得
    const handleFreeword = useCallback(event => {
        // 入力に空白があれば"/"に置換
        // 空白は半角でも全角でも良い
        setFreeword(event.target.value.replace(/\s+/g,'/'));
    });

    return [{ searchType, freeword }, { handleSearchType, handleFreeword }];
};
