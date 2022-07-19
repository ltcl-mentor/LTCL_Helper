import React, { useCallback } from 'react';
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia';

// 削除実行
export const del = ({ event }) => {
    const deleted = useCallback(async () =>{
        await axios.post(route('delete.event', event.id));
        Inertia.get(route('home', { page: 'manage' }));
    });

    return deleted;
};
