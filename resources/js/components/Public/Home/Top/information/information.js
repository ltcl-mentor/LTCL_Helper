import React, { useState, useEffect, useContext, useCallback } from "react";
import { useHistory } from 'react-router-dom';
import axios from "axios";

import Typography from "@material-ui/core/Typography";
import Button from "@mui/material/Button";

import { Modals } from "../../modal";
import ContentMobile from './contentMobile';
import ContentPC from './contentPC';
import { LoginUser } from "../../../../Route";

// 各パーツのスタイル設定
const style = {
    paddingTop: '16px',
    paddingBottom: '16px'
};
const heading = {
    color: "#771AF8",
    fontWeight: "bold",
    fontSize: 24,
    pl: '10%'
};
const addButtonStyle = {
    verticalAlign: "top",
    color: "#771AF8",
    "&:hover": {
        backgroundColor: "white",
        textDecoration: "underline"
    }
};


/**
 * お知らせ
 */
const information = props => {
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("user");
    const [dates, setDates] = useState([]);
    const [infos, setInfos] = useState([]);
    const [events, setEvents] = useState([]);
    const [deleteInfo, setDeleteInfo] = useState('');
    const [deleteOpen, setDeleteOpen] = useState(false);
    const user = useContext(LoginUser);

    // モーダル開閉
    const handleOpen = type => {
        setOpen(true);
        setType(type);
    };
    const handleClose = () => {
        setOpen(false);
        setType("user");
    };
    
    // 削除実行
    const handleDelete = useCallback(() =>{
        axios
            .post(`/informations/${ deleteInfo }/delete`)
            .then(response => {
                if (response.status === 200) {
                    setInfos(response.data.infos);
                    setDates(response.data.dates);
                    setDeleteOpen(false);
                    setType("user");
                    history.push("/?page=top", { type: "info", status: "deleted" });
                }
            }).catch(error => {
                console.log(error);
            });
    });

    useEffect(() => {
        axios
            .get(`/react/infos`)
            .then(response => {
                setInfos(response.data.infos.infos);
                setDates(response.data.infos.dates);
                setEvents(response.data.events);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    
    let information;
    if (props.isWide) {
        information = (
            <ContentPC 
                isAdmin={props.isAdmin} 
                dates={dates} 
                infos={infos} 
                handleDelete={handleDelete}
                setDeleteInfo={setDeleteInfo}
                deleteOpen={deleteOpen}
                setDeleteOpen={setDeleteOpen}
            />
        );
    } else {
        information = (
            <ContentMobile 
                isAdmin={props.isAdmin} 
                dates={dates} 
                infos={infos} 
                handleDelete={handleDelete}
                setDeleteInfo={setDeleteInfo}
                deleteOpen={deleteOpen}
                setDeleteOpen={setDeleteOpen}
            />
        );
    }
    
    let addButton;
    if (user.is_admin == "staff") {
        addButton = (
            <Button sx={addButtonStyle} onClick={() => handleOpen("create_info")}>
                お知らせを追加する
            </Button>    
        );
    }

    return (
        <div style={style}>
            <Modals
                open={open}
                type={type}
                handleClose={handleClose}
                events={events}
                setInfos={setInfos}
                setDates={setDates}
            />

            <Typography component="div" sx={heading}>
                お知らせ
                {addButton}
            </Typography>
            
            {information}
        </div>
    );
};

export default information;