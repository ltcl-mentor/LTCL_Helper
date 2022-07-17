import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia';

// userIndexのロジック
export const useUsers = ({ setStaffs, setStudents }) => {
    const [passNumber, setPassNumber] = useState('');
    const [open, setOpen] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState('');

    // パスワード表示
    const revealPass = useCallback((number) => {
        passNumber === number ? setPassNumber('') : setPassNumber(number);
    });

    const handleOpen = useCallback(id => {
        setDeleteUserId(id);
        setOpen(true);
    });

    // ユーザー削除
    const deleteUser = useCallback(async () => {
        const res = await axios.post(`/users/${deleteUserId}/delete`)
        setStudents({
            eventList: res.data.students.data,
            itemsCountPerPage: res.data.students.per_page,
            totalItemsCount: res.data.students.total,
            currentPage: res.data.students.current_page,
            pageRangeDisplayed: 10,
            lastPage: res.data.students.last_page,
        });
        setStaffs({
            eventList: res.data.staffs.data,
            itemsCountPerPage: res.data.staffs.per_page,
            totalItemsCount: res.data.staffs.total,
            currentPage: res.data.staffs.current_page,
            pageRangeDisplayed: 10,
            lastPage: res.data.staffs.last_page,
        });
        Inertia.get(route('home', { page: 'manage' }));
    });

    // ユーザーロック解除実行
    const unlockUser = useCallback(async (id) => {
        if (confirm('ユーザのロックを解除します。\nよろしいですか？')) {
            const res = axios.post(`/users/${id}/unlock`)
            setStudents({
                eventList: res.data.students.data,
                itemsCountPerPage: res.data.students.per_page,
                totalItemsCount: res.data.students.total,
                currentPage: res.data.students.current_page,
                pageRangeDisplayed: 10,
                lastPage: res.data.students.last_page,
            });
            setStaffs({
                eventList: res.data.staffs.data,
                itemsCountPerPage: res.data.staffs.per_page,
                totalItemsCount: res.data.staffs.total,
                currentPage: res.data.staffs.current_page,
                pageRangeDisplayed: 10,
                lastPage: res.data.staffs.last_page,
            });
            Inertia.get(route('home', { page: 'manage' }));
        } else {
            window.alert('キャンセルしました');
            return false;
        }
    });

    // 管理者側ペジネーションのクリック管理
    const handlePageClick = useCallback(async (event, index) => {
        const res = await axios.get(`/react/mentor?page=${index}`)
        setStaffs({
            eventList: res.data.staffs.data,
            itemsCountPerPage: res.data.staffs.per_page,
            totalItemsCount: res.data.staffs.total,
            currentPage: res.data.staffs.current_page,
            pageRangeDisplayed: 10,
            lastPage: res.data.staffs.last_page,
        });
    });

    // 受講生側ペジネーションのクリック管理
    const handlePageClickStudent = useCallback(async (event, index) => {
        const res = await axios.get(`/react/mentor?page=${index}`)
        setStudents({
            eventList: res.data.students.data,
            itemsCountPerPage: res.data.students.per_page,
            totalItemsCount: res.data.students.total,
            currentPage: res.data.students.current_page,
            pageRangeDisplayed: 10,
            lastPage: res.data.students.last_page,
        });
    });

    return [{ passNumber, open, setOpen }, { revealPass, handleOpen, deleteUser, unlockUser, handlePageClick, handlePageClickStudent }];
};
