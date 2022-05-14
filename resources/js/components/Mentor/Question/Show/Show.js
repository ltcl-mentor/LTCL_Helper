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
import BreakingPoint from "../../../BreakingPoint";
import useMedia from "use-media";
import ShowContentPc from "./responsive/showContentPc";
import ShowContentMobile from "./responsive/showContentMobile";

/**
 * 質問詳細(管理画面)のメインコンポーネント
 */
function Show() {
    const isWide = useMedia({ minWidth: `${BreakingPoint}px` });
    const [related_questions, setRelatedQuestions] = useState([]);
    const parameter = useLocation();
    const { id } = useParams();
    const history = useHistory();
    const [question, setQuestion] = useState([]);
    const [status, setStatus] = useState(0);
    const [documents, setDocuments] = useState([]);
    const [comment_changing, setCommentChanging] = useState(false);
    const [open, setOpen] = useState(false);
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
        if (
            typeof question.category != "undefined" &&
            typeof question.topic != "undefined"
        ) {
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
        history.push("/topic/" + question.topic);
    };

    const handleOpen = () => {
        setOpen(!open);
    };

    return (
        <>
            {isWide ? (
                // 大画面で表示するコンポーネント
                <ShowContentPc
                    location={parameter.location}
                    question={question}
                    id={id}
                    setQuestion={setQuestion}
                    documents={documents}
                    deleteConfirm={deleteConfirm}
                    status={status}
                    setStatus={setStatus}
                    setCommentChanging={setCommentChanging}
                    open={open}
                    handleOpen={handleOpen}
                    related_questions={related_questions}
                    backQuestionIndex={backQuestionIndex}
                />
            ) : (
                // スマホで表示するコンポーネント
                <ShowContentMobile
                    location={parameter.location}
                    question={question}
                    id={id}
                    setQuestion={setQuestion}
                    documents={documents}
                    deleteConfirm={deleteConfirm}
                    status={status}
                    setStatus={setStatus}
                    setCommentChanging={setCommentChanging}
                    open={open}
                    handleOpen={handleOpen}
                    related_questions={related_questions}
                    backQuestionIndex={backQuestionIndex}
                />
            )}
        </>
    );
}

export default Show;
