import React from "react";
import SelectEvents from "./selectEvents";
import { AutoInputButton, StyleTextField, StyleResponsiveTextField, SubHeading, Template, ValidationMessage, StyleDiv, StyleFlex } from "@/Styles/Public/Home/Top/Information/create";

/**
 * お知らせ追加のslackフォーム
 */
const slackForm = ({ eventInfo, events, input, validation, handleInput, handleEvent, sameMessage, handleDate }) => {
    return (
        <React.Fragment>
            <SubHeading>Slack通知メッセージ</SubHeading>
            <StyleTextField
                label="slackへの通知メッセージを記載"
                multiline
                rows={4}
                error={validation.slackBody.error}
                helperText={validation.slackBody.message}
                value={input.slackBody}
                onChange={handleInput}
                name="slackBody"
            />
            <Template>以下からテンプレートを選択できます。</Template>
            <StyleFlex>
                <SelectEvents
                    event={eventInfo}
                    events={events}
                    handleEvent={handleEvent}
                />
                <StyleDiv>
                    <AutoInputButton onClick={sameMessage}>
                        お知らせ詳細と同じにする
                    </AutoInputButton>
                </StyleDiv>
            </StyleFlex>

            <SubHeading>通知日の設定</SubHeading>
            <ValidationMessage>
                設定日の13時に通知されます。急ぎの場合は手動で通知してください。
            </ValidationMessage>
            <StyleResponsiveTextField
                label="slack通知日"
                type="date"
                value={input.slackDate}
                onChange={handleDate}
                name="slackDate"
            />
        </React.Fragment>
    );
};

export default slackForm;
