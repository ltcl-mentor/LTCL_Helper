import React, {useState} from 'react';
import axios from "axios";
import {useHistory} from 'react-router-dom';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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
};

function Create(props) {
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [info, setInfo] = useState('');
    const [date, setDate] = useState('');
    const [infoValodationError, setInfoValidationError] = useState(false);
    const [dateValodationError, setDateValidationError] = useState(false);
    
    const handleOpen = () => setOpen(true);
    
    const handleClose = () => setOpen(false);
    
    const handleInfo = (event) => {
        setInfoValidationError(false);
        setInfo(event.target.value);
    };
    
    const handleDate = (event) => {
        setDateValidationError(false);
        setDate(event.target.value);
    };
    
    const submit = () => {
        if (info.trim().length !== 0 && date.length !== 0) {
            props.setInfoChanging(true);
            axios
                .post("/informations/store", {
                    info: info,
                    date: date,
                })
                .then(response => {
                    if (response.status === 200) {
                        setOpen(false);
                        setInfo('');
                        setDate('');
                        props.setInfoChanging(false);
                        history.push("/", { type: "info", status: "created" });
                    }
                }).catch(error => {
                    console.log(error);
                });
        }
        
        if (info.trim().length === 0) {
            setInfoValidationError(true);
        }
        
        if (date.length === 0) {
            setDateValidationError(true);
        }
    };
    
    let validation_message;
    if (infoValodationError || dateValodationError) {
        validation_message = (
            <Typography
                align="center"
                variant="h5"
                color="red"
                sx={{ paddingTop: 2 }}
            >
                未入力の項目があります！
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
                    <Typography align="center" sx={{ paddingTop:2 }} variant="h5">
                        お知らせの入力
                    </Typography>
                    
                    <Typography align="center" sx={{ paddingTop:1 }}>
                        文字数：{ info.trim().length }文字
                    </Typography>
                    
                    <TextareaAutosize
                        placeholder="お知らせを簡潔に(250文字以内で)入力"
                        minRows={3}
                        value={ info }
                        onChange={ (event) => handleInfo(event) }
                        style={{ 
                            width: "80%",
                            marginLeft: "10%",
                            paddingTop:2,
                        }}
                    />
                    
                    <Typography align="center" sx={{ paddingTop:2 }} variant="h5">
                        公開日の設定
                    </Typography>
                    
                    <Typography align="center" sx={{ paddingTop:2 }}>
                        <p>設定した日付以降に上記のお知らせを表示します</p>
                        <input type="date" onChange={ handleDate }/>
                    </Typography>
                    
                    { validation_message }
                    
                    <Typography align="center" sx={{ paddingTop:2 }}>
                        <Button variant="contained" onClick={ submit }>保存</Button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

export default Create;