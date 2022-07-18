import React, { useState, useEffect, useRef, useCallback } from "react";

const today = new Date();
const dateStr = today.getFullYear() + "-" + ("0" + (today.getMonth() + 1)).slice(-2) + "-" + ("0" + today.getDate()).slice(-2);

// createのロジック
export const useCreateInfo = () => {
    const renderFlgRef = useRef(false);
    const [checked, setChecked] = useState(false);
    const [eventInfo, setEventInfo] = useState([
        { id: "", name: "", template: "" }
    ]);
    const [input, setInput] = useState({
        title: "", body: "", target: [], date: dateStr, slackBody: "", slackDate: "",
    });
    const [validation, setValidation] = useState({
        title : { error: false, message: "" },
        body: { error: false, message: "" },
        target: { error: false, message: "" },
        date: { error: false, message: "" },
        slackBody: { error: false, message: "" },
        slackDate: { error: false, message: "" },
    });

    // チェックボックス切り替え
    const handleChange = useCallback((event) => {
        setChecked(event.target.checked);
        setInput({ ...input, slackDate: dateStr });
        if (!event.target.checked) setInput({ ...input, slackBody: dateStr, slackDate: "" });
    });

    // メッセージ自動入力
    const sameMessage = useCallback(() => {
        const body = input.body;
        setInput({ ...input, slackBody: body });
    });

    const decisionErrorMessage = target => {
        switch (target) {
            case "title": return "お知らせタイトルを入力してください";
            case "body": return "お知らせ詳細を入力してください";
            case "slackBody": return "お知らせ詳細を入力してください";
            default: return "";
        }
    }

    // タイトル、お知らせ詳細、slack通知メッセージの入力
    const handleInput = useCallback((event) => {
        const value = event.target.value;
        const name = event.target.name;

        if (value.length === 0) {
            const errorMessage = decisionErrorMessage(name);
            setValidation({ ...validation, [name]: { error: true, message: errorMessage } });
        } else {
            setValidation({ ...validation, [name]: { error: false, message: "" } });
        }
        setInput({ ...input, [name]: value });
    });

    // 公開日付、slack通知日の選択
    const handleDate = useCallback((event) => {
        const value = event.target.value;
        const name = event.target.name;
        setValidation({ ...validation, [name]: { error: false, message: "" } });
        setInput({ ...input, [name]: value });
    });

    // 対象者の選択
    const handleTarget = useCallback((event) => {
        if (event.target.value.length === 0) {
            setValidation({ ...validation, target: { error: true, message: "対象を選択してください" } });
        } else {
            setValidation({ ...validation, target: { error: false, message: "" } });
        }
        const { target: { value }} = event;
        setInput({ ...input, target: typeof value === "string" ? value.split(",") : value });
    });

    // イベントの選択
    const handleEvent = useCallback((event) => {
        const { target: { value }} = event;
        setEventInfo(typeof value === "string" ? value.split(",") : value);
    });

    useEffect(() => {
        if (renderFlgRef.current) {
            setInput({ ...input, slackBody: eventInfo.template });
        } else {
            renderFlgRef.current = true;
        }
    }, [eventInfo]);


    return [{ dateStr, eventInfo, checked, input, validation, setValidation }, { handleChange, sameMessage, handleInput, handleDate, handleTarget, handleEvent }];
};
