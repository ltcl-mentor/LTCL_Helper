import React, { useState } from 'react';
import axios from "axios";
import { useGetInfo } from '../result/getInfo';

// resultのロジック
export const useResult = ({ select }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [questions, setQuestions] = useState({
        eventList: [],
        activePage: 1,
        itemsCountPerPage: 1,
        totalItemsCount: 1,
        pageRangeDisplayed: 10,
        lastPage: 0,
    });
    useGetInfo({ select });

    // ペジネーションのページ番号がクリックされた際にページ変更
    const handlePageClick = (event, index) => {
        // 日本語の検索内容入力時に一度エンコードし、コントローラーでデコード
        const encodedKeyword = encodeURI(select.keyword);

        let unmounted = false;
        (async() => {
            const res = axios.get(`/api/questions/search/paginate?category=${ select.category }&topic=${ select.topic }&curriculum_number=${ select.curriculumNumber }&keyword=${ encodedKeyword }&page=${ index }`);
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
    };

    return [{questions, currentPage}, handlePageClick];
};
