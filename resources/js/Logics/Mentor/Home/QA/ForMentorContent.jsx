import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import QuestionsList from "@/Components/Mentor/Home/QA/questionsList";
import PaginationPart from "@/Components/Shared/paginationPart";

// ForMentorContentのロジック
export const useMentorQuestion = () => {
    const [questions, setQuestions] = useState({
        eventList: [],
        currentPage: 1,
        itemsCountPerPage: 1,
        totalItemsCount: 1,
        lastPage: 0
    });

    const list = QuestionsList({ questions });

    const getMentorQuestions = async(index = 1) => {
        const res = await axios.get(`/api/questions/mentor?page=${index}`);
        setQuestions({
            eventList: res.data.data,
            itemsCountPerPage: res.data.per_page,
            totalItemsCount: res.data.total,
            currentPage: res.data.current_page,
            lastPage: res.data.last_page
        });
    };

    const handlePageClick = useCallback((event, index) => {
        // 検索結果の質問取得
        getMentorQuestions(index);
    });

    const { emptyMessage, questionList, pagination } = PaginationPart({ list, questions, handlePageClick });

    useEffect(() => {
        let unmounted = false;
        if (!unmounted) getMentorQuestions();
        return () => { unmounted = true; };
    }, []);

    return { emptyMessage, questionList, pagination };
};
