import React, { useState } from "react";
import { useInformation } from "@/Logics/Home/Top/Information/information";
import Content from './information/content';
import { Modals } from "../../modal";
import { AddInfoButton, Heading, StyleDiv } from "@/Styles/Public/Home/Top/Information/information";

/**
 * お知らせ
 */
const information = ({ isAdmin }) => {
    const [deleteInfo, setDeleteInfo] = useState('');
    const [{ open, type, events, dates, infos, setInfos, setDates }, { handleOpen, handleClose, handleDelete }] = useInformation({ deleteInfo });

    const information =
        <Content
            isAdmin={isAdmin}
            dates={dates}
            infos={infos}
            handleDelete={handleDelete}
            setDeleteInfo={setDeleteInfo}
        />;

    const addButton = isAdmin == "staff" &&
        <AddInfoButton onClick={() => handleOpen("create_info")}>
            お知らせを追加する
        </AddInfoButton>

    return (
        <StyleDiv>
            <Modals
                open={open}
                type={type}
                handleClose={handleClose}
                events={events}
                setInfos={setInfos}
                setDates={setDates}
            />

            <Heading>
                お知らせ
                {addButton}
            </Heading>
            {information}
        </StyleDiv>
    );
};

export default information;
