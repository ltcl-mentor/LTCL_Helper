import React, { useState, useEffect, useCallback } from 'react';
import { useMountedState } from 'react-use';
import { Inertia } from '@inertiajs/inertia';
import Top from '@/Components/Public/Home/Top/Top';

// タブパネルの関数
export const useChangeTab = (user) => {
    let search = window.location.search.split('=')[1]; // URLからコンポーネント判断
    search = typeof search === "undefined" ? "top" : search;
    const isMounted = useMountedState(); // マウントを検知
    const [value, setValue] = useState(0);  // タブ切り替え時の状態保持

    let component;
    switch (value) {
        case 0: component = <Top user={user} />; break;
        case 1: component = "QA"; break;
        case 2: component = "manage"; break;
    }

    // タブ切り替え用
    const handleChange = useCallback((event, newValue) => {
        switch (newValue) {
            case 0: Inertia.get('/?page=top'); break;
            case 1: Inertia.get('/?page=qa'); break;
            case 2: Inertia.get('/?page=manage'); break;
        }
    });

    // クエリパラメータの値によるコンポーネントの切り替え（タブを押された時以外）
    useEffect(() => {
        if (!isMounted()) return; // マウントされていなければ処理停止

        switch (search) {
            case "top": setValue(0); break;
            case "qa": setValue(1); break;
            case "manage": setValue(2); break;
        }
    }, [search]);

    return [{ value, component }, handleChange];
};
