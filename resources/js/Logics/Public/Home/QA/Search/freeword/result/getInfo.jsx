import React, { useEffect } from 'react';
import axios from "axios";

// 検索結果（フリーワード）の取得
export const useGetInfo = ({ freeword, searchType, setQuestions }) => {
    // 検索ワードや検索タイプに変更があった場合に実行
    useEffect(() => {
        if (freeword.trim().length === 0) return false;

        // 日本語の検索内容入力時に一度エンコードする。コントローラー側でデコード
        const encodedFreeword = encodeURI(freeword);

        let unmounted = false;
        (async() => {
            const res = axios.get(`/api/questions/search/paginate?searchType=${ searchType }&freeword=${ encodedFreeword }`);
            if (!unmounted) {
                setQuestions({
                    eventList: res.data.data,
                    itemsCountPerPage: res.data.per_page,
                    totalItemsCount: res.data.total,
                    currentPage: res.data.current_page,
                    pageRangeDisplayed: 10,
                    lastPage: res.data.last_page,
                });
            }
        })();

        return () => { unmounted = true; };
    }, [searchType, freeword]);
};
