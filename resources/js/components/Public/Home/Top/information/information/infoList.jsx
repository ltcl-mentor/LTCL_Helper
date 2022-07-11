import React from "react";
import useMedia from "use-media";
import { Date, StyleList, StyleListItem, StyleUl, StyleDeleteIcon, StyleListItemText } from "@/Styles/Public/Home/Top/Information/content";
import BreakingPoint from "@/Styles/BreakingPoint";

/**
 * お知らせ一覧
 */
const infoList = ({ isAdmin, dates, infos, selectDelete, showInformation }) => {
    const isWide = useMedia({ minWidth: `${BreakingPoint}px` });
    const infoLength = isWide ? 15 : 30;

    return (
        <StyleList subheader={<li />}>
            {dates.map(date => (
                <li key={date}>
                    <StyleUl>
                        <Date>{date}</Date>
                        {infos[date].map((info, index) => (
                            <StyleListItem key={`${date}-info-${index}`}>
                                <StyleListItemText
                                    color="primary"
                                    onClick={() => showInformation(info)}
                                    primary={
                                        info.information.length > infoLength ?
                                            info.information.substring(0, infoLength) + "..." :
                                            info.information
                                    }
                                />
                                {isAdmin &&
                                    <StyleDeleteIcon onClick={() => selectDelete(info.id)} />
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
