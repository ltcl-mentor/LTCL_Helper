import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useLocation, useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@mui/material/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Box from "@mui/material/Box";
import Alert from "../../../Alert";
import Breadcrumbs from "../../../Breadcrumbs";
import Publish from "./Publish/publish";
import Parameters from "./parameters";
import Question from "./question";
import Comments from "../../../Public/Question/Show/comments/comments";
import Documents from "../../../Public/Question/Show/documents";
import RelatedQuestions from "../../../Public/Question/Show/related-questions";
import SelectStatus from "../../../Atom/Select/SelectStatus";
import AddRelatedQuestion from "../../Link/modal/addRelatedQuestion";

/**
 * 質問詳細(管理画面)のメインコンポーネント
 */
function Show() {
    const [related_questions, setRelatedQuestions] = useState([]);
    const parameter = useLocation();
    const { id } = useParams();
    const history = useHistory();
    const [question, setQuestion] = useState([]);
    const [status, setStatus] = useState(0);
    const [documents, setDocuments] = useState([]);
    const [comment_changing, setCommentChanging] = useState(false);
    const [open, setOpen] = useState(true);
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
    // 画面描画時に実行
    useEffect(() => {
        // 該当質問データ取得
        axios
            .get(`/react/question/${id}`)
            .then(response => {
                setQuestion(response.data);
                setStatus(response.data["status"]);
            })
            .catch(error => {
                console.log(error);
            });

        // 関連記事取得
        axios
            .get(`/react/documents/related/${id}`)
            .then(response => {
                setDocuments(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    // コメント追加時の質問データ再取得
    useEffect(() => {
        if (!comment_changing) {
            // 個別質問を取得
            axios
                .get(`/react/question/${id}`)
                .then(response => {
                    setQuestion(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [comment_changing]);

    useEffect(() => {
        // ユーザの質問詳細画面の閲覧を記録
        axios
            .post(`/questions/${id}/record`)
            .then(response => {})
            .catch(error => {
                console.log(error);
            });
    }, []);

    // 削除実行
    const deleteConfirm = () => {
        if (confirm("データが削除されます。\nよろしいですか？")) {
            axios
                .post(`/questions/${id}/delete`)
                .then(response => {
                    if (response.status === 200) {
                        history.push("/questions/index", {
                            question: "deleted",
                            number: 1
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

    const backQuestionIndex = () => {
        history.push("/questions/index");
    };

    const handleOpen = () => {
        setOpen(!open);
    };

    return (
        <div>
            <Alert
                type="question"
                status={parameter.state && parameter.state.question}
                info={parameter.state && parameter.state.number}
            />
            <Alert
                type="comment"
                status={parameter.state && parameter.state.comment}
            />
            <div style={{ marginLeft: "3%" }}>
                <Breadcrumbs
                    page={`mentor_question_show`}
                    topic={question.topic}
                    topic_title={topics[question.topic]}
                />
            </div>

            <Box
                sx={{
                    display: "flex",
                    width: "90%",
                    margin: "4%",
                    justifyContent: "center",
                    position: "relative"
                }}
            >
                <Box sx={{ position: "absolute" }}>
                    <Publish
                        question_id={id}
                        question={question}
                        setQuestion={setQuestion}
                        documents={documents}
                        category={categories[question.category]}
                        topic={topics[question.topic]}
                    />
                </Box>
                <Box sx={{ position: "absolute", right: "-2%" }}>
                    <Link to={`/questions/` + id + `/edit`}>
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
                        onClick={deleteConfirm}
                    >
                        削除
                    </Button>
                </Box>
            </Box>

            {/* <Typography component="div" align="center" sx={{ marginTop: 1 }}>
                <Link to={`/questions/` + id + `/edit`}>
                    <Button
                        variant="contained"
                        color="info"
                        startIcon={<EditIcon />}
                    >
                        編集する
                    </Button>
                </Link>
            </Typography>
            <Typography
                component="div"
                align="center"
                sx={{ marginTop: 1, marginBottom: 2 }}
            >
                <Button
                    variant="contained"
                    color="error"
                    onClick={deleteConfirm}
                    startIcon={<DeleteIcon />}
                >
                    削除する
                </Button>
            </Typography> */}
            {/* <Parameters
                category={ categories[question.category] }
                topic={ topics[question.topic] }
                curriculum_number={ question.curriculum_number }
                author={ question.author }
                check={ question.check }
            />
             */}
            <Question
                title={question.title}
                remarks={question.remarks}
                updated_at={question.updated_at}
                question={question.question}
                category={question.category}
                topic={question.topic}
                curriculum_number={question.curriculum_number}
                id={id}
                status={status}
                setStatus={setStatus}
                responseStatus={question["status"]}
            />
            <Comments
                main_comments={question.main_comments}
                sub_comments={question.sub_comments}
                question_id={id}
                setCommentChanging={setCommentChanging}
                user_id={0}
                is_admin="staff"
            />
            <AddRelatedQuestion
                open={open}
                handleOpen={handleOpen}
                question_id={id}
            />

            <Box>
                <Typography
                    align="right"
                    sx={{
                        marginRight: "5%"
                    }}
                >
                    <Button
                        sx={{
                            color: "#771AF8",
                            textDecoration: "underline",
                            marginBottom: "-5%",
                            fontSize: 18,
                            fontWeight: "bold"
                        }}
                        onClick={handleOpen}
                    >
                        記事登録
                    </Button>
                    {/* <Link to={`/links/question/` + id}>
                        <Button
                            sx={{
                                color: "#771AF8",
                                textDecoration: "underline",
                                marginBottom: "-5%",
                                fontSize: 18,
                                fontWeight: "bold"
                            }}
                        >
                            記事登録
                        </Button>
                    </Link> */}
                </Typography>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        borderBottom: "1px solid gray",
                        fontWeight: "bold",
                        padding: 1,
                        marginX: "5%"
                    }}
                >
                    参考記事
                </Typography>
            </Box>
            <Box
                sx={{
                    marginTop: 3,
                    padding: 1
                }}
            >
                <Documents documents={documents} />
            </Box>
            <RelatedQuestions related_questions={related_questions} />
            <div
                style={{
                    textAlign: "center",
                    marginTop: "3%",
                    marginBottom: "5%"
                }}
            >
                <Button
                    variant="text"
                    onClick={backQuestionIndex}
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
            </div>
        </div>
    );
}

export default Show;
