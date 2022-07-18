import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

import DeleteConfirmModal from './deleteConfirm';
import SlackGrammar from '../../../Shared/Modal/slackGrammar';
import { CloseModal, SubmitButton, styleHeading } from '../modal';

// 各パーツのスタイル設定
const styleContent = {
    width: "80%",
    m: "50px auto 0"
};
const styleTextField = {
    marginTop: 20,
    marginBottom: 20,
    paddingTop: 2,
    width: '100%',
};
const styleSubHeading = {
    color: '#666666',
    fontSize: '20px',
    fontWeight: 'bold'
};
const styleButtonLink = {
    textDecoration: 'underline',
    width: '25px',
    p: 0,
    fontSize: '18px',
    '&:hover': {
        textDecoration: 'underline'
    }
};
const styleSlackTemplate = {
    marginTop: '10px',
    paddingTop: 2,
    width: '100%',
};


/**
 * イベント詳細
 */
const showEvent = (props) => {
    const history = useHistory();
    const [link, setLink] = useState('');
    const [name, setName] = useState(props.event.name);
    const [template, setTemplate] = useState(props.event.template);
    const [errorName, setErrorName] = useState(false);
    const [errorNameMessage, setErrorNameMessage] = useState('');
    const [errorTemplate, setErrorTemplate] = useState(false);
    const [errorTemplateMessage, setErrorTemplateMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [readOnly, setReadOnly] = useState(true);
    const [state, setState] = useState('normal');
    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // 名前を入力
    const handleName = (event) => {
        if (event.target.value.length == 0) {
            setErrorName(true);
            setErrorNameMessage('イベント名を入力してください');
        } else {
            setErrorName(false);
            setErrorNameMessage('');
        }
        setName(event.target.value);
    };

    // slackテンプレート入力
    const handleTemplate = (event) => {
        if (event.target.value.trim().length == 0) {
            setErrorTemplate(true);
            setErrorTemplateMessage('テンプレートを入力してください');
        } else {
            setErrorTemplate(false);
            setErrorTemplateMessage('');
        }
        setTemplate(event.target.value);
    };

    // イベント編集
    const update = useCallback(() => {
        let validationKey = false;
        // バリデーションチェック
        // 名前が入力されていない時
        if (name.length === 0) {
            validationKey = true;
            setErrorName(true);
            setErrorNameMessage('イベント名を入力してください');
        }

        // 通知テンプレートを設定していない時
        if (template.trim().length === 0) {
            validationKey = true;
            setErrorTemplate(true);
            setErrorTemplateMessage('テンプレートを入力してください');
        }

        if (validationKey) {
            return false;
        }

        axios
            .post("/events/" + props.event.id + "/update", {
                name: name,
                template: template,
            })
            .then(response => {
                if (response.status === 200) {
                    setName('');
                    setTemplate('');
                    props.setEvents(response.data);
                    props.onClose();
                    history.push("/?page=manage", { type: "event", status: "update" });
                }
            }).catch(error => {
                console.log(error);
            });
    });

    // 削除実行
    const deleted = useCallback(() =>{
        axios
            .post('/events/' + props.event.id + '/delete')
            .then(response => {
                if (response.status === 200) {
                    setName('');
                    setTemplate('');
                    props.setEvents(response.data);
                    setDeleteOpen(false);
                    props.onClose();
                    history.push("/?page=manage", { type: "event", status: "delete" });
                }
            }).catch(error => {
                console.log(error);
            });
    });

    useEffect(() => {
        axios
            .get(`/react/reaction`)
            .then(response => {
                setLink(response.data);
            }).catch(error => {
                console.log(error);
            });
    }, []);

    let nameField;
    let button;
    let changeButton;
    switch (state) {
        case "edit":
            nameField = (
                <TextField
                    error={errorName}
                    label="イベント名"
                    value={name}
                    onChange={() => handleName(event)}
                    helperText={errorNameMessage}
                    style={styleTextField}
                />
            );
            button = <SubmitButton text="登録する" handleSubmit={update} />;
            changeButton = (
                <Button
                    onClick={() => {setReadOnly(true), setState("normal"), setName(props.event.name), setTemplate(props.event.template)}}
                    variant="text"
                    sx={[styleButtonLink, { color: "#771AF8" }]}
                >
                    戻る
                </Button>
            );
            break;

        case "normal":
            changeButton = (
                <Button
                    onClick={() => {setReadOnly(false), setState("edit")}}
                    variant="text"
                    sx={[styleButtonLink, { color: "#771AF8" }]}
                >
                    編集
                </Button>
            );
            break;
    }

    return (
        <React.Fragment>
            <DeleteConfirmModal open={deleteOpen} setOpen={setDeleteOpen} delete={deleted} />

            <CloseModal onClose={props.onClose} />
            <Typography align="center" component="div" sx={styleHeading}>
                {props.event.name}
            </Typography>

            <Box sx={styleContent}>
                <Grid container justifyContent="space-between">
                    <Grid item>
                        <Typography component="div" sx={styleSubHeading}>
                            Slack通知メッセージ
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Stack direction="row">
                            {changeButton}
                            <Button
                                onClick={() => setDeleteOpen(true)}
                                variant="text"
                                sx={[styleButtonLink, { color: "red" }]}
                            >
                                削除
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>

                {nameField}
                <TextField
                    label="Slack通知テンプレート"
                    error={errorTemplate}
                    helperText={errorTemplateMessage}
                    minRows={7}
                    maxRows={15}
                    multiline
                    value={template}
                    onChange={(event) => handleTemplate(event)}
                    InputProps={{ readOnly: readOnly }}
                    style={styleSlackTemplate}
                />

                <SlackGrammar link={link} open={open} handleOpen={handleOpen} handleClose={handleClose} isWide={props.isWide} />
            </Box>

            {button}
        </React.Fragment>
    );
};

export default showEvent;
