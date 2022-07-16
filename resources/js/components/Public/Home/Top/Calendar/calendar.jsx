import React from 'react';
import useMedia from 'use-media';
import { useGetCollege } from '@/Logics/Public/Home/Top/Calendar/calendar';
import ContentPC from '@/Components/Public/Home/Top/Calendar/contentPC';
import Info from '@/Components/Public/Home/Top/Calendar/info';
import { StyledDiv, Heading, WarningMessage } from '@/Styles/Public/Home/Top/Calendar/calendar';

/**
 * 校舎情報(カレンダー)
 */
const calendar = ({ zoomLink }) => {
    const isWideCalender = useMedia({ minWidth: '940px' });
    const [{ date, today, collegeInfo, isDateClicked, resError }, handleDate] = useGetCollege();

    const info = (date.getMonth() >= today.getMonth() - 1) && (date.getMonth() <= today.getMonth()) ?
        <Info
            collegeInfo={collegeInfo}
            isDateClicked={isDateClicked}
            resError={resError}
            zoomLink={zoomLink}
        />
    :
        <WarningMessage>
            確認可能なのは先月、今月の情報のみです。<br />
            もう一度日付を選択し直してください。
        </WarningMessage>


    // 940px以下ではカレンダーは表示しない
    const allInfo = isWideCalender ?
        <ContentPC
            info={info}
            date={date}
            handleDate={handleDate}
        />
    :
        info

    return (
        <StyledDiv>
            <Heading>
                { date.getMonth() + 1 }月{ date.getDate() }日の校舎情報
            </Heading>
            {allInfo}
        </StyledDiv>
    );
};

export default calendar;
