import React from "react";
import useMedia from "use-media";
import { useAddEvent } from "@/Logics/Mentor/Home/Manage/Event/addEvent";
import SlackGrammar from "@/Components/Shared/Modal/slackGrammar";
import ContentPC from './responsive/contentPC';
import ContentMobile from './responsive/contentMobile';
import Template from "./template";
import { CloseButton, SubmitButton } from "@/Components/Shared/Modal/sharedPart";
import { ModalHeading } from "@/Styles/Shared/Modal/modal";
import { Content } from "@/Styles/Mentor/Home/Manage/Event/addEvent";
import BreakingPoint from "@/Styles/BreakingPoint";

/**
 * イベント追加
 */
const addEvent = ({ onClose }) => {
    const isWide = useMedia({ minWidth: `${BreakingPoint}px` });
    const [{ open, link, validate, input }, { handleOpen, handleClose, handleChange, store }] = useAddEvent();

    const eventName = isWide ?
        <ContentPC
            value={input.name}
            validate={validate}
            onChange={handleChange}
        />
    :
        <ContentMobile
            value={input.name}
            validate={validate}
            onChange={handleChange}
        />

    return (
        <React.Fragment>
            <CloseButton onClose={onClose} />
            <ModalHeading>イベントの追加</ModalHeading>
            <Content>
                {eventName}
                <Template
                    input={input}
                    validate={validate}
                    handleChange={handleChange}
                />
                <SlackGrammar
                    link={link}
                    open={open}
                    handleOpen={handleOpen}
                    handleClose={handleClose}
                />
            </Content>
            <SubmitButton text="登録する" handleSubmit={store} />
        </React.Fragment>
    );
};

export default addEvent;
