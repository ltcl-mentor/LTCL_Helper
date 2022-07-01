import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@material-ui/core/Card';
import Modal from '@mui/material/Modal';
import '../../../../../../public/css/Search/show.css';

import Breadcrumbs from '../../../Common/Breadcrumbs';

// モーダルのCSS設定
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:'30%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

/**
 * イベント作成、編集のメインコンポーネント
 */
function Create() {
    const { id } = useParams();
    const history = useHistory();
    const [link, setLink] = useState('');
    const [name, setName] = useState([]);
    const [template, setTemplate] = useState('');
    const [errorName, setErrorName] = useState(false);
    const [errorNameMessage, setErrorNameMessage] = useState('');
    const [errorTemplate, setErrorTemplate] = useState(false);
    const [errorTemplateMessage, setErrorTemplateMessage] = useState('');
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

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

    useEffect(() => {
        axios
            .get(`/react/reaction`)
            .then(response => {
                setLink(response.data);
            }).catch(error => {
                console.log(error);
            });

        // 編集の時は個別のイベントデータを取得
        if (id !== undefined) {
            axios
                .get("/react/event/" + id)
                .then(response => {
                    setName(response.data.name);
                    setTemplate(response.data.template);
                }).catch(error => {
                    console.log(error);
                });
        }
    }, []);

    const submit = () => {
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
            console.log('error')
            setErrorTemplateMessage('テンプレートを入力してください');
        }

        if (validationKey) {
            return false
        }

        if (id === undefined) { // 新規作成の場合
            axios
                .post("/events/store", {
                    name: name,
                    template: template,
                })
                .then(response => {
                    if (response.status === 200) {
                        setName('');
                        setTemplate('');
                        history.push("/events/index", { type: "event", status: "store" });
                    }
                }).catch(error => {
                    console.log(error);
                });
        } else { // 編集の場合
            axios
                .post("/events/" + id + "/update", {
                    name: name,
                    template: template,
                })
                .then(response => {
                    if (response.status === 200) {
                        setName('');
                        setTemplate('');
                        history.push("/events/index", { type: "event", status: "update" });
                    }
                }).catch(error => {
                    console.log(error);
                });
        }
    };

    return (
        <div className="container">
            <Breadcrumbs page="mentor_event_create" />

            <Box sx={{ width: "90%", marginLeft: "5%" }}>
                <Card sx={{ marginBottom: 2, paddingTop: 3 }}>
                    <Typography align="center" sx={{ paddingTop:2 }} variant="h4">
                        イベントの追加
                    </Typography>

                    <TextField
                        error={errorName}
                        label="イベント名"
                        value={name}
                        onChange={() => handleName(event)}
                        helperText={errorNameMessage}
                        fullwidth="true"
                        style={{
                            width: "80%",
                            marginTop: 20,
                            marginLeft: "10%",
                            paddingTop:2,
                        }}
                    />

                    <TextField
                        label="Slack通知テンプレート"
                        error={errorTemplate}
                        helperText={errorTemplateMessage}
                        minRows={7}
                        maxRows={15}
                        multiline
                        value={template}
                        onChange={(event) => handleTemplate(event)}
                        style={{
                            width: "80%",
                            marginTop: 20,
                            marginLeft: "10%",
                            paddingTop:2,
                        }}
                    />
                    <div className="link">
                        <a href={link} target="_blank">slackのリアクションはこちらのサイトの通りに記載してください。</a>
                        <p onClick={() => handleOpen()}>slack文法</p>
                    </div>

                    <Typography align="center" sx={{ paddingTop:2 }}>
                        <Button variant="contained" onClick={ submit }>保存</Button>
                    </Typography>
                </Card>
            </Box>

            {/* slack文法詳細のモーダル */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={ style }>
                    <Typography align="center" variant="h6" sx={{ mb: 3 }}>
                        以下のもので文字を囲ってください
                    </Typography>
                    <Typography>
                        * ： 太字<br/>
                        ` ： インラインコードブロック<br/>
                        ``` ： コードブロック<br/>
                    </Typography>

                    <Typography align="center" sx={{ paddingTop:2 }}>
                        <Button variant="outlined" onClick={() => handleClose()}>戻る</Button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default Create;
