import React from "react";
import { CloseButton } from "@/Components/Shared/Modal/sharedPart";
import { Black, Gray, StyleBox } from "@/Styles/Public/Home/Top/Information/information";
import { ModalHeading } from "@/Styles/Shared/Modal/modal";

/**
 * イベント詳細
 */
const showInfo = ({ onClose, info, isAdmin }) => {
    const slack = info.slackDate !== null ? info.slackDate : "無";
    const body = info.body;

    return (
        <React.Fragment>
            <CloseButton onClose={onClose} />
            <ModalHeading>{info.information}</ModalHeading>
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
