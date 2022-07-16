import React, { useEffect } from 'react';
import axios from "axios";

// カリキュラム・成果物の質問・記事、質問解決率を取得
export const useGetInfo = ({ setAchievment, setIndex }) => {
    useEffect(() => {
        let unmounted = false;
        (async() => {
            const res = await axios.get(route('getData.question_article'));
            if(!unmounted) {
                setIndex({
                    curriculum: res.data.curriculum,
                    project: res.data.project,
                });
                setAchievment(res.data.achievement);
            }
        })();

        return () => { unmounted = true; };
    }, []);
};
