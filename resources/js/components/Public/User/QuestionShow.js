import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import Alert from "../../Alert";
import Breadcrumbs from "../../Breadcrumbs";
import Parameters from "../Question/Show/parameters";
import Question from "../Question/Show/question";
import Comments from "../Question/Show/comments/comments";
import Documents from "../Question/Show/documents";
import RelatedQuestions from "../Question/Show/related-questions";

/**
 * 質問詳細画面(マイページ)のメインコンポーネント
 */
function QuestionShow() {
    const history = useHistory();
    const { id } = useParams();
    const [screen_width, setScreenWidth] = useState(window.innerWidth);
    const parameter = useLocation();
    const [question, setQuestion] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [related_questions, setRelatedQuestions] = useState([]);
    const [user, setUser] = useState([]);
    const [comment_changing, setCommentChanging] = useState(false);
    const [question_changing, setQuestionChanging] = useState(false);

    // 画面幅を随時取得
    window.addEventListener("resize", function() {
        setScreenWidth(window.innerWidth);
    });
    console.log(question);

    // 画面描画時に実行
    useEffect(() => {
        // 個別質問を取得
        axios
            .get(`/react/question/mypage/${id}`)
            .then(response => {
                setQuestion(response.data);
            })
            .catch(error => {
                console.log(error);
            });

        // 質問に関連する全参考記事を取得
        axios
            .get(`/react/documents/related/${id}`)
            .then(response => {
                setDocuments(response.data);
            })
            .catch(error => {
                console.log(error);
            });

        // ログインユーザ情報を取得
        axios
            .get("/react/user")
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    // useEffect(() => {
    //     if (!(comment_changing)) {
    //         // 個別質問を取得
    //         axios
    //             .get(`/react/question/checked/${ id }`)
    //             .then(response => {
    //                 setQuestion(response.data);
    //             }).catch(error => {
    //                 console.log(error);
    //             });
    //     }
    // }, [comment_changing, question_changing]);

    useEffect(() => {
        if (question) {
            // この質問と同じカテゴリー、トピックの質問を取得
            axios
                .get(
                    `/react/questions/search?category=${question.category}&topic=${question.topic}`
                )
                .then(response => {
                    setRelatedQuestions(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [question]);

    const handleResolved = () => {
        if (
            confirm(
                "一度解決扱いにすると今後変更できません。\nよろしいですか？"
            )
        ) {
            setQuestionChanging(true);

            axios
                .post(`/questions/${id}/resolved`)
                .then(response => {
                    if (response.status === 200) {
                        setQuestionChanging(false);
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
    const handleBackQuestionShow = () => {
        history.push("/public/questions/index");
    };

    return (
        <div>
            <Alert
                type="question"
                status={parameter.state && parameter.state.question}
                info={parameter.state && parameter.state.number}
            />
            <div style={{ marginLeft: "3%" }}>
                <Breadcrumbs page="my_page_question" />
            </div>
            <Typography
                variant="h5"
                component="div"
                sx={{
                    marginTop: 4,
                    marginBottom: 5,
                    marginLeft: "3%",
                    fontSize: 30,
                    color: "#771af8",
                    fontWeight: "bold"
                }}
            >
                質問投稿画面
            </Typography>
            {question.check == 0 && (
                <Typography
                    component="div"
                    align="center"
                    color="error"
                    sx={{ marginTop: 4, marginBottom: 3 }}
                >
                    この質問は現在非公開中です
                </Typography>
            )}

            {question.length !== 0 &&
                !question.is_resolved &&
                (question.user_id === user.id || user.is_admin === "staff") && (
                    <Typography
                        component="div"
                        align="center"
                        sx={{ marginTop: 4, marginBottom: 3 }}
                    >
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleResolved}
                        >
                            解決！！
                        </Button>
                    </Typography>
                )}

            {/* <Parameters
                category={question.category}
                topic={question.topic}
                curriculum_number={question.curriculum_number}
                is_resolved={question.is_resolved}
            /> */}

            <Box>
                <Question
                    title={question.title}
                    remarks={question.remarks}
                    updated_at={question.updated_at}
                    question={question.question}
                    category={question.category}
                    topic={question.topic}
                    curriculum_number={question.curriculum_number}
                />

                {question.check == 1 && (
                    <React.Fragment>
                        <Comments
                            main_comments={question.main_comments}
                            sub_comments={question.sub_comments}
                            question_id={id}
                            setCommentChanging={setCommentChanging}
                            user_id={user.id}
                            is_admin={user.is_admin}
                        />

                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                marginTop: 3,
                                padding: 1,
                                borderBottom: "1px solid gray",
                                fontWeight: "bold",
                                marginX: "5%"
                            }}
                        >
                            参考記事
                        </Typography>

                        <Documents documents={documents} />
                    </React.Fragment>
                )}
            </Box>

            <RelatedQuestions related_questions={related_questions} />

            <Box style={{ textAlign: "center" }}>
                <Button
                    variant="text"
                    onClick={handleBackQuestionShow}
                    sx={{
                        margin: "3%",
                        borderBottom: "1px solid #771af8",
                        color: "#771af8"
                    }}
                >
                    質問一覧に戻る
                </Button>
            </Box>
        </div>
    );
}

export default QuestionShow;
