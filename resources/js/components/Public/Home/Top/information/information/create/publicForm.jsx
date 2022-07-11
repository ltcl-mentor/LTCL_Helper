import React from "react";
import Checkbox from "@mui/material/Checkbox";
import SelectTarget from "./selectTarget";
import { ReleaseDate, StyleTextField, StyleResponsiveTextField, StyleFormControlLabel, SubHeading, ValidationMessage, WordCount, Warning } from "@/Styles/Public/Home/Top/Information/create";

/**
 * お知らせ追加の共通フォーム
 */
const publicForm = ({ input, validation, checked, handleInput, handleDate, handleChange, handleTarget }) => {
    return (
        <React.Fragment>
            <SubHeading>タイトル</SubHeading>
            <StyleTextField
                label="タイトル"
                placeholder="250文字以内"
                multiline
                error={validation.title.error}
                helperText={validation.title.message}
                value={input.title}
                onChange={handleInput}
                name="title"
            />
            <WordCount>{input.title.trim().length}文字</WordCount>

            <SubHeading>お知らせ詳細</SubHeading>
            <StyleTextField
                label="お知らせ詳細"
                multiline
                rows={4}
                error={validation.body.error}
                helperText={validation.body.message}
                value={input.body}
                onChange={handleInput}
                name="body"
            />

            <SubHeading>対象者</SubHeading>
            <SelectTarget
                input={input}
                validation={validation}
                handleTarget={handleTarget}
            />
            <ValidationMessage>
                {validation.target.message}
            </ValidationMessage>

            <ReleaseDate>
                <SubHeading>公開日</SubHeading>
                <Warning>本日以前を選択したお知らせは表示されません。</Warning>
            </ReleaseDate>
            <StyleResponsiveTextField
                label="公開日"
                type="date"
                value={input.date}
                onChange={handleDate}
                name="date"
            />

            <StyleFormControlLabel
                control={<Checkbox checked={checked} onChange={handleChange} />}
                label="slackに通知する"
            />
        </React.Fragment>
    );
};

export default publicForm;
