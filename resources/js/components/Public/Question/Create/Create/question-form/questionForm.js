import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@mui/material/Box";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import TextField from "@mui/material/TextField";
import TextForm from "./original-text-form/originalTextForm";
import {
    styleCategoryTitle,
    styleEditSubTitle
} from "../../../../../Atom/Typography/TypographyStyle";

/**
 * 質問タイトル、調べたこと、内容入力フォーム
 */
const styleSpan = {
    fontWeight: "normal",
    color: "#771AF8",
    marginLeft: "20px",
    fontSize: 18
};
function QuestionForm(props) {
    const handleTitle = event => {
        props.setTitle(event.target.value);
    };

    const handleRemarks = event => {
        props.setRemarks(event.target.value);
    };

    return (
        <React.Fragment>
            <Typography sx={styleEditSubTitle}>
                質問タイトル
                <span style={styleSpan}>50字以内で記入してください。</span>
            </Typography>
            {props.question_validation_error === 1 && (
                <Typography className="errorMassage">
                    入力は必須です。
                </Typography>
            )}

            <Box sx={{ width: "100%", marginBottom: 5 }}>
                <TextField
                    placeholder="例：CSSファイルが反映されません。"
                    label="質問タイトル（50字以内）"
                    error={props.question_validation_error.title}
                    helperText={
                        props.questionValidationMessage.titleErrorMessage
                    }
                    multiline
                    rows={2}
                    value={props.title}
                    onChange={event => handleTitle(event)}
                    style={{
                        width: "100%",
                        paddingTop: 2,
                        color: "black"
                    }}
                />
            </Box>
            <Typography sx={styleEditSubTitle}>
                調べたこと（参考にしたサイトURLなども記載）
            </Typography>
            <Box sx={{ width: "100%", marginBottom: 5 }}>
                <TextField
                    placeholder="例：以下のサイトでCSSの呼び出し方を確認しました。\nhttp://~"
                    label="調べたこと（参考にしたサイトURLなども記載）"
                    error={props.question_validation_error.search}
                    helperText={
                        props.questionValidationMessage.searchErrorMessage
                    }
                    multiline
                    rows={4}
                    value={props.remarks}
                    onChange={event => handleRemarks(event)}
                    style={{
                        width: "100%",
                        paddingTop: 2
                    }}
                />
            </Box>
            <Typography sx={styleCategoryTitle}>
                具体的な内容（試したことなど）
            </Typography>
            <TextForm
                text={props.question}
                setText={props.setQuestion}
                images={props.images}
                setImages={props.setImages}
                validationKey={props.question_validation_error.content}
                validationMessage={
                    props.questionValidationMessage.contentErrorMessage
                }
            />
        </React.Fragment>
    );
}

export default QuestionForm;
