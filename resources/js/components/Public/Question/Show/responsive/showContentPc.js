import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Alert from "../../../../Alert";
import Breadcrumbs from "../../../../Breadcrumbs";
import Question from "../question";
import Comments from "../comments/comments";
import Documents from "../documents";
import RelatedQuestions from "../related-questions";
import ShowBreadcrumbBox from "../../../../Atom/Box/ShowBreadcrumbBox";
import { styleReferenceArticle } from "../../../../Atom/Typography/TypographyStyle";

const showContentPc = props => {
    const topics = [
        // カリキュラム
        "AWS",
        "HTML",
        "CSS",
        "JavaScript",
        "サーバー",
        "PHP",
        "Laravel",
        "DB",
        "Git&GitHub",
        "マイグレーション",
        "リレーション",
        "認証・認可機能(カリキュラム)",
        "API(カリキュラム)",
        "その他(カリキュラム)",
        // 成果物
        "認証・認可機能(成果物)",
        "API(成果物)",
        "画像処理",
        "Heroku環境",
        "デザイン",
        "その他(成果物)"
    ];
    return (
        <Box>
            <Alert
                type="question"
                status={props.parameter.state && props.parameter.state.question}
                info={props.parameter.state && props.parameter.state.number}
            />

            <ShowBreadcrumbBox>
                <Breadcrumbs
                    page="public_question_show"
                    topic={props.question["topic"]}
                    topic_title={topics[props.question["topic"]]}
                />
            </ShowBreadcrumbBox>
            {props.question.length !== 0 &&
                !props.question.is_resolved &&
                (props.question.user_id === props.user.id ||
                    props.user.is_admin === "staff") && (
                    <Typography component="div" align="center">
                        <Button
                            variant="contained"
                            color="success"
                            onClick={props.handleResolved}
                        >
                            解決！！
                        </Button>
                    </Typography>
                )}

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
                    question_id={props.id}
                    setCommentChanging={props.setCommentChanging}
                    user_id={props.user.id}
                    is_admin={props.user.is_admin}
                />

                <Typography
                    variant="h6"
                    component="div"
                    sx={styleReferenceArticle}
                >
                    参考記事
                </Typography>
                <Documents documents={props.documents} />
            </Box>

            <RelatedQuestions related_questions={props.related_questions} />
            <Box sx={{ textAlign: "center" }}>
                <Button
                    variant="text"
                    onClick={props.handleBackQuestionShow}
                    sx={{
                        margin: "3%",
                        borderBottom: "1px solid #771af8",
                        color: "#771af8",
                        borderRadius: 0
                    }}
                >
                    {topics[props.question["topic"]]}質問一覧に戻る
                </Button>
            </Box>
        </Box>
    );
};

export default showContentPc;
