import React from 'react';
import { StyledDiv, Heading } from '@/Styles/Public/Home/Top/Calendar/calendar';
import { useGetCollege } from '@/Logics/Home/Top/Calendar/calendar';

/**
 * 校舎情報(カレンダー)
 */
const calendar = ({ zoomLink }) => {
    const { date, allInfo } = useGetCollege(zoomLink);

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
