import React, { useState, useCallback, useEffect } from 'react';

// conditionのロジック
export const useCondition = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [select, setSelect] = useState({
        category: 0, topic: 0, curriculumNumber: "", keyword: ""
    })

    // 検索ボタンをクリックした場合
    const handleIsClicked = useCallback(() => setIsClicked(true));

    // 検索リセット
    const handleCanceling = useCallback(() => {
        setSelect({ category: 0, topic: 0, curriculumNumber: "", keyword: "" });
    });

    // 入力されたキーワード取得
    const handleInput = useCallback((event) => {
        const name = event.target.name;
        const value = name == "topic" ? Number(event.target.value) : event.target.value;
        setSelect({ ...select, [name]: value });
    });

    // カテゴリー選択
    const handleCategory = useCallback(num => {
        setSelect({ ...select, category: num });
    });

    // カテゴリーが変更されたらトピックを変更
    useEffect(() => {
        const value = select.category === 0 ? 0 : 14;
        setSelect({ ...select, topic: value });
    }, [select.category]);

    // トピックが変更されたらカリキュラム番号を初期化
    useEffect(() => {
        setSelect({ ...select, curriculumNumber: "" });
    }, [select.topic]);

    // 検索条件が変動したら検索結果を消す。
    useEffect(() => {
        setIsClicked(false);
    }, [select]);

    return [{ select, isClicked }, { handleCanceling, handleIsClicked, handleInput, handleCategory }];
};
