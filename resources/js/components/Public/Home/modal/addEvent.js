import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";

// モーダルのCSS設定
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
};

/**
 * イベント追加
 */
const AddEvent = props => {
    const history = useHistory();
    const [link, setLink] = useState("");
    const [name, setName] = useState("");
    const [template, setTemplate] = useState("");
    const [errorName, setErrorName] = useState(false);
    const [errorNameMessage, setErrorNameMessage] = useState("");
    const [errorTemplate, setErrorTemplate] = useState(false);
    const [errorTemplateMessage, setErrorTemplateMessage] = useState("");
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // 名前を入力
    const handleName = event => {
        if (event.target.value.length == 0) {
            setErrorName(true);
            setErrorNameMessage("イベント名を入力してください");
        } else {
            setErrorName(false);
            setErrorNameMessage("");
        }
        setName(event.target.value);
    };

    // slackテンプレート入力
    const handleTemplate = event => {
        if (event.target.value.trim().length == 0) {
            setErrorTemplate(true);
            setErrorTemplateMessage("テンプレートを入力してください");
        } else {
            setErrorTemplate(false);
            setErrorTemplateMessage("");
        }
        setTemplate(event.target.value);
    };

    // イベント保存
    const store = () => {
        let validationKey = false;
        // バリデーションチェック
        // 名前が入力されていない時
        if (name.length === 0) {
            validationKey = true;
            setErrorName(true);
            setErrorNameMessage("イベント名を入力してください");
        }

        // 通知テンプレートを設定していない時
        if (template.trim().length === 0) {
            validationKey = true;
            setErrorTemplate(true);
            setErrorTemplateMessage("テンプレートを入力してください");
        }

        if (validationKey) {
            return false;
        }

        axios
            .post("/events/store", {
                name: name,
                template: template
            })
            .then(response => {
                if (response.status === 200) {
                    setName("");
                    setTemplate("");
                    props.setEvents(response.data);
                    props.onClose();
                    history.push("/?page=manage", {
                        type: "event",
                        status: "store"
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        axios
            .get(`/react/reaction`)
            .then(response => {
                setLink(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

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
                イベントの追加
            </Typography>

            <Box sx={{ width: "80%", m: "50px auto 0" }}>
                <Grid
                    container
                    sx={{ justifyContent: "space-between", height: "70px" }}
                >
                    <Grid item sx={{ flexGrow: 1, height: "100%" }}>
                        <Typography
                            component="p"
                            sx={{
                                color: "#666666",
                                fontSize: "20px",
                                fontWeight: "bold",
                                mt: "14px"
                            }}
                        >
                            イベント名
                        </Typography>
                    </Grid>
                    <Grid item sx={{ flexGrow: 5, height: "100%" }}>
                        <TextField
                            error={errorName}
                            label="イベント名を入力"
                            value={name}
                            onChange={() => handleName(event)}
                            helperText={errorNameMessage}
                            style={{ width: "100%" }}
                        />
                    </Grid>
                </Grid>

                <Typography
                    component="div"
                    sx={{
                        color: "#666666",
                        fontSize: "20px",
                        fontWeight: "bold"
                    }}
                >
                    Slack通知メッセージ
                </Typography>
                <TextField
                    label="Slack通知テンプレート"
                    error={errorTemplate}
                    helperText={errorTemplateMessage}
                    minRows={7}
                    maxRows={15}
                    multiline
                    value={template}
                    onChange={event => handleTemplate(event)}
                    style={{
                        marginTop: "10px",
                        paddingTop: 2,
                        width: "100%"
                    }}
                />
                <div>
                    <a
                        href={link}
                        target="_blank"
                        style={{ textDecoration: "underline", m: 0 }}
                    >
                        slackのリアクションはこちらのサイトの通りに記載してください。
                    </a>
                    <p
                        onClick={() => handleOpen()}
                        style={{ cursor: "pointer" }}
                    >
                        slack文法
                    </p>
                </div>
            </Box>

            <Typography
                align="center"
                component="div"
                sx={{ marginTop: 4, marginBottom: 3 }}
            >
                <Button
                    onClick={() => store()}
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

            {/* slack文法詳細のモーダル */}
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography align="center" variant="h6" sx={{ mb: 3 }}>
                        以下のもので文字を囲ってください
                    </Typography>
                    <Typography>
                        * ： 太字
                        <br />
                        ` ： インラインコードブロック
                        <br />
                        ``` ： コードブロック
                        <br />
                    </Typography>

                    <Typography align="center" sx={{ paddingTop: 2 }}>
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleClose()}
                            sx={{
                                color: "#771AF8",
                                border: "1px solid #771AF8",
                                "&:hover": {
                                    border: "1px solid #771AF8",
                                    backgroundColor: "#771AF8",
                                    color: "white"
                                }
                            }}
                        >
                            戻る
                        </Button>
                    </Typography>
                </Box>
            </Modal>
        </React.Fragment>
    );
};

export default AddEvent;
