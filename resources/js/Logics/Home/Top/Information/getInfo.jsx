import React, { useEffect } from 'react';
import axios from "axios";

// マップのAPIキー、Zoomのリンク一覧へのURLの取得
export const useGetInformation = ({ setInfos, setDates, setEvents }) => {
    useEffect(() => {
        (async() => {
            const res = await axios.get(route('getData.information'));
            setInfos(res.data.infos.infos);
            setDates(res.data.infos.dates);
            setEvents(res.data.events);
        })();
    }, []);
};

// 天気情報取得
export const useGetWeather = ({ setWeather }) => {
    useEffect(() => {
        let unmounted = false;
        (async() => {
            const res = await axios.get(route('getData.weather'));
            if(!unmounted) {
                setWeather(res.data);
            }
        })();

        return () => { unmounted = true; };
    }, []);
};
