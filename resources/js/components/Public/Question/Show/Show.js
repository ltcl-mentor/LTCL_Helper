import React, { useState, useEffect } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Alert from "../../../Alert";
import Breadcrumbs from "../../../Breadcrumbs";
import Parameters from "./parameters";
import Question from "./question";
import Comments from "./comments/comments";
import Documents from "./documents";
import RelatedQuestions from "./related-questions";

/**
 * 質問詳細画面(公開)のメインコンポーネント
 */
function Show() {
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

    // 画面幅を随時取得
    window.addEventListener("resize", function() {
        setScreenWidth(window.innerWidth);
    });

    // 画面描画時に実行
    useEffect(() => {
        // ユーザの質問詳細画面の閲覧を記録
        axios
            .post(`/questions/${id}/record`)
            .then(response => {
                console.log("記録したよ");
            })
            .catch(error => {
                console.log(error);
            });

        // 個別質問を取得
        axios
            .get(`/react/question/checked/${id}`)
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

    useEffect(() => {
        if (!comment_changing) {
            // 個別質問を取得
            axios
                .get(`/react/question/checked/${id}`)
                .then(response => {
                    setQuestion(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [comment_changing, question_changing]);

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
    // const handleBackQuestionShow = () => {
    //     history.push(`/topic/${question.topic}`);
    // };
    const handleBackQuestionShow = () => {
        history.push(`/topic/${question["topic"]}`);
    };

    return (
        <div>
            <Alert
                type="question"
                status={parameter.state && parameter.state.question}
                info={parameter.state && parameter.state.number}
            />

            <div style={{ marginLeft: "3%" }}>
                <Breadcrumbs
                    page="public_question_show"
                    topic={question["topic"]}
                    topic_title={topics[question["topic"]]}
                />
            </div>
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
                category={ question.category }
                topic={ question.topic }
                curriculum_number={ question.curriculum_number }
                is_resolved={ question.is_resolved }
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
            </Box>

            <RelatedQuestions related_questions={related_questions} />
            <Box style={{ textAlign: "center" }}>
                <Button
                    variant="text"
                    onClick={handleBackQuestionShow}
                    sx={{
                        margin: "3%",
                        borderBottom: "1px solid #771af8",
                        color: "#771af8",
                        borderRadius: 0
                    }}
                >
                    {topics[question["topic"]]}質問一覧に戻る
                </Button>
            </Box>
        </div>
    );
}

export default Show;
