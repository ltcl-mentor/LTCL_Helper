import React, {useState, useEffect, useRef} from 'react';
import axios from "axios";
import {useHistory} from 'react-router-dom';
import '../../../../../../../public/css/Search/show.css';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

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
const Create = (props) => {
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [info, setInfo] = useState('');
    const [body, setBody] = useState('');
    const [slack, setSlack] = useState('');
    const [date, setDate] = useState('');
    const [slackDate, setSlackDate] = useState('');
    const [target, setTarget] = useState([]);
    const [validationMessage, setValidationMessage] = useState({
        title: "",
        body: "",
        target: "",
        date: "",
        slackBody: "",
        slackDate: "",
    });
    const [validationError, setValidationError] = useState({
        title: false,
        body: false,
        target: false,
        date: false,
        slackBody: false,
        slackDate: false,
    });
    const [slackValodationError, setSlackValidationError] = useState(false);
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
    
    //タイトルのvalue変更、バリデーション
    const handleInfo = (event) => {
        if (event.target.value.length === 0) {
            setValidationError({...validationError, title: true});
            setValidationMessage({...validationMessage, title:"お知らせタイトルを入力してください"});
            setValidationError({...validationError, title: false});
            setValidationMessage({...validationMessage, title:""});
        }
        setInfo(event.target.value);
    };
    
    //お知らせ詳細のvalue変更、バリデーション
    const handleBody = (event) => {
        if (event.target.value.length === 0) {
            setValidationError({...validationError, body: true});
            setValidationMessage({...validationMessage, body:"お知らせ詳細を入力してください"});
        } else {
            setValidationError({...validationError, body: false});
            setValidationMessage({...validationMessage, body:""});
        }
        setBody(event.target.value);
    };
    
    const handleSlack = (event) => {
        if (event.target.value.length === 0) {
            setValidationError({...validationError, slackBody: true});
            setValidationMessage({...validationMessage, slackBody:"お知らせ詳細を入力してください"});
        } else {
            setValidationError({...validationError, slackBody: false});
            setValidationMessage({...validationMessage, slackBody:""});
        }
        setSlack(event.target.value);
    };
    
    const handleDate = (event) => {
        setValidationError({...validationError, date: false});
        setDate(event.target.value);
    };
    
    const handleSlackDate = (event) => {
        setSlackDateValidationError(false);
        setSlackDate(event.target.value);
    };
    
    const sameMessage = () => {
        setSlack(body);
    };
    
    const renderFlgRef = useRef(false);
    
    useEffect(() => {
    if(renderFlgRef.current) {
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
        slackDate: "",
    };
        
        let validationKey = {
            isNext: true,
            title: false,
            body: false,
            target: false,
            date: false,
            slackBody: false,
            slackDate: false,
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
        
        if (!(validationKey.isNext)) {
            setValidationError(validationKey);
            setValidationMessage(errorMessage);
            return false;
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
        validation_message = ("");
    }
    
    return (
        <React.Fragment>
            <Button sx={{ verticalAlign: 'top' }}onClick={ handleOpen }>お知らせを追加する</Button>
            
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
                    
                    <TextField
                        label="お知らせタイトル"
                        placeholder="お知らせを簡潔に記載(250文字以内)"
                        multiline
                        rows={2}
                        error={ validationError.title }
                        helperText={ validationMessage.title }
                        value={ info }
                        onChange={ (event) => handleInfo(event) }
                        sx={{ 
                            width: "80%",
                            marginLeft: "10%",
                            marginTop:4,
                        }}
                    />
                    <Typography align="right" sx={{ fontSize: 13,  width: "80%", marginLeft: "10%" }}>
                        { info.trim().length }文字
                    </Typography>
                    
                    <TextField
                        label="お知らせ詳細"
                        placeholder="お知らせの詳細を記載"
                        multiline
                        rows={4}
                        error={ validationError.body }
                        helperText={ validationMessage.body }
                        value={ body }
                        onChange={ (event) => handleBody(event) }
                        sx={{ 
                            width: "80%",
                            marginLeft: "10%",
                            marginTop:4,
                        }}
                    />
                    
                    <Typography align="center" sx={{ paddingTop:2 }} variant="h6">
                        対象者
                    </Typography>
                    <SelectTarget 
                        validationMessage={ validationMessage.target } 
                        validationError={validationError} 
                        setValidationError={setValidationError} 
                        setValidationMessage={setValidationMessage} 
                        target={target} 
                        setTarget={setTarget}
                    />
                    
                    <FormControlLabel sx={{ width: "80%", marginLeft: "10%" }} control={<Checkbox checked={checked} onChange={handleChange}/>} label="slackに通知する" />
                    {checked &&
                        <React.Fragment>
                        <Typography align="center" sx={{ paddingTop:2 }} variant="h6">
                        Slack通知メッセージ
                    </Typography>
                            <div className="events">
                                <SelectEvents event={eventInfo} setEvent={setEventInfo} events={events} />
                                <Button sx={{ mt: 1, ml: 2 }} onClick={() => sameMessage()}>お知らせ詳細と同じにする</Button>
                            </div>
                            
                            <TextField
                                label="slackへの通知メッセージを記載"
                                multiline
                                rows={4}
                                error={ validationError.slackBody }
                                helperText={ validationMessage.slackBody}
                                value={ slack }
                                onChange={ (event) => handleSlack(event) }
                                sx={{ 
                                    width: "80%",
                                    marginLeft: "10%",
                                }}
                            />
                            <Typography align="center" sx={{ paddingTop:2 }} variant="h6">
                                通知日の設定
                            </Typography>
                            <Typography align="center" sx={{ paddingTop:2 }}>
                                <p>設定日の13時に通知されます。<br/>急ぎの場合は手動で通知してください。</p>
                                <input type="date" onChange={ handleSlackDate }/>
                                <Typography sx={{color:'red'}}>{validationMessage.slackDate}</Typography>
                            </Typography>
                        </React.Fragment>
                    }
                    
                    <Typography align="center" sx={{ paddingTop:2 }} variant="h6">
                        公開日の設定
                    </Typography>
                    <Box sx={{textAlign: "center"}}>
                        <Typography color="error">本日以前のお知らせは表示されませんので<br/>ご注意ください</Typography>
                        <input type="date" onChange={ handleDate }/>
                        <Typography sx={{color:'red'}}>{validationMessage.date}</Typography>
                    </Box>
                    { validation_message }
                    
                    <Typography align="center" sx={{ paddingTop:2 }}>
                        <Button variant="contained" onClick={ submit }>保存</Button>
                    </Typography>
                    <Typography align="center" sx={{ paddingTop:2 }}>
                        <Button variant="outlined" onClick={ handleClose }>戻る</Button>
                    </Typography>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default Create;