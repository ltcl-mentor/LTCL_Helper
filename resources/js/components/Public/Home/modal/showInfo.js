import React, { useState, useContext } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import IconButton from "@mui/material/IconButton";

import { LoginUser } from "../../../Route";

/**
 * イベント詳細
 */
const ShowInfo = props => {
    const slack = props.info.slackDate !== null ? props.info.slackDate : "無";
    const is_admin = useContext(LoginUser).is_admin;
    console.log(props.info.body);
    const [body, setBody] = useState(props.info.body);

    return (
        <React.Fragment>
            <IconButton
                onClick={() => props.onClose()}
                sx={{ color: "red", ml: "95%" }}
            >
                <HighlightOffIcon />
            </IconButton>
            <Typography
                align="center"
                component="div"
                sx={{ color: "#771AF8", fontSize: "24px", fontWeight: "bold" }}
            >
                {props.info.information}
            </Typography>

            <Box sx={{ width: "85%", m: "30px auto 0" }}>
                <Typography
                    align="left"
                    sx={{
                        fontSize: "16px",
                        color: "gray",
                        mt: 2,
                        wordBreak: "break-word"
                    }}
                >
                    {props.info.targets}
                </Typography>
                <Typography
                    align="left"
                    variant="h6"
                    sx={{ wordBreak: "break-word" }}
                >
                    {body
                        .split("\n")
                        .map(t => (t !== "" ? <div>{t}</div> : <br />))}
                </Typography>

                {is_admin == "staff" && (
                    <Typography
                        align="right"
                        variant="h6"
                        sx={{
                            fontSize: "16px",
                            wordBreak: "break-word",
                            color: "gray",
                            mt: 2
                        }}
                    >
                        Slack 通知：{slack}
                    </Typography>
                )}
            </Box>
        </React.Fragment>
    );
};

export default ShowInfo;
