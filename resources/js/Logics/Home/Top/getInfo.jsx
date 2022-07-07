import React, { useEffect } from 'react';
import axios from "axios";

// マップのAPIキー、Zoomのリンク一覧へのURL、イベント一覧の取得
export const useGetInfo = ({ setMapKey, setZoomLink, setEvents }) => {
    useEffect(() => {
        (async() => {
            const res = await axios.get(route('getData.home'));
            setMapKey(res.data.key);
            setZoomLink(res.data.zoom);
            setEvents(res.data.events);
        })();
    }, []);
};
