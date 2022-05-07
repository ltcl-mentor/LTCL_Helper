import React from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import IconButton from '@mui/material/IconButton';

// モーダルのスタイル設定
const styleMargin = { mt: '20px' };
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const styleIconButton = {
    color: 'red',
    ml: '95%',
};
const styleWarningTitle = {
    color: "red",
    fontSize: '30px',
    fontWeight: 'bold'
};
const styleWarningBody = { 
    color: "red", 
    fontSize: '20px', 
    fontWeight: 'bold', 
    mt: '10px'
};


/**
 * 削除確認モーダル
 */
const deleteConfirm = (props) => {
    return (
        <Modal
            open={props.open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <IconButton onClick={() => props.setOpen(false)} sx={styleIconButton}>
                    <HighlightOffIcon />
                </IconButton>
                <Typography align="center" sx={styleWarningTitle}>
                    WARNING！
                </Typography>
                <Typography align="center" sx={styleWarningBody}>
                    削除すると元に戻せません。<br/>本当に削除しますか？
                </Typography>
                <Typography align="center" sx={styleMargin}>
                    <Button size="large" color="error" variant="contained" onClick={() => props.delete()}>削除</Button>
                </Typography>
            </Box>
        </Modal>
    );
};

export default deleteConfirm;