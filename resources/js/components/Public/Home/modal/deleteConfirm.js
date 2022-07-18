import React from "react";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { Content } from "@/Styles/Shared/Modal/modal";
import { CloseButton } from "@/Components/Shared/Modal/sharedPart";
import { WarningBody, WarningTitle } from "@/Styles/Shared/Modal/deleteConfirm";

// モーダルのスタイル設定
const styleMargin = { mt: "20px" };

/**
 * 削除確認モーダル
 */
const deleteConfirm = props => {
    const width = { width: "80%" };

    return (
        <Modal open={props.open}>
            <Content>
                <CloseButton onClose={() => props.setOpen(false)} />
                <WarningTitle>WARNING！</WarningTitle>
                <WarningBody>
                    削除すると元に戻せません。
                    <br />
                    本当に削除しますか？
                </WarningBody>
                <Typography align="center" sx={styleMargin}>
                    <Button
                        size="large"
                        color="error"
                        variant="contained"
                        onClick={() => props.delete()}
                    >
                        削除
                    </Button>
                </Typography>
            </Content>
        </Modal>
    );
};

export default deleteConfirm;
