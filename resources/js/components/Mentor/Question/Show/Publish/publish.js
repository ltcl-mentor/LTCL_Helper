import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@mui/material/Button";
import PublicIcon from "@material-ui/icons/Public";
import PublicOffIcon from "@material-ui/icons/PublicOff";
import useMedia from "use-media";
import BreakingPoint from "../../../../../Styles/BreakingPoint";
import PublishContentPc from "./responsive/publishContentPc";
import PublishContentMobile from "./responsive/publishContentMobile";
import Box from "@mui/material/Box";

/**
 * 質問公開・非公開処理
 */
const Publish = props => {
    const isWide = useMedia({ minWidth: `${BreakingPoint}px` });
    const history = useHistory();
    const [open, setOpen] = useState(false);

    // モーダルの開閉
    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    // 質問非公開処理
    const unpublishConfirm = () => {
        if (confirm("質問が非公開になります。\nよろしいですか？")) {
            axios
                .post(`/questions/${props.question_id}/uncheck`)
                .then(response => {
                    if (response.status === 200) {
                        props.setQuestion(response.data);
                        history.push(`/questions/${props.question_id}`, {
                            question: "unpublished"
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            window.alert("キャンセルしました");
            return false;
        }
    };

    let publishBtn;
    if (props.question.check === 0 || props.question.check === false) {
        publishBtn = (
            <Typography onClick={handleOpen}>
                <Button
                    variant="contained"
                    color="success"
                    startIcon={<PublicIcon />}
                >
                    公開する
                </Button>
            </Typography>
        );
    } else {
        publishBtn = (
            <Typography onClick={unpublishConfirm}>
                <Button
                    variant="contained"
                    color="warning"
                    startIcon={<PublicOffIcon />}
                >
                    非公開にする
                </Button>
            </Typography>
        );
    }

    return (
        <>
            {isWide ? (
                <Box>
                    {publishBtn}

                    <PublishContentPc
                        open={open}
                        handleClose={handleClose}
                        question_id={props.question_id}
                        setQuestion={props.setQuestion}
                        question={props.question}
                        images={props.images}
                        documents={props.documents}
                        category={props.category}
                        topic={props.topic}
                    />
                </Box>
            ) : (
                <Box>
                    {publishBtn}

                    <PublishContentMobile
                        open={open}
                        handleClose={handleClose}
                        question_id={props.question_id}
                        setQuestion={props.setQuestion}
                        question={props.question}
                        images={props.images}
                        documents={props.documents}
                        category={props.category}
                        topic={props.topic}
                    />
                </Box>
            )}
        </>
    );
};

export default Publish;
