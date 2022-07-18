import React from "react";
import { ModalSubHeading } from "@/Styles/Shared/Modal/modal";
import { StyleTextField } from "@/Styles/Mentor/Home/Manage/Event/Modal/addEvent";

/**
 * slackテンプレート入力
 */
const template = ({ input, validate, handleChange }) => {
    return (
        <React.Fragment>
            <ModalSubHeading>Slack通知メッセージ</ModalSubHeading>
            <StyleTextField
                label="Slack通知テンプレート"
                error={validate.template.error}
                helperText={validate.template.message}
                minRows={7}
                maxRows={15}
                multiline
                value={input.template}
                onChange={(event) => handleChange(event)}
                name="template"
            />
        </React.Fragment>
    );
};

export default template;
