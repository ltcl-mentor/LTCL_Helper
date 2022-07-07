import React, { useState, useEffect } from 'react';
import { WarningMessage } from '@/Styles/Public/Home/Top/Calendar/info';
import InfoTable from '@/Components/Public/Home/Top/Calendar/infoTable';

// infoのロジック
export const useShowInfo = ({ collegeInfo, isDateClicked, resError, zoomLink, exists, isWide }) => {
    const [timeout, setTimeout] = useState(false);

    useEffect(() => {
        resError ? setTimeout(true) : setTimeout(false);
    },[resError]);

    const info = isDateClicked ?
        <InfoTable collegeInfo={collegeInfo} zoomLink={zoomLink} exists={exists} isWide={isWide} /> :
        (timeout ?
            <WarningMessage>
                データの読み込みに失敗しました。<br/>再度お試しいただくか、メンターに直接ご確認ください。
            </WarningMessage> :
            <WarningMessage>
                データの読み込み中です。
            </WarningMessage>
        );

    return info;
};
