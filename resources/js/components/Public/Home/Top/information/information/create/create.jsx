import React from "react";
import { useCreateInfo } from "@/Logics/Home/Top/Information/create";
import { store } from "@/Logics/Home/Top/Information/store";
import Typography from "@mui/material/Typography";
import SlackForm from "./slackForm";
import PublicForm from "./publicForm";
import { CloseModal, SubmitButton, styleHeading } from "../../../../modal";
import { StyleBox } from "@/Styles/Public/Home/Top/Information/create";

/**
 * お知らせの追加
 */
const create = ({ events, onClose }) => {
    const [{ eventInfo, checked, input, validation, setValidation }, { handleChange, sameMessage, handleInput, handleDate, handleTarget, handleEvent }] = useCreateInfo();
    const submit = store({ input, checked, setValidation });

    return (
        <React.Fragment>
            <CloseModal onClose={onClose} />
            <Typography align="center" component="div" sx={styleHeading}>
                お知らせの追加
            </Typography>

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
