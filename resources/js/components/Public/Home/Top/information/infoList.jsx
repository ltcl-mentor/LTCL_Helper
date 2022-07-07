import React from "react";
import { Date, StyleList, StyleListItem, StyleUl, StyleDeleteIcon, StyleListItemText } from "@/Styles/Public/Home/Top/Information/content";

/**
 * お知らせ一覧
 */
const infoList = ({ isAdmin, dates, infos, setDeleteInfo, setDeleteOpen, isWide, setShowInfo, setShowOpen }) => {
    const infoLength = isWide ? 15 : 30;

    return (
        <StyleList isWide={isWide} subheader={<li />}>
            {dates.map(date => (
                <li key={date}>
                    <StyleUl>
                        <Date>{date}</Date>
                        {infos[date].map((info, index) => (
                            <StyleListItem key={`${date}-info-${index}`}>
                                <StyleListItemText
                                    color="primary"
                                    onClick={() => {setShowOpen(true), setShowInfo(info);}}
                                    primary={
                                        info.information.length > infoLength ?
                                            info.information.substring(0, infoLength) + "..." :
                                            info.information
                                    }
                                />
                                {isAdmin &&
                                    <StyleDeleteIcon onClick={() => {setDeleteOpen(true), setDeleteInfo(info.id);}} />
                                }
                            </StyleListItem>
                        ))}
                    </StyleUl>
                </li>
            ))}
        </StyleList>
    );
};

export default infoList;
