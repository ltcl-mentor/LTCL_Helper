import React, { useState, useContext } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { LoginUser } from "../../../Route";
import { CloseModal, styleHeading } from '../modal';

// 各パーツのスタイル設定
const styleWordBreak = { wordBreak: "break-word" };
const styleContent = {
    width: "85%",
    m: "30px auto 0"
};
const styleTarget = {
    fontSize: "16px",
    color: "gray",
    mt: 2,
    wordBreak: "break-word"
};
const styleBody = {
    fontSize: "16px",
    color: "gray",
    mt: 2
};


/**
 * イベント詳細
 */
const showInfo = props => {
    const slack = props.info.slackDate !== null ? props.info.slackDate : "無";
    const is_admin = useContext(LoginUser).is_admin;
    const [body, setBody] = useState(props.info.body);
    
    let admin;
    if (is_admin == "staff") {
        admin = (
            <Typography align="right" variant="h6" sx={[styleBody, styleWordBreak]}>
                Slack 通知：{slack}
            </Typography>
        );
    }

    return (
        <React.Fragment>
            <CloseModal onClose={props.onClose} />
            <Typography align="center" component="div" sx={[styleHeading, styleWordBreak]}>
                {props.info.information}
            </Typography>

            <Box sx={styleContent}>
                <Typography align="left" sx={styleTarget}>
                    {props.info.targets}
                </Typography>
                <Typography align="left" variant="h6" sx={styleWordBreak}>
                    {body
                        .split("\n")
                        .map(t => (t !== "" ? <div>{t}</div> : <br />))}
                </Typography>

                {admin}
            </Box>
        </React.Fragment>
    );
};

export default showInfo;