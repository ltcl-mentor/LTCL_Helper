import React, { useState, useCallback, useEffect } from "react";
import { registerAdmin } from "./registerAdmin";
import { registerStudent } from "./registerStudent";

// userRegisterのロジック
export const useRegister = () => {
    const [clickCount, setClickCount] = useState(0);
    const [names, setNames] = useState([]);
    const [password, setPassword] = useState("")
    const [select, setSelect] = useState({ year: "", month: "", number: "" });
    const [input, setInput] = useState({ name: "", password: "", confirmPassword: "" });
    const [error, setError] = useState('');
    const [validate, setValidate] = useState({
        name: { error: false, message: "" },
        password: { error: false, message: "" },
        confirmPassword: { error: false, message: "" }
    });
    const submitAdmin = registerAdmin({ setValidate, clickCount, setClickCount, input, validate });
    const submitStudents = registerStudent({ names, select, setError, clickCount, setClickCount, password });

    useEffect(() => {
        const pass = "ltcl" + (select.year % 100) + ("0" + select.month).slice(-2);
        setPassword(pass);
    }, [select]);

    // 名前、パスワード、確認用パスワードの入力（管理者）
    const handleChange = useCallback((event) => {
        const value = event.target.value;
        const name = event.target.name;

        if (value.length == 0) {
            setValidate({ ...validate, [name]: { error: true, message: "入力してください" } });
        } else {
            setValidate({ ...validate, [name]: { error: false, message: "" } });
        }
        setInput({ ...input, [name]: value });
    });

    // 受講生名入力
    const handleNames = useCallback((event) => {
        const value = event.target.value;
        const name = Number(event.target.name);
        let prevNames = names;
        const ids = prevNames.map(name => name.id);

        if (ids.includes(name)) {
            setNames((prevState) =>
                prevState.map((obj) => (obj.id === name ? { id: obj.id, name: value } : obj))
            );
        } else {
            setNames((prevState) => [...prevState, { id: name, name: value }]);
        }

        setError('')
    });

    // 年・月・人数の選択
    const handleSelect = useCallback(event => {
        const value = event.target.value;
        const name = event.target.name;
        setSelect({ ...select, [name]: value });
    });

    return [{ error, select, input, validate }, { submitAdmin, submitStudents, handleChange, handleNames, handleSelect }];
};
