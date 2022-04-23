import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import IconButton from "@mui/material/IconButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";

import SelectEvents from "./selectEvents";
import SelectTarget from "./selectTarget";

const today = new Date();
const dateStr =
    today.getFullYear() +
    "-" +
    ("0" + (today.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + today.getDate()).slice(-2);

/**
 * お知らせの追加
 */
const Create = props => {
    const history = useHistory();
    const [info, setInfo] = useState("");
    const [body, setBody] = useState("");
    const [slack, setSlack] = useState("");
    const [date, setDate] = useState(dateStr);
    const [slackDate, setSlackDate] = useState("");
    const [target, setTarget] = useState([]);
    const [validationMessage, setValidationMessage] = useState({
        title: "",
        body: "",
        target: "",
        date: "",
        slackBody: "",
        slackDate: ""
    });
    const [validationError, setValidationError] = useState({
        title: false,
        body: false,
        target: false,
        date: false,
        slackBody: false,
        slackDate: false
    });
    const [slackValodationError, setSlackValidationError] = useState(false);
    const [slackDateValodationError, setSlackDateValidationError] = useState(
        false
    );
    const [checked, setChecked] = useState(false);
    const [eventInfo, setEventInfo] = useState([
        { id: "", name: "", template: "" }
    ]);
    const events = props.events;

    const handleChange = event => {
        setChecked(event.target.checked);
        setSlackDate(dateStr);
        if (!event.target.checked) {
            setSlack("");
            setSlackDate("");
        }
    };

    // タイトルのvalue変更、バリデーション
    const handleInfo = event => {
        if (event.target.value.length === 0) {
            setValidationError({ ...validationError, title: true });
            setValidationMessage({
                ...validationMessage,
                title: "お知らせタイトルを入力してください"
            });
            setValidationError({ ...validationError, title: false });
            setValidationMessage({ ...validationMessage, title: "" });
        }
        setInfo(event.target.value);
    };

    // お知らせ詳細のvalue変更、バリデーション
    const handleBody = event => {
        if (event.target.value.length === 0) {
            setValidationError({ ...validationError, body: true });
            setValidationMessage({
                ...validationMessage,
                body: "お知らせ詳細を入力してください"
            });
        } else {
            setValidationError({ ...validationError, body: false });
            setValidationMessage({ ...validationMessage, body: "" });
        }
        setBody(event.target.value);
    };

    // Slackテンプレートの入力
    const handleSlack = event => {
        if (event.target.value.length === 0) {
            setValidationError({ ...validationError, slackBody: true });
            setValidationMessage({
                ...validationMessage,
                slackBody: "お知らせ詳細を入力してください"
            });
        } else {
            setValidationError({ ...validationError, slackBody: false });
            setValidationMessage({ ...validationMessage, slackBody: "" });
        }
        setSlack(event.target.value);
    };

    // 日付の選択
    const handleDate = event => {
        setValidationError({ ...validationError, date: false });
        setDate(event.target.value);
    };

    // slack通知日の選択
    const handleSlackDate = event => {
        setSlackDateValidationError(false);
        setSlackDate(event.target.value);
    };

    const sameMessage = () => {
        setSlack(body);
    };

    const renderFlgRef = useRef(false);

    useEffect(() => {
        if (renderFlgRef.current) {
            setSlack(eventInfo.template);
        } else {
            renderFlgRef.current = true;
        }
    }, [eventInfo]);

    const submit = () => {
        // バリデーションチェック
        let errorMessage = {
            title: "",
            body: "",
            target: "",
            date: "",
            slackBody: "",
            slackDate: ""
        };

        let validationKey = {
            isNext: true,
            title: false,
            body: false,
            target: false,
            date: false,
            slackBody: false,
            slackDate: false
        };
        // お知らせ内容が入力されていない時
        if (info.trim().length === 0) {
            validationKey.title = true;
            validationKey.isNext = false;
            errorMessage.title = "お知らせタイトルを入力してください";
        }

        //本文が入力されてない時
        if (body.trim().length === 0) {
            validationKey.body = true;
            validationKey.isNext = false;
            errorMessage.body = "お知らせ詳細を入力してください";
        }
        //対象が入力されてない時
        if (target.length === 0) {
            validationKey.target = true;
            validationKey.isNext = false;
            errorMessage.target = "対象者を入力してください";
        }

        // 公開日を設定していない時
        if (date.length === 0) {
            validationKey.date = true;
            validationKey.isNext = false;
            errorMessage.date = "日付を入力してください";
        }

        // slack通知をする場合
        if (checked) {
            // 通知日を設定していない場合
            if (slackDate.length === 0) {
                validationKey.slackDate = true;
                validationKey.isNext = false;
                errorMessage.slackDate = "日付を入力してください。";
            }

            // 通知内容を入力していない時
            if (slack.trim().length === 0) {
                validationKey.slackBody = true;
                validationKey.isNext = false;
                errorMessage.slackBody = "通知する内容を入力してください。";
            }
        }

        if (!validationKey.isNext) {
            setValidationError(validationKey);
            setValidationMessage(errorMessage);
            return false;
        }

        axios
            .post("/informations/store", {
                info: info,
                body: body,
                target: target,
                slack: slack,
                date: date,
                slackDate: slackDate
            })
            .then(response => {
                if (response.status === 200) {
                    setInfo("");
                    setBody("");
                    setSlack("");
                    setTarget([]);
                    setSlackDate("");
                    setDate("");
                    setChecked(false);
                    props.setInfos(response.data.infos);
                    props.setDates(response.data.dates);
                    props.onClose();
                    history.push("/?page=top", {
                        type: "info",
                        status: "created"
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    let validation_message;
    if (slackValodationError) {
        validation_message = (
            <Typography
                align="center"
                variant="h6"
                color="red"
                sx={{ paddingTop: 2 }}
            >
                通知内容が設定されていません！
            </Typography>
        );
    } else if (slackDateValodationError) {
        validation_message = (
            <Typography
                align="center"
                variant="h6"
                color="red"
                sx={{ paddingTop: 2 }}
            >
                通知日が設定されていません！
            </Typography>
        );
    } else {
        validation_message = "";
    }

    return (
        <React.Fragment>
            <IconButton
                onClick={() => props.onClose()}
                sx={{ color: "red", ml: "95%" }}
            >
                <HighlightOffIcon />
            </IconButton>
            <Typography
                align="center"
                component="div"
                sx={{ color: "#771AF8", fontSize: "24px", fontWeight: "bold" }}
            >
                お知らせの追加
            </Typography>

            <Box sx={{ width: "80%", m: "50px auto 0" }}>
                <Typography
                    component="div"
                    sx={{
                        color: "#666666",
                        fontSize: "20px",
                        fontWeight: "bold"
                    }}
                >
                    タイトル
                </Typography>
                <TextField
                    label="タイトル"
                    placeholder="250文字以内"
                    multiline
                    error={validationError.title}
                    helperText={validationMessage.title}
                    value={info}
                    onChange={event => handleInfo(event)}
                    sx={{ width: "100%", mt: 1 }}
                />
                <Typography align="right" sx={{ fontSize: 13 }}>
                    {info.trim().length}文字
                </Typography>

                <Typography
                    component="div"
                    sx={{
                        color: "#666666",
                        fontSize: "20px",
                        fontWeight: "bold"
                    }}
                >
                    お知らせ詳細
                </Typography>
                <TextField
                    label="お知らせ詳細"
                    multiline
                    rows={4}
                    error={validationError.body}
                    helperText={validationMessage.body}
                    value={body}
                    onChange={event => handleBody(event)}
                    sx={{ width: "100%", mt: 1 }}
                />

                <Typography
                    component="div"
                    sx={{
                        color: "#666666",
                        fontSize: "20px",
                        fontWeight: "bold",
                        mt: 2,
                        mb: 1
                    }}
                >
                    対象者
                </Typography>
                <SelectTarget
                    validationMessage={validationMessage.target}
                    validationError={validationError}
                    setValidationError={setValidationError}
                    setValidationMessage={setValidationMessage}
                    target={target}
                    setTarget={setTarget}
                />

                <Typography
                    component="div"
                    sx={{
                        color: "#666666",
                        fontSize: "20px",
                        fontWeight: "bold",
                        mt: 2
                    }}
                >
                    公開日
                    <Typography
                        component="span"
                        sx={{ pl: 1, color: "red", fontSize: "14px" }}
                    >
                        本日以前を選択したお知らせは表示されません。
                    </Typography>
                </Typography>
                {/*<input type="date" onChange={ handleDate }/>*/}
                <TextField
                    label="公開日"
                    type="date"
                    value={date}
                    onChange={event => handleDate(event)}
                    sx={{ width: "50%", mt: 1 }}
                />

                <FormControlLabel
                    sx={{ width: "100%" }}
                    control={
                        <Checkbox checked={checked} onChange={handleChange} />
                    }
                    label="slackに通知する"
                />
                {checked && (
                    <React.Fragment>
                        <Typography
                            component="div"
                            sx={{
                                color: "#666666",
                                fontSize: "20px",
                                fontWeight: "bold",
                                mt: 1
                            }}
                        >
                            Slack通知メッセージ
                        </Typography>
                        <TextField
                            label="slackへの通知メッセージを記載"
                            multiline
                            rows={4}
                            error={validationError.slackBody}
                            helperText={validationMessage.slackBody}
                            value={slack}
                            onChange={event => handleSlack(event)}
                            sx={{ width: "100%" }}
                        />
                        <Typography
                            component="div"
                            sx={{ fontSize: "16px", mt: 2, color: "#666666" }}
                        >
                            以下からテンプレートを選択できます。
                        </Typography>
                        <div className="events">
                            <SelectEvents
                                event={eventInfo}
                                setEvent={setEventInfo}
                                events={events}
                            />
                            <Button
                                sx={{ mt: 2, ml: 2 }}
                                onClick={() => sameMessage()}
                            >
                                お知らせ詳細と同じにする
                            </Button>
                        </div>

                        <Typography
                            component="div"
                            sx={{
                                color: "#666666",
                                fontSize: "20px",
                                fontWeight: "bold",
                                mt: 1
                            }}
                        >
                            通知日の設定
                        </Typography>
                        <Typography
                            component="div"
                            sx={{ color: "red", fontSize: "14px" }}
                        >
                            設定日の13時に通知されます。急ぎの場合は手動で通知してください。
                        </Typography>
                        <TextField
                            label="slack通知日"
                            type="date"
                            value={slackDate}
                            onChange={event => handleSlackDate(event)}
                            sx={{ width: "50%", mt: 1 }}
                        />
                        <Typography sx={{ color: "red" }}>
                            {validationMessage.slackDate}
                        </Typography>
                    </React.Fragment>
                )}
                {validation_message}

                <Typography align="center" sx={{ paddingTop: 2 }}>
                    <Button
                        onClick={() => submit()}
                        variant="outlined"
                        sx={{
                            color: "#771AF8",
                            border: "1px solid #771AF8",
                            "&:hover": {
                                color: "white",
                                backgroundColor: "#771AF8",
                                border: "1px solid #771AF8"
                            }
                        }}
                    >
                        登録する
                    </Button>
                </Typography>
            </Box>
        </React.Fragment>
    );
};

export default Create;
