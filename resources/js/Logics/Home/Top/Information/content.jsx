import React, { useCallback, useState } from "react";
import ContentPC from '@/Components/Public/Home/Top/Information/responsive/contentPC';
import ContentMobile from "@/Components/Public/Home/Top/Information/responsive/contentMobile";
import InfoList from "@/Components/Public/Home/Top/Information/infoList";
import { NoInfo } from "@/Styles/Public/Home/Top/Information/content";

// contentのロジック
export const useInfoContent = ({ isAdmin, dates, infos, setDeleteInfo, setDeleteOpen, isWide }) => {
    const [showOpen, setShowOpen] = useState(false);
    const [showInfo, setShowInfo] = useState([]);
    const typeCheck = typeof infos !== ("undefined" || "null");
    const lengthCheck = dates.length !== 0;

    // モーダル開閉
    const handleShowClose = useCallback(() => setShowOpen(false));

    // 削除実行時にinfosの日付のキーの種類がdatesと異なり、途中のmapでエラーが出るため
    // datesの要素数とinfosのキーの数を比較
    // お知らせがない時もエラーが出るため条件を追加
    const list = typeCheck && lengthCheck && dates.length === Object.keys(infos).length ?
        <InfoList
            isAdmin={isAdmin}
            dates={dates}
            infos={infos}
            setDeleteInfo={setDeleteInfo}
            setDeleteOpen={setDeleteOpen}
            isWide={isWide}
            setShowInfo={setShowInfo}
            setShowOpen={setShowOpen}
        /> :
        <NoInfo isWide={isWide}>お知らせはありません。</NoInfo>;

    const responsive = isWide ? <ContentPC isWide={isWide} list={list} /> : <ContentMobile list={list} />

    return [{responsive, showOpen, showInfo}, handleShowClose]
};
