import React, { useEffect } from 'react';
import axios from "axios";

// slackリンク取得
export const useGetInfo = ({ setLink }) => {
    useEffect(() => {
        let unmounted = false;
        (async() => {
            const res = await axios.get(route('getData.reaction'))
            if (!unmounted) setLink(res.data);
        })();

        return () => { unmounted = true; };
    }, []);
};
