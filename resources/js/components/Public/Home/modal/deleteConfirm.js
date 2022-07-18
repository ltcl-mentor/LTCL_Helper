import React from "react";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import {
    CloseModal,
    styleWarningTitle,
    styleWarningBody
} from "../modal";
import { Content } from "@/Styles/Shared/Modal/modal";

// モーダルのスタイル設定
const styleMargin = { mt: "20px" };

/**
 * 削除確認モーダル
 */
const deleteConfirm = props => {
    const width = { width: "80%" };

    return (
        <Modal
            open={props.open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Content>
                <CloseModal onClose={() => props.setOpen(false)} />
                <Typography align="center" sx={styleWarningTitle}>
                    WARNING！
                </Typography>
                <Typography align="center" sx={styleWarningBody}>
                    削除すると元に戻せません。
                    <br />
                    本当に削除しますか？
                </Typography>
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
