import React, { useState, useCallback } from 'react';
import { useGetWeather } from './getInfo';

// weatherのロジック
export const useWeather = () => {
    const [weather, setWeather] = useState([]);
    const [expanded, setExpanded] = useState(false);
    useGetWeather({ setWeather });

    // アコーディオンの開閉
    const handleChange = useCallback((panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    });

    return [{ weather, expanded }, handleChange];
};
