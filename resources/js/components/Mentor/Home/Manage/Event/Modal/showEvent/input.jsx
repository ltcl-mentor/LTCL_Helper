import React from 'react';
import { StyleTextField } from '@/Styles/Mentor/Home/Manage/Event/Modal/showEvent';

/**
 * イベント入力部分
 */
const input = ({ state, validate, input, handleChange }) => {
    return (
        <React.Fragment>
            {state === "edit" &&
                <StyleTextField
                    error={validate.name.error}
                    label="イベント名"
                    name="name"
                    fullWidth
                    value={input.name}
                    onChange={(event) => handleChange(event)}
                    helperText={validate.name.message}
                />
            }
            <StyleTextField
                label="Slack通知テンプレート"
                error={validate.template.error}
                helperText={validate.template.message}
                minRows={7}
                maxRows={15}
                multiline
                fullWidth
                name="template"
                value={input.template}
                onChange={(event) => handleChange(event)}
                InputProps={{ readOnly: validate.readOnly }}
            />
        </React.Fragment>
    );
};

export default input;
