import React, { useState, useCallback } from 'react';
import { useGetWeather } from './getInfo';

// weatherのロジック
export const useWeather = () => {
    const weatherImages = {
        "くもり": "images/clouds.jpg",
        "快晴": "images/clear.jpg",
        "雪": "images/snow.jpg",
        "雨": "images/rain.jpg",
        "霧": "images/drizzle.jpg",
        "霧雨": "images/drizzle.jpg",
        "雷雨": "images/thunderstorm.jpg",
        "異常気象": "images/atmosphere.jpg",
    };
    const [weather, setWeather] = useState([]);
    const [expanded, setExpanded] = useState(false);
    useGetWeather({ setWeather });

    // アコーディオンの開閉
    const handleChange = useCallback((panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    });

    return [{ weatherImages, weather, expanded }, handleChange];
};
