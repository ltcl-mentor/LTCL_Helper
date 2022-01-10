import React, {useState} from 'react';
import axios from "axios";
import {useHistory} from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@mui/material/Button';
import PublicIcon from '@material-ui/icons/Public';
import PublicOffIcon from '@material-ui/icons/PublicOff';
import Alert from '@mui/material/Alert';

import Preview from './preview';
import CheckForm from './checkForm';

// モーダルのCSS設定
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width:'70%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  height: '90%',
  overflow: 'scroll',
};

/**
 * 質問公開・非公開処理
 */
function Publish(props) {
    const history = useHistory();
    const [open, setOpen] = useState(false);
    
    // モーダルの開閉
    const handleOpen = () => setOpen(true);
    
    const handleClose = () => setOpen(false);
    
    // 質問非公開処理
    const unpublishConfirm = () => {
        if (confirm('質問が非公開になります。\nよろしいですか？')) {
            axios
                .post(`/questions/${ props.question_id }/uncheck`)
                .then(response => {
                    if (response.status === 200) {
                        props.setQuestion(response.data);
                        history.push(`/questions/${ props.question_id }`, { question: "unpublished" });
                    }
                }).catch(error => {
                    console.log(error);
                });
        } else {
            window.alert('キャンセルしました');
            return false;
        }
    };
    
    let publishBtn;
    if (props.question.check === 0 || props.question.check === false) {
        publishBtn = (
            <Typography align="center" onClick={ handleOpen }>
                <Button variant="contained" color="success" startIcon={ <PublicIcon /> }>公開する</Button>
            </Typography>
        );
    } else {
        publishBtn = (
            <Typography onClick={ unpublishConfirm }>
                <Button variant="contained" color="warning" startIcon={ <PublicOffIcon /> }>非公開にする</Button>
            </Typography>
        );
    }
    
    return (
        <div>
            { publishBtn }
    
            <Modal
                open={ open }
                onClose={ handleClose }
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={ style }>
                    <button onClick={ handleClose }>×</button>
                    <Alert severity="error">これは公開時のプレビューです。まだ公開処理は完了していません。</Alert>
                
                    <CheckForm 
                        question_id={ props.question_id }
                        setQuestion={ props.setQuestion }
                        handleClose={ handleClose }
                    />
                    
                    <Box sx={{ border: "1px solid black" }}>
                        <Preview
                            question={ props.question }
                            images={ props.images }
                            documents={ props.documents }
                            category={ props.category }
                            topic={ props.topic }
                        />
                    </Box>
                </Box>
                
            </Modal>
        </div>
    );
}

export default Publish;