import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useHistory} from 'react-router-dom';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import '../../../../../../public/css/Search/show.css';

import SelectEvents from './selectEvents';
import SelectTarget from './selectTarget';

// モーダルのCSS設定
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:'50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    maxHeight: '80%',
    overflow: 'scroll'
};

/**
 * お知らせの追加
 */
function Create(props) {
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [info, setInfo] = useState('');
    const [body, setBody] = useState('');
    const [slack, setSlack] = useState('');
    const [date, setDate] = useState('');
    const [slackDate, setSlackDate] = useState('');
    const [target, setTarget] = useState([]);
    const [infoValodationError, setInfoValidationError] = useState(false);
    const [slackValodationError, setSlackValidationError] = useState(false);
    const [dateValodationError, setDateValidationError] = useState(false);
    const [slackDateValodationError, setSlackDateValidationError] = useState(false);
    const [checked, setChecked] = useState(false);
    const [eventInfo, setEventInfo] = useState([{id: '', name: '', template: ''}]);
    const events = props.events;
    
    const handleOpen = () => setOpen(true);
    
    const handleClose = () => {
        setOpen(false);
        setInfo('');
        setBody('');
        setSlack('');
        setTarget([]);
        setChecked(false);
    };
    
    const handleChange = (event) => {
        setChecked(event.target.checked);
        if (!event.target.checked) {
            setSlack('');
        }
    };
    
    const handleInfo = (event) => {
        setInfoValidationError(false);
        setInfo(event.target.value);
    };
    
    const handleBody = (event) => {
        setBody(event.target.value);
    };
    
    const handleSlack = (event) => {
        setSlackValidationError(false);
        setSlack(event.target.value);
    };
    
    const handleDate = (event) => {
        setDateValidationError(false);
        setDate(event.target.value);
    };
    
    const handleSlackDate = (event) => {
        setSlackDateValidationError(false);
        setSlackDate(event.target.value);
    };
    
    const sameMessage = () => {
        setSlack(body);
    };
    
    useEffect(() => {
        setSlack(eventInfo.template);
    }, [eventInfo]);
    
    const submit = () => {
        // バリデーションチェック
        // お知らせ内容が入力されていない時
        if (info.trim().length === 0) {
            setInfoValidationError(true);
            return false;
        }
        
        // 公開日を設定していない時
        if (date.length === 0) {
            setDateValidationError(true);
            return false;
        }
        
        // slack通知をする場合
        if (checked) {
            // 通知日を設定していない場合
            if (slackDate.length === 0) {
                setSlackDateValidationError(true);
                return false;
            }
            
            // 通知内容を入力していない時
            if (slack.trim().length === 0) {
                setSlackValidationError(true);
                return false;
            }
        }
        
        props.setInfoChanging(true);
        axios
            .post("/informations/store", {
                info: info,
                body: body,
                target: target,
                slack: slack,
                date: date,
                slackDate: slackDate,
            })
            .then(response => {
                if (response.status === 200) {
                    setOpen(false);
                    setInfo('');
                    setBody('');
                    setSlack('');
                    setTarget([]);
                    setSlackDate('');
                    setDate('');
                    setChecked(false);
                    props.setInfoChanging(false);
                    history.push("/", { type: "info", status: "created" });
                }
            }).catch(error => {
                console.log(error);
            });
    };
    
    let validation_message;
    if (infoValodationError || dateValodationError) {
        validation_message = (
            <Typography
                align="center"
                variant="h6"
                color="red"
                sx={{ paddingTop: 2 }}
            >
                未入力の項目があります！
            </Typography>
        );
    } else if (slackValodationError) {
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
        validation_message = ("");
    }
    
    return (
        <div>
            <Typography align="center" variant="h5">
                <Button onClick={ handleOpen }>お知らせを追加する</Button>
            </Typography>
            
            <Modal
                open={ open }
                onClose={ handleClose }
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={ style }>
                    <Typography align="center" sx={{ paddingTop:2 }} variant="h4">
                        お知らせの入力
                    </Typography>
                    
                    <Typography align="center" sx={{ paddingTop:2 }} variant="h6">
                        お知らせタイトル
                    </Typography>
                    <TextareaAutosize
                        placeholder="お知らせを簡潔に記載(250文字以内)"
                        minRows={2}
                        value={ info }
                        onChange={ (event) => handleInfo(event) }
                        style={{ 
                            width: "80%",
                            marginLeft: "10%",
                            paddingTop:2,
                        }}
                    />
                    <Typography align="right" sx={{ fontSize: 13,  width: "80%", marginLeft: "10%" }}>
                        { info.trim().length }文字
                    </Typography>
                    
                    <Typography align="center" sx={{ paddingTop:2 }} variant="h6">
                        お知らせ詳細
                    </Typography>
                    <TextareaAutosize
                        placeholder="お知らせの詳細を記載"
                        minRows={4}
                        value={ body }
                        onChange={ (event) => handleBody(event) }
                        style={{ 
                            width: "80%",
                            marginLeft: "10%",
                            paddingTop:2,
                        }}
                    />
                    
                    <Typography align="center" sx={{ paddingTop:2 }} variant="h6">
                        対象者
                    </Typography>
                    <SelectTarget target={target} setTarget={setTarget} />
                    
                    <Typography align="center" sx={{ paddingTop:2 }} variant="h6">
                        Slack通知メッセージ
                    </Typography>
                    <FormControlLabel sx={{ width: "80%", marginLeft: "10%" }} control={<Checkbox checked={checked} onChange={handleChange}/>} label="slackに通知する" />
                    {checked &&
                        <React.Fragment>
                            <div className="events">
                                <SelectEvents event={eventInfo} setEvent={setEventInfo} events={events} />
                                <Button sx={{ mt: 1, ml: 2 }} onClick={() => sameMessage()}>お知らせ詳細と同じにする</Button>
                            </div>
                            
                            <TextareaAutosize
                                placeholder="slackへの通知メッセージを記載"
                                minRows={4}
                                value={ slack }
                                onChange={ (event) => handleSlack(event) }
                                style={{ 
                                    width: "80%",
                                    marginLeft: "10%",
                                    paddingTop:2,
                                }}
                            />
                            <Typography align="center" sx={{ paddingTop:2 }} variant="h6">
                                通知日の設定
                            </Typography>
                            <Typography align="center" sx={{ paddingTop:2 }}>
                                <p>設定日の13時に通知されます。<br/>急ぎの場合は手動で通知してください。</p>
                                <input type="date" onChange={ handleSlackDate }/>
                            </Typography>
                        </React.Fragment>
                    }
                    
                    <Typography align="center" sx={{ paddingTop:2 }} variant="h6">
                        公開日の設定
                    </Typography>
                    <Typography align="center" sx={{ paddingTop:2 }} color="error">
                        <p>本日以前のお知らせは表示されませんので<br/>ご注意ください</p>
                        <input type="date" onChange={ handleDate }/>
                    </Typography>
                    
                    { validation_message }
                    
                    <Typography align="center" sx={{ paddingTop:2 }}>
                        <Button variant="contained" onClick={ submit }>保存</Button>
                    </Typography>
                    <Typography align="center" sx={{ paddingTop:2 }}>
                        <Button variant="outlined" onClick={ handleClose }>戻る</Button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

export default Create;