import React, { useState, useEffect } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import BreakingPoint from "../../../../Styles/BreakingPoint";
import useMedia from "use-media";
import ShowContentPc from "./responsive/showContentPc";
import ShowContentMobile from "./responsive/showContentMobile";

/**
 * 質問詳細画面(公開)のメインコンポーネント
 */
function Show() {
    const isWide = useMedia({ minWidth: `${BreakingPoint}px` });
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

    const handleBackQuestionShow = () => {
        history.push(`/topic/${question["topic"]}`);
    };

    return (
        <>
            {isWide ? (
                // 大画面で表示するコンポーネント
                <ShowContentPc
                    parameter={parameter}
                    question={question}
                    user={user}
                    handleResolved={handleResolved}
                    id={id}
                    setCommentChanging={setCommentChanging}
                    documents={documents}
                    related_questions={related_questions}
                    handleBackQuestionShow={handleBackQuestionShow}
                />
            ) : (
                // スマホで表示するコンポーネント
                <ShowContentMobile
                    parameter={parameter}
                    question={question}
                    user={user}
                    handleResolved={handleResolved}
                    id={id}
                    setCommentChanging={setCommentChanging}
                    documents={documents}
                    related_questions={related_questions}
                    handleBackQuestionShow={handleBackQuestionShow}
                />
            )}
        </>
    );
}

export default Show;
