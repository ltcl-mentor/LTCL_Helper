import React from "react";
import { Modals } from "../../modal";
import { Heading, StyleDiv } from "@/Styles/Public/Home/Top/Information/information";
import { useInformation } from "@/Logics/Home/Top/Information/information";

/**
 * お知らせ
 */
const information = ({ isAdmin, isWide }) => {
    const [{ information, addButton, open, type, events, setInfos, setDates }, handleClose] = useInformation({ isAdmin, isWide });

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
