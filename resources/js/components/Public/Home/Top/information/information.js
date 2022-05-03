import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import Typography from "@material-ui/core/Typography";
import Button from "@mui/material/Button";

import Modals from "../../modal";
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
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("user");
    const [dates, setDates] = useState([]);
    const [infos, setInfos] = useState([]);
    const [events, setEvents] = useState([]);
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
        information = <ContentPC isAdmin={props.isAdmin} dates={dates} setDates={setDates} infos={infos} setInfos={setInfos} />;
    } else {
        information = <ContentMobile isAdmin={props.isAdmin} dates={dates} setDates={setDates} infos={infos} setInfos={setInfos} />;
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