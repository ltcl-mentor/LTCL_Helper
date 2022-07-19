import React, { useCallback } from "react";
import { Inertia } from "@inertiajs/inertia";
import axios from "axios";

// 受講生登録
export const registerStudent = ({ names, select, setError, clickCount, setClickCount, password }) => {
    const submitStudents = useCallback(async () => {
        if (names.length < select.number) {
            setError("空欄があります");
            return false;
        }

        let validationKey = false
        names.forEach(name => {
            if (name.name.length === 0) {
                setError("空欄があります");
                validationKey = true;
            }
        });

        if (validationKey || clickCount !== 0) return false

        setClickCount(1);
        await axios.post(route('student.register'), {
            names: names,
            password: password
        })
        .catch(err => { setClickCount(0); });
        Inertia.get(route('home', { page: 'manage' }));
    });

    return submitStudents;
};
