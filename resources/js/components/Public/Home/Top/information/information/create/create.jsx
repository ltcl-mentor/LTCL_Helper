import React from "react";
import { useCreateInfo } from "@/Logics/Public/Home/Top/Information/create";
import { store } from "@/Logics/Public/Home/Top/Information/store";
import SlackForm from "./slackForm";
import PublicForm from "./publicForm";
import { StyleBox } from "@/Styles/Public/Home/Top/Information/create";
import { CloseButton, SubmitButton } from "@/Components/Shared/Modal/sharedPart";
import { ModalHeading } from "@/Styles/Shared/Modal/modal";

/**
 * お知らせの追加
 */
const create = ({ events, onClose }) => {
    const [{ eventInfo, checked, input, validation, setValidation }, { handleChange, sameMessage, handleInput, handleDate, handleTarget, handleEvent }] = useCreateInfo();
    const submit = store({ input, checked, setValidation });

    return (
        <React.Fragment>
            <CloseButton onClose={onClose} />
            <ModalHeading>お知らせの追加</ModalHeading>
            <StyleBox>
                <PublicForm
                    input={input}
                    validation={validation}
                    checked={checked}
                    handleInput={handleInput}
                    handleDate={handleDate}
                    handleChange={handleChange}
                    handleTarget={handleTarget}
                />

                {checked &&
                    <SlackForm
                        eventInfo={eventInfo}
                        events={events}
                        input={input}
                        validation={validation}
                        handleInput={handleInput}
                        handleEvent={handleEvent}
                        sameMessage={sameMessage}
                        handleDate={handleDate}
                    />
                }
                <SubmitButton text="登録する" handleSubmit={submit} />
            </StyleBox>
        </React.Fragment>
    );
};

export default create;
