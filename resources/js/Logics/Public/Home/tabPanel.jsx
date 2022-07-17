import React, { useState, useEffect, useCallback } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Top from '@/Components/Public/Home/Top/Top';
import QA from '@/Components/Public/Home/QA/QA';
import Manage from '@/Components/Mentor/Home/Manage/Manage';

// タブパネルの関数
export const useChangeTab = (user) => {
    let search = window.location.search.split('=')[1]; // URLからコンポーネント判断
    search = typeof search === "undefined" ? "top" : search;
    const [value, setValue] = useState(0);  // タブ切り替え時の状態保持

    let component;
    switch (value) {
        case 0: component = <Top user={user} />; break;
        case 1: component = <QA user={user} />; break;
        case 2: component = <Manage user={user} />; break;
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
        let unmounted = false;

        if(!unmounted) {
            switch (search) {
                case "top": setValue(0); break;
                case "qa": setValue(1); break;
                case "manage": setValue(2); break;
            }
        }

        return () => { unmounted = true; };
    }, [search]);

    return [{ value, component }, handleChange];
};
