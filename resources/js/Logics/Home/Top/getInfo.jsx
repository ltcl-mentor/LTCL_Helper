import React, { useEffect } from 'react';
import axios from "axios";

// マップのAPIキー、Zoomのリンク一覧へのURLの取得
export const useGetInfo = ({ setMapKey, setZoomLink }) => {
    useEffect(() => {
        (async() => {
            const res = await axios.get(route('getData.home'));
            setMapKey(res.data.key);
            setZoomLink(res.data.zoom);
        })();
    }, []);
};
