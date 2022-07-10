import React, { useState, useCallback } from 'react';
import { useGetInfo } from './getInfo';

// calendarのロジック
export const useGetCollege = () => {
    const [date, setDate] = useState(new Date());
    const [collegeInfo, setCollegeInfo] = useState([]);
    const [isDateClicked, setIsDateClicked] = useState(false);
    const [resError, setResError] = useState(false);
    const today = new Date();
    useGetInfo({ date, today, setIsDateClicked, setCollegeInfo, setResError });

    const handleDate = useCallback(newDate => {
        setDate(newDate);
        setIsDateClicked(false);
    });

    return [{ date, today, collegeInfo, isDateClicked, resError }, handleDate];
};
