import React from 'react';
import { useShowInfo } from '@/Logics/Public/Home/Top/Calendar/info';
import InfoTable from '@/Components/Public/Home/Top/Calendar/infoTable';
import { WarningMessage } from '@/Styles/Public/Home/Top/Calendar/info';

/**
 * 校舎情報(データ表示)
 */
const info = ({ collegeInfo, isDateClicked, resError, zoomLink }) => {
    const timeout = useShowInfo({ resError });

    const info = isDateClicked ?
        <InfoTable collegeInfo={collegeInfo} zoomLink={zoomLink} />
    :
        <WarningMessage>
            {timeout ?  "データの読み込みに失敗しました。\n再度お試しいただくか、メンターに直接ご確認ください。" : "データの読み込み中です。"}
        </WarningMessage>

    return (
        <React.Fragment>
            {info}
        </React.Fragment>
    );
};

export default info;
