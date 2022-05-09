import React, { useState, useCallback } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Box from "@mui/material/Box";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";

import { CloseModal, SubmitButton, styleHeading, style } from "../modal";

// 各パーツのスタイル設定
const styleMargin = { mt: 2 };
const styleContent = {
    width: "90%",
    m: "0 auto"
};
const styleConfirmText = {
    fontSize: "20px",
    mt: "10px"
};

/**
 * お問い合わせ
 */
const contact = props => {
    const history = useHistory();
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const [contact, setContact] = useState("");
    const [category, setCategory] = useState("");
    const [contact_validation_error, setContactValidationError] = useState(
        false
    );
    const [
        contact_category_validation_error,
        setContactCategoryValidationError
    ] = useState(false);
    const [validationMessage, setValidationMessage] = useState("");
    const [categoryValidationMessage, setCategoryValidationMessage] = useState(
        ""
    );
    const categoryList = ["バグ修正依頼", "就活相談", "その他"];

    // 送信確認
    const confirm = status => {
        if (status) {
            if (contact.trim().length !== 0 && category !== "") {
                setConfirmOpen(true);
            } else {
                //本文のバリデーション
                if (contact.trim().length === 0) {
                    setContactValidationError(true);
                    setValidationMessage("お問合せ内容を入力してください");
                }

                //カテゴリーのバリデーション
                if (category.trim().length === 0) {
                    setContactCategoryValidationError(true);
                    setCategoryValidationMessage(
                        "お問合せ項目を選択してください"
                    );
                }
            }
        } else {
            setConfirmOpen(false);
        }
    };

    // お問い合わせ送信
    const handleSubmit = useCallback(() => {
        if (clickCount === 0) {
            setClickCount(1);

            axios
                .post("/contact", {
                    message: category + contact
                })
                .then(response => {
                    if (response.status === 200) {
                        setClickCount(0);
                        setConfirmOpen(false);
                        props.onClose();
                        history.push("/", {
                            type: "contact",
                            status: "created"
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                    setClickCount(0);
                });
        } else {
            return false;
        }
    });

    // お問い合わせ入力
    const handleContact = event => {
        if (event.target.value.length === 0) {
            setContactValidationError(true);
            setValidationMessage("お問合せ内容を入力してください");
        } else {
            setContactValidationError(false);
            setValidationMessage("");
        }
        setContact(event.target.value);
    };

    // お問合せカテゴリーの変更
    const handleCategory = event => {
        if (event.target.value.length === 0) {
            setContactCategoryValidationError(true);
            setCategoryValidationMessage("お問合せ項目を選択してください");
        } else {
            setContactCategoryValidationError(false);
            setCategoryValidationMessage("");
        }
        setCategory("カテゴリー：" + event.target.value + "\n");
    };

    let styleCategory;
    let styleTextField;
    let width;
    if (props.isWide) {
        styleCategory = { width: "30%", ml: "10%" };
        styleTextField = { width: "80%", pt: 2 };
        width = { width: "65%" };
    } else {
        styleCategory = { width: "100%" };
        styleTextField = { width: "100%", pt: 2 };
        width = { width: "90%" };
    }

    return (
        <React.Fragment>
            <CloseModal onClose={props.onClose} />
            <Typography align="center" component="div" sx={styleHeading}>
                お問い合せ
            </Typography>
            <Box sx={styleContent}>
                <Box sx={styleMargin}>
                    <TextField
                        label="お問合せ項目"
                        select
                        id="contact-category-select"
                        error={contact_category_validation_error}
                        helperText={categoryValidationMessage}
                        onChange={event => handleCategory(event)}
                        sx={styleCategory}
                    >
                        {categoryList.map((val, index) => (
                            <MenuItem value={val} key={index}>
                                {val}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>

                <Box textAlign="center" sx={styleMargin}>
                    <TextField
                        name="message"
                        label="お問合せ内容"
                        error={contact_validation_error}
                        helperText={validationMessage}
                        multiline
                        rows={8}
                        value={contact}
                        onChange={event => handleContact(event)}
                        style={styleTextField}
                    />
                </Box>
                <SubmitButton
                    text="送信する"
                    handleSubmit={() => confirm(true)}
                />
            </Box>

            {/* 確認モーダル */}
            <Modal
                open={confirmOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style, ...width }}>
                    <CloseModal onClose={() => confirm(false)} />
                    <Typography align="center" sx={styleConfirmText}>
                        お問い合わせを送信します。
                        <br />
                        よろしいですか？
                    </Typography>
                    <SubmitButton text="送信する" handleSubmit={handleSubmit} />
                </Box>
            </Modal>
        </React.Fragment>
    );
};

export default contact;
