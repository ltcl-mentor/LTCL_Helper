import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { CloseModal, styleWarningTitle, styleWarningBody } from '../modal';

const styleContent = {
    width: "80%",
    m: '0 auto'
};


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
            <CloseModal onClose={props.onClose} />
            
            <Box sx={styleContent}>
                <Typography align="center" sx={styleWarningTitle}>
                    WARNING！
                </Typography>
                <Typography align="center" sx={styleWarningBody}>
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