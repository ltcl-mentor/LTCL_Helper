import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@mui/material/Button";
import CreateIcon from "@material-ui/icons/Create";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Comment from "./comment";

/*
 * コメント表示(管理画面)
 */
const PostButton = styled(Button)(({ theme }) => ({
    variant: "outlined",
    color: "#771af8",
    border: "2px solid #771af8",
    fontWeight: "bold",
    minWidth: 100,
    maxWidth: 150,
    marginBottom: 5,
    fontSize: 10,
    "&:hover": {
        backgroundColor: "#771AF8",
        color: "white"
    }
}));
function Comments(props) {
    const [expanded, setExpanded] = useState(false);

    // アコーディオンの開閉
    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <React.Fragment>
            {props.main_comments &&
                props.main_comments.map(comment => {
                    return (
                        <Card sx={{ marginBottom: 2 }}>
                            <Comment
                                comment={comment.comment}
                                target_student={comment.target_student}
                                created_at={comment.created_at}
                                is_staff={comment.is_staff}
                            />

                            {props.sub_comments[comment.id].length !== 0 ? (
                                <Accordion
                                    expanded={expanded === comment.id}
                                    onChange={handleChange(comment.id)}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <Typography>
                                            {
                                                props.sub_comments[comment.id]
                                                    .length
                                            }
                                            件の返信
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {props.sub_comments[comment.id].map(
                                            sub_comment => {
                                                return (
                                                    <React.Fragment>
                                                        <Comment
                                                            comment={
                                                                sub_comment.comment
                                                            }
                                                            target_student={
                                                                sub_comment.target_student
                                                            }
                                                            created_at={
                                                                sub_comment.created_at
                                                            }
                                                            is_staff={
                                                                sub_comment.is_staff
                                                            }
                                                        />
                                                    </React.Fragment>
                                                );
                                            }
                                        )}

                                        {/* <Box
                                            sx={{
                                                textAlign: "center",
                                                marginBottom: 2
                                            }}
                                        >
                                            <Button variant="text" color="info">
                                                コメントに返信
                                            </Button>
                                        </Box> */}
                                    </AccordionDetails>
                                </Accordion>
                            ) : // <Box
                            //     sx={{
                            //         textAlign: "center",
                            //         marginBottom: 2
                            //     }}
                            // >
                            //     <Button variant="text" color="info">
                            //         コメントに返信
                            //     </Button>
                            // </Box>
                            null}
                        </Card>
                    );
                })}

            <Box sx={{ textAlign: "center", marginBottom: 2 }}>
                <PostButton startIcon={<CreateIcon />}>
                    新規にコメントを追加
                </PostButton>
            </Box>
        </React.Fragment>
    );
}

export default Comments;
