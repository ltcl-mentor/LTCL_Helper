import React, { useState, useEffect } from "react";
import axios from "axios";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Box from "@mui/material/Box";
import Documents from "../../../../Public/Question/Show/documents";
import RelatedQuestions from "../../../../Public/Question/Show/related-questions";
import Question from "../question";
import Comments from "../../../../Public/Question/Show/comments/comments";
import { styleReferenceArticle } from "../../../../Atom/Typography/TypographyStyle";

/**
 * 質問詳細(公開)のプレビュー
 */
function Preview(props) {
    const [related_questions, setRelatedQuestions] = useState([]);

    // 画面描画時に取得
    useEffect(() => {
        // カテゴリー、トピックが同じ質問を取得
        axios
            .get(
                `/react/questions/search?category=${props.question.category}&topic=${props.question.topic}`
            )
            .then(response => {
                setRelatedQuestions(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <Box>
            <Breadcrumbs
                aria-label="breadcrumb"
                sx={{ marginLeft: "3%", marginY: 4 }}
            >
                <Typography color="text.primary">HOME</Typography>

                <Typography color="text.primary">質問一覧</Typography>

                <Typography color="text.primary">質問詳細</Typography>
            </Breadcrumbs>

            <Box>
                <Question
                    title={props.question.title}
                    remarks={props.question.remarks}
                    updated_at={props.question.updated_at}
                    question={props.question.question}
                    category={props.question.category}
                    topic={props.question.topic}
                    curriculum_number={props.question.curriculum_number}
                />

                <Comments
                    main_comments={props.question.main_comments}
                    sub_comments={props.question.sub_comments}
                />

                <Typography
                    variant="h6"
                    component="div"
                    sx={styleReferenceArticle}
                >
                    参考記事
                </Typography>
                <Box
                    sx={{
                        padding: 1
                    }}
                >
                    <Documents documents={props.documents} />
                </Box>
            </Box>

            <RelatedQuestions related_questions={related_questions} />
        </Box>
    );
}

export default Preview;
