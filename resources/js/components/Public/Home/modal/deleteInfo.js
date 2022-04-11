import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';


/**
 * イベント削除
 */
const DeleteInfo = (props) => {
    const history = useHistory();
    
    // 削除実行
    const handleDelete = () =>{
        axios
            .post(`/informations/${ props.info }/delete`)
            .then(response => {
                if (response.status === 200) {
                    props.setInfos(response.data.infos);
                    props.setDates(response.data.dates);
                    props.onClose();
                    history.push("/?page=top", { type: "info", status: "deleted" });
                }
            }).catch(error => {
                console.log(error);
            });
    };
    
    return (
        <React.Fragment>
            <IconButton onClick={() => props.onClose()} sx={{ color: 'red', ml: '95%' }}>
                <HighlightOffIcon />
            </IconButton>
            
            <Box sx={{ width: "80%", m: '0 auto' }}>
                <Typography align="center" sx={{ color: "red", fontSize: '30px', fontWeight: 'bold' }}>
                    WARNING！
                </Typography>
                <Typography align="center" sx={{ color: "red", fontSize: '20px', fontWeight: 'bold', mt: '10px' }}>
                    削除すると元に戻せません。本当に削除しますか？
                </Typography>
                <Typography align="center" sx={{ mt: '20px' }}>
                    <Button size="large" color="error" variant="contained" onClick={ handleDelete }>削除</Button>
                </Typography>
            </Box>
        </React.Fragment>
    );
};

export default DeleteInfo;