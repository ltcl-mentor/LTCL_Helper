import React, { useEffect } from 'react';
import axios from "axios";

// マップのAPIキー、Zoomのリンク一覧へのURLの取得
export const useGetInfo = ({ setInfos, setDates, setEvents }) => {
    useEffect(() => {
        (async() => {
            const res = await axios.get(route('getData.information'));
            setInfos(res.data.infos.infos);
            setDates(res.data.infos.dates);
            setEvents(res.data.events);
        })();
    }, []);
};
