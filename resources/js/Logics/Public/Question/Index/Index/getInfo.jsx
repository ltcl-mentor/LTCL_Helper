import React, { useEffect } from 'react';
import axios from "axios";

// 質問と記事を取得
export const useGetInfo = ({ questionsUrl, topic, setQuestions, setDocuments }) => {
    useEffect(() => {
        let unmounted = false;
        (async() => {
            const res1 = await axios.get(questionsUrl); // 公開されている質問を全件取得
            const res2 = await axios.get(route('getData.document', { category: topic })); // 質問に関連する全参考記事を取得
            if (!unmounted) {
                setQuestions({
                    eventList: res1.data.data,
                    itemsCountPerPage: res1.data.per_page,
                    totalItemsCount: res1.data.total,
                    currentPage: res1.data.current_page,
                    lastPage: res1.data.last_page,
                });
                setDocuments({
                    eventList: res2.data.data,
                    itemsCountPerPage: res2.data.per_page,
                    totalItemsCount: res2.data.total,
                    currentPage: res2.data.current_page,
                    lastPage: res2.data.last_page,
                });
            }
        })();

        return () => { unmounted = true; };
    }, []);
};
