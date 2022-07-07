import React, { useState } from 'react';
import useMedia from 'use-media';
import Info from '@/Components/Public/Home/Top/Calendar/info';
import ContentPC from '@/Components/Public/Home/Top/Calendar/contentPC';
import { WarningMessage } from '@/Styles/Public/Home/Top/Calendar/calendar';
import { useGetInfo } from './getInfo';

// calendarのロジック
export const useGetCollege = (zoomLink) => {
    const isWideCalender = useMedia({ minWidth: '940px' });
    const [date, setDate] = useState(new Date());
    const [collegeInfo, setCollegeInfo] = useState([]);
    const [isDateClicked, setIsDateClicked] = useState(false);
    const [resError, setResError] = useState(false);
    const today = new Date();
    useGetInfo({ date, today, setIsDateClicked, setCollegeInfo, setResError });

    let info;
    if ((date.getMonth() >= today.getMonth() - 1) && (date.getMonth() <= today.getMonth())) {
        info = (
            <Info
                collegeInfo={collegeInfo}
                isDateClicked={isDateClicked}
                resError={resError}
                zoomLink={zoomLink}
                isWide={isWideCalender}
            />
        );
    } else {
        info = (
            <WarningMessage>
                確認可能なのは先月、今月の情報のみです。<br />
                もう一度日付を選択し直してください。
            </WarningMessage>
        );
    }

    // 940px以下ではカレンダーは表示しない
    const allInfo = isWideCalender ?
        <ContentPC info={info} date={date} setDate={setDate} setIsDateClicked={setIsDateClicked} /> :
        info;

    return { date, allInfo };
};
