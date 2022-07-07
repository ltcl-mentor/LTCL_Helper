import React from 'react';
import { useShowInfo } from '@/Logics/Home/Top/Calendar/info';

/**
 * 校舎情報(データ表示)
 */
const info = ({ collegeInfo, isDateClicked, resError, zoomLink, exists, isWide }) => {
    const info = useShowInfo({ collegeInfo, isDateClicked, resError, zoomLink, exists, isWide });

    return (
        <React.Fragment>
            {info}
        </React.Fragment>
    );
};

export default info;
