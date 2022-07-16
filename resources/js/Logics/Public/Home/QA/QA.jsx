import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useGetInfo } from "./getInfo";

// QAのロジック
export const useQA = () => {
    const history = useHistory();
    const [achievement, setAchievment] = useState(0);
    const [indexValue, setIndexValue] = useState(0);
    const [index, setIndex] = useState({ curriculum: [], project: [] });
    useGetInfo({ setAchievment, setIndex })

    // タブ切り替え用
    const handleChange = useCallback((event, newValue) => {
        setIndexValue(newValue);
    });

    // 個別質問ページ
    const toTopic = useCallback(topic_number => {
        history.push(`/topic/${topic_number}`);
    });

    return [{ achievement, indexValue, index }, { handleChange, toTopic }];
};
