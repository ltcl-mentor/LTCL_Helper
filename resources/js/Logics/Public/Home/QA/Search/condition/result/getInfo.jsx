import React, { useEffect } from 'react';
import axios from "axios";

// 検索結果（絞り込み）の取得
export const useGetInfo = ({ select, setQuestions }) => {
    useEffect(() => {
        // 検索結果の質問取得
        // 日本語の検索内容入力時に一度エンコードし、コントローラーでデコード
        const encodedKeyword = encodeURI(select.keyword);

        let unmounted = false;
        (async() => {
            const res = axios.get(`/api/questions/search/paginate?category=${ select.category }&topic=${ select.topic }&curriculum_number=${ select.curriculumNumber }&keyword=${ encodedKeyword }`);
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
    }, []);
};
