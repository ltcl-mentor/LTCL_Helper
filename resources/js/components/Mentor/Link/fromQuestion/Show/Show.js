import React, { useState, useEffect } from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";
import axios from "axios";

import Alert from "../../../../Alert";
import Breadcrumbs from "../../../../Breadcrumbs";
import Parameters from "./parameters";
import Links from "./links";

/**
 * 単体質問から関連記事への紐付け（詳細画面）のメインコンポーネント
 */
function Show() {
    const { id } = useParams();
    const parameter = useLocation();
    const history = useHistory();
    const [clickCount, setClickCount] = useState(0);
    const [question, setQuestion] = useState([]);
    const [attach_id, setAttachId] = useState([]);
    const [detach_id, setDetachId] = useState([]);
    const categories = ["カリキュラム", "成果物"];
    const topics = [
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
        "認証・認可機能",
        "API",
        "画像処理",
        "Heroku環境",
        "デザイン"
    ];
    const [staffs, setStaffs] = useState([]);

    // 画面描画時に実行
    useEffect(() => {
        // 該当質問取得
        axios
            .get(`/react/question/${id}`)
            .then(response => {
                setQuestion(response.data);
            })
            .catch(error => {
                console.log(error);
            });

        // 管理者一覧取得
        axios
            .get("/react/all/staffs")
            .then(response => {
                setStaffs(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    // 紐付けの保存
    const handleSubmit = () => {
        // フォーム送信と重複保存の防止
        if (clickCount === 0) {
            setClickCount(1);
            axios
                .post(`/links/question/${id}`, {
                    attach_id: attach_id,
                    detach_id: detach_id
                })
                .then(response => {
                    if (response.status === 200) {
                        // フォーム送信の重複保存防止のカウントをリセット
                        setClickCount(0);

                        window.scroll({ top: 0 });

                        console.log(response.data.whitch_do);
                        switch (response.data.whitch_do) {
                            case "attached":
                                history.push(
                                    `/links/question/${response.data.id}`,
                                    {
                                        link: "attached",
                                        number: response.data.attach_count
                                    }
                                );
                                break;

                            case "detached":
                                history.push(
                                    `/links/question/${response.data.id}`,
                                    {
                                        link: "detached",
                                        number: response.data.detach_count
                                    }
                                );
                                break;

                            case "attached_and_detached":
                                history.push(
                                    `/links/question/${response.data.id}`,
                                    {
                                        link: "attached_and_detached",
                                        number: [
                                            response.data.attach_count,
                                            response.data.detach_count
                                        ]
                                    }
                                );
                                break;
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            return false;
        }
    };

    return (
        <div className="container">
            <Alert
                type="link_from_question"
                status={parameter.state && parameter.state.link}
                info={parameter.state && parameter.state.number}
            />

            <Breadcrumbs page="mentor_link_question_show" />

            <Parameters
                category={categories[question.category]}
                topic={topics[question.topic]}
                curriculum_number={question.curriculum_number}
                author={question.author}
                check={question.check}
                question={question.question}
                comment={question.comment}
                staffs={staffs}
            />

            <Links
                id={id}
                setAttachId={setAttachId}
                setDetachId={setDetachId}
                handleSubmit={handleSubmit}
                staffs={staffs}
            />
        </div>
    );
}

export default Show;
