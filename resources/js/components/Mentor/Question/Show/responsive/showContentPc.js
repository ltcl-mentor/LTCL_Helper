import React from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Breadcrumbs from "../../../../Breadcrumbs";
import Publish from "../Publish/publish";
import Comments from "../../../../Public/Question/Show/comments/comments";
import AddRelatedQuestion from "../../../Link/modal/addRelatedQuestion";
import Documents from "../../../../Public/Question/Show/documents";
import RelatedQuestions from "../../../../Public/Question/Show/related-questions";
import Question from "../question";
import ShowBreadcrumbBox from "../../../../Atom/Box/ShowBreadcrumbBox";
import {
    styleArticleRegistration,
    styleReferenceArticle
} from "../../../../Atom/Typography/TypographyStyle";
import {
    styleButtonGroupBox,
    stylePublishBox,
    styleDocumentsBox,
    styleReturnQuestionBox
} from "../../../../Atom/Box/BoxStyle";

const showContentPc = props => {
    const categories = ["カリキュラム", "成果物"];
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
            <ShowBreadcrumbBox>
                <Breadcrumbs
                    page={`mentor_question_show_${props.location}`}
                    topic={props.question.topic}
                    topic_title={topics[props.question.topic]}
                />
            </ShowBreadcrumbBox>

            <Box sx={styleButtonGroupBox}>
                <Box sx={stylePublishBox}>
                    <Publish
                        question_id={props.id}
                        question={props.question}
                        setQuestion={props.setQuestion}
                        documents={props.documents}
                        category={categories[props.question.category]}
                        topic={topics[props.question.topic]}
                    />
                </Box>
                <Box>
                    <Link to={`/questions/` + props.id + `/edit`}>
                        <Button
                            variant="text"
                            sx={{ color: "#771AF8", fontSize: 20 }}
                        >
                            編集
                        </Button>
                    </Link>
                    /
                    <Button
                        variant="text"
                        sx={{ color: "#771AF8", fontSize: 20 }}
                        onClick={props.deleteConfirm}
                    >
                        削除
                    </Button>
                </Box>
            </Box>

            <Question
                title={props.question.title}
                remarks={props.question.remarks}
                updated_at={props.question.updated_at}
                question={props.question.question}
                category={props.question.category}
                topic={props.question.topic}
                curriculum_number={props.question.curriculum_number}
                id={props.id}
                status={props.status}
                setStatus={props.setStatus}
                responseStatus={props.question["status"]}
            />
            <Comments
                main_comments={props.question.main_comments}
                sub_comments={props.question.sub_comments}
                question_id={props.id}
                setCommentChanging={props.setCommentChanging}
                user_id={0}
                is_admin="staff"
            />
            <AddRelatedQuestion
                open={props.open}
                handleOpen={props.handleOpen}
                question_id={props.id}
            />

            <Box>
                <Typography align="right" sx={styleArticleRegistration}>
                    <Button
                        sx={{
                            color: "#771AF8",
                            textDecoration: "underline",
                            marginBottom: "-5%",
                            fontSize: 18,
                            fontWeight: "bold"
                        }}
                        onClick={props.handleOpen}
                    >
                        記事登録
                    </Button>
                </Typography>
                <Typography
                    variant="h6"
                    component="div"
                    sx={styleReferenceArticle}
                >
                    参考記事
                </Typography>
            </Box>
            <Box sx={styleDocumentsBox}>
                <Documents documents={props.documents} />
            </Box>
            <RelatedQuestions related_questions={props.related_questions} />
            <Box sx={styleReturnQuestionBox}>
                <Button
                    variant="text"
                    onClick={props.backQuestionIndex}
                    sx={{
                        color: "#771AF8",
                        textDecoration: "underline",
                        marginBottom: "-5%",
                        fontSize: 18,
                        fontWeight: "bold"
                    }}
                >
                    質問一覧に戻る
                </Button>
            </Box>
        </Box>
    );
};

export default showContentPc;
