import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CancelIcon from "@mui/icons-material/Cancel";
import Preview from "../preview";
import CheckForm from "../checkForm";

const styleForPc = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    height: "90%",
    overflow: "scroll"
};

const publishContentPc = props => {
    return (
        <>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleForPc}>
                    <Button
                        onClick={props.handleClose}
                        startIcon={<CancelIcon />}
                        sx={{
                            color: "red",
                            marginLeft: "95%",
                            marginBottom: "5%"
                        }}
                    ></Button>
                    <Alert severity="error">
                        これは公開時のプレビューです。まだ公開処理は完了していません。
                    </Alert>

                    <CheckForm
                        question_id={props.question_id}
                        setQuestion={props.setQuestion}
                        handleClose={props.handleClose}
                    />

                    <Box sx={{ border: "1px solid black" }}>
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
