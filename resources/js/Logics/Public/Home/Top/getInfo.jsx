import React, { useEffect } from 'react';
import axios from "axios";

// マップのAPIキー、Zoomのリンク一覧へのURLの取得
export const useGetInfo = ({ setMapKey, setZoomLink }) => {
    useEffect(() => {
        let unmounted = false;
        (async() => {
            const res = await axios.get(route('getData.home'));
            if(!unmounted) {
                setMapKey(res.data.key);
                setZoomLink(res.data.zoom);
            }
        })();

        return () => { unmounted = true; };
    }, []);
};
