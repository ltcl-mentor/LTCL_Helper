import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import SlackGrammar from './slackGrammar';
import ContentPC from './responsive/addEventPC';
import ContentMobile from './responsive/addEventMobile';
import { CloseModal, SubmitButton, styleHeading } from '../modal';

// 各パーツのスタイル設定
const styleContent = { 
    width: "80%", 
    m: "50px auto 0"
};
const styleSlackTemplate = {
    marginTop: "10px",
    paddingTop: 2,
    width: "100%"
};
export const styleTextField = { width: '100%' };
export const styleSubHeading = {
    color: "#666666",
    fontSize: "20px",
    fontWeight: "bold",
    mt: "14px"
};


/**
 * イベント追加
 */
const addEvent = props => {
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
    const handleName = useCallback(event => {
        if (event.target.value.length == 0) {
            setErrorName(true);
            setErrorNameMessage("イベント名を入力してください");
        } else {
            setErrorName(false);
            setErrorNameMessage("");
        }
        setName(event.target.value);
    });

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
    const store = useCallback(() => {
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
    });

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
    
    let eventName;
    if (props.isWide) {
        eventName = (
            <ContentPC 
                value={name}
                onChange={handleName}
                error={errorName}
                helperText={errorNameMessage}
            />
        );
    } else {
        eventName = (
            <ContentMobile 
                value={name}
                onChange={handleName}
                error={errorName}
                helperText={errorNameMessage}
            />
        );
    }

    return (
        <React.Fragment>
            <CloseModal onClose={props.onClose} />
            <Typography align="center" component="div" sx={styleHeading}>
                イベントの追加
            </Typography>

            <Box sx={styleContent}>
                {eventName}

                <Typography component="div" sx={styleSubHeading}>
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
                    style={styleSlackTemplate}
                />
                
                <SlackGrammar link={link} open={open} handleOpen={handleOpen} handleClose={handleClose} isWide={props.isWide} />
            </Box>

            <SubmitButton text="登録する" handleSubmit={store} />
        </React.Fragment>
    );
};

export default addEvent;