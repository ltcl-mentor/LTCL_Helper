import React, { useState } from 'react';
import axios from "axios";
import { useGetInfo } from '../result/getInfo';

// resultのロジック
export const useResult = ({ searchType, freeword }) => {
    const [questions, setQuestions] = useState({
        eventList: [],
        activePage: 1,
        itemsCountPerPage: 1,
        totalItemsCount: 1,
        pageRangeDisplayed: 10,
        lastPage: 0,
    });
    const [currentPage, setCurrentPage] = useState(1);
    useGetInfo({ freeword, searchType, setQuestions });

    // ペジネーションのページ番号がクリックされた際にページ変更
    const handlePageClick = (event, index) => {
        if (freeword.trim().length !== 0) {
            // 日本語の検索内容入力時に一度エンコードする
            // コントローラー側でデコード
            const encodedFreeword = encodeURI(freeword);

            let unmounted = false;
            (async() => {
            // 検索結果の質問取得
                const res = axios.get(`/api/questions/search/paginate?searchType=${ searchType }&freeword=${ encodedFreeword }&page=${ index }`);
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
        }
    };

    return [{questions, currentPage}, handlePageClick];
};
