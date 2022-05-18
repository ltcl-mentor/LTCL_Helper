import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CancelIcon from "@mui/icons-material/Cancel";
import Preview from "../preview";
import CheckForm from "../checkForm";
import {
    stylePcPreviewModalBox,
    stylePreviewOutlineBox
} from "../../../../../Atom/Box/BoxStyle";
import { styleCloseModalButton } from "../../../../../Atom/Button/ButtonStyle";

const publishContentPc = props => {
    return (
        <>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={stylePcPreviewModalBox}>
                    <Button
                        onClick={props.handleClose}
                        startIcon={<CancelIcon />}
                        sx={styleCloseModalButton}
                    ></Button>
                    <Alert severity="error">
                        これは公開時のプレビューです。まだ公開処理は完了していません。
                    </Alert>

                    <CheckForm
                        question_id={props.question_id}
                        setQuestion={props.setQuestion}
                        handleClose={props.handleClose}
                    />

                    <Box sx={stylePreviewOutlineBox}>
                        <Preview
                            question={props.question}
                            images={props.images}
                            documents={props.documents}
                            category={props.category}
                            topic={props.topic}
                        />
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default publishContentPc;
