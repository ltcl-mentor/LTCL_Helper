import React from "react";
import Typography from "@mui/material/Typography";
import { CloseModal, styleHeading } from "../../../modal";
import { Black, Gray, StyleBox } from "@/Styles/Public/Home/Top/Information/information";

// 各パーツのスタイル設定
const styleWordBreak = { wordBreak: "break-word" };

/**
 * イベント詳細
 */
const showInfo = ({ onClose, info, isAdmin }) => {
    const slack = info.slackDate !== null ? info.slackDate : "無";
    const body = info.body;

    return (
        <React.Fragment>
            <CloseModal onClose={onClose} />
            <Typography
                align="center"
                component="div"
                sx={{ ...styleHeading, ...styleWordBreak }}
            >
                {info.information}
            </Typography>

            <StyleBox>
                <Gray align="left" break={true}>{info.targets}</Gray>
                <Black align="left" break={true}>
                    {typeof body === "string" &&
                        body
                            .split("\n")
                            .map((t, index) =>
                                t !== "" ? (
                                    <div key={`${index}-${t}`}>{t}</div>
                                ) : (
                                    <br key={`${index}-${t}`} />
                                )
                            )}
                </Black>
                {isAdmin == "staff" && <Gray align="right">Slack 通知：{slack}</Gray>}
            </StyleBox>
        </React.Fragment>
    );
};

export default showInfo;
