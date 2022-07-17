import React, { useEffect, useState } from 'react';
import axios from "axios";

// イベント、ユーザーを取得
export const useGetInfo = ({ setStaffs, setStudents, setEvents }) => {
    useEffect(() => {
        let unmounted = false;
        (async() => {
            const res = await axios.get(route('getData.manage'));
            if (!unmounted) {
                setEvents(res.data.events);
                setStaffs({
                    eventList: res.data.staffs.data,
                    itemsCountPerPage: res.data.staffs.per_page,
                    totalItemsCount: res.data.staffs.total,
                    currentPage: res.data.staffs.current_page,
                    pageRangeDisplayed: 10,
                    lastPage: res.data.staffs.last_page
                });
                setStudents({
                    eventList: res.data.students.data,
                    itemsCountPerPage: res.data.students.per_page,
                    totalItemsCount: res.data.students.total,
                    currentPage: res.data.students.current_page,
                    pageRangeDisplayed: 10,
                    lastPage: res.data.students.last_page
                });
            }
        })();

        return () => { unmounted = true; };
    }, []);
};
