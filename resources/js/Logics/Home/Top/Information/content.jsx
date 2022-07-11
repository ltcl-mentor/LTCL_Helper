import React, { useCallback, useState } from "react";

// contentのロジック
export const useInfoContent = ({ setDeleteInfo, setDeleteOpen }) => {
    const [showOpen, setShowOpen] = useState(false);
    const [showInfo, setShowInfo] = useState([]);

    // モーダル開閉
    const handleShowClose = useCallback(() => setShowOpen(false));

    // お知らせ削除選択
    const selectDelete = useCallback(id => {
        setDeleteOpen(true);
        setDeleteInfo(id);
    });

    // お知らせ詳細の表示
    const showInformation = useCallback(info => {
        setShowOpen(true);
        setShowInfo(info);
    });

    return [{ showInfo, showOpen }, { selectDelete, handleShowClose, showInformation }];
};
