import React, { useState, useEffect } from 'react';
import axios from "axios";

// 校舎情報の取得
export const useGetInfo = ({ date, today, setIsDateClicked, setCollegeInfo, setResError }) => {
    useEffect(() => {
        setResError(false)
        if ((date.getMonth() >= today.getMonth() - 1) && (date.getMonth() <= today.getMonth())) {
            (async() => {
                const res = await axios.get(`/api/college/${ date.getFullYear() }/${ date.getMonth() + 1 }/${ date.getDate() }`);
                setCollegeInfo(res.data.collegeInfo);
                setIsDateClicked(true);

            })()
            .catch(err => setResError(true));
        }
    }, [date]);
};
