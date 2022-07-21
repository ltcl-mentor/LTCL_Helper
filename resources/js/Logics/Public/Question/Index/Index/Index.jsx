import React, { useState, useCallback } from 'react';
import axios from "axios";
import { useGetInfo } from './getInfo';

// Indexのロジック
export const useIndex = ({ topic, auth }) => {
    const [value, setValue] = useState(0);
    const [status, setStatus] = useState(4);
    const [documents, setDocuments] = useState({
        eventList: [],
        activePage: 1,
        itemsCountPerPage: 1,
        totalItemsCount: 1,
        lastPage: 0,
    });
    const [questions, setQuestions] = useState({
        eventList: [],
        activePage: 1,
        itemsCountPerPage: 1,
        totalItemsCount: 1,
        lastPage: 0,
    });
    const val = topic < 14 ? 0 : 1
    const questionsUrl = auth.user.is_admin ?
        route('getData.question.paginate', { category: val, topic: topic, admin: true, status: status }) :
        route('getData.question.paginate', { category: val, topic: topic })
    useGetInfo({ questionsUrl, topic, setQuestions, setDocuments });


    // タブの切り替え
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handlePageClick = useCallback(async(event, index) => {
        const questionsUrl = auth.user.is_admin ?
            route('getData.question.paginate', { category: val, topic: topic, admin: true, page: index, status: status }) :
            route('getData.question.paginate', { category: val, topic: topic, page: index });

        const res = await axios.get(questionsUrl);
        setQuestions({
            eventList: res.data.data,
            itemsCountPerPage: res.data.per_page,
            totalItemsCount: res.data.total,
            currentPage: res.data.current_page,
            lastPage: res.data.last_page,
        });
    });

    const handleStatus = useCallback(async(event) => {
        const questionsUrl = auth.user.is_admin && route('getData.question.paginate', { category: val, topic: topic, admin: true, status: event.target.value });

        setStatus(event.target.value);

        const res = await axios.get(questionsUrl);
        setQuestions({
            eventList: res.data.data,
            itemsCountPerPage: res.data.per_page,
            totalItemsCount: res.data.total,
            currentPage: res.data.current_page,
            lastPage: res.data.last_page,
        });
    })

    return [{ value, questions, documents }, { handleStatus, handlePageClick, handleChange }];
}
