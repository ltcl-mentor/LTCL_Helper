import React from 'react';
import { useShowEvent } from '@/Logics/Mentor/Home/Manage/Event/Modal/showEvent/showEvent';
import { del } from '@/Logics/Mentor/Home/Manage/Event/Modal/showEvent/delete';
import { update } from '@/Logics/Mentor/Home/Manage/Event/Modal/showEvent/update';
import DeleteConfirm from '@/Components/Shared/Modal/deleteConfirm';
import Input from './input';
import SlackGrammar from '@/Components/Shared/Modal/slackGrammar';
import { CloseButton, SubmitButton } from '@/Components/Shared/Modal/sharedPart';
import { ModalHeading } from '@/Styles/Shared/Modal/modal';
import { Content } from '@/Styles/Mentor/Home/Manage/Event/Modal/showEvent';
import Head from './head';

/**
 * イベント詳細
 */
const showEvent = ({ onClose, event }) => {
    const [
        { link, input, validate, setValidate, state, open, deleteOpen, setDeleteOpen },
        { handleOpen, handleClose, handleDeleteOpen, handleChange, handleState }
    ] = useShowEvent({ event });
    const updated = update({ event, input, validate, setValidate });
    const deleted = del({ event });

    return (
        <React.Fragment>
            <DeleteConfirm open={deleteOpen} setOpen={setDeleteOpen} deleted={deleted} />
            <CloseButton onClose={onClose} />

            <ModalHeading>{event.name}</ModalHeading>
            <Content>
                <Head
                    event={event}
                    state={state}
                    handleState={handleState}
                    handleDeleteOpen={handleDeleteOpen}
                />
                <Input
                    state={state}
                    validate={validate}
                    input={input}
                    handleChange={handleChange}
                />
                {state === "edit" &&
                    <SlackGrammar
                        link={link}
                        open={open}
                        handleOpen={handleOpen}
                        handleClose={handleClose}
                    />
                }
            </Content>
            {state === "edit" &&
                <SubmitButton text="登録する" handleSubmit={updated} />
            }
        </React.Fragment>
    );
};

export default showEvent;
