import React, { useState, useEffect, createContext } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Bar from "../delete/Common/Bar";
import AccessError from "../delete/Error";
import MyPage from "./Public/User/MyPage";
import AdminMyPage from "./Public/User/AdminMypage";
import MyQuestion from "./Public/User/QuestionShow";
import History from "./Public/History/History";
import Home from "./Public/Home/Home";
import PublicQuestionIndexIndex from "./Public/Question/Index/Index/Index";
import PublicQuestionCreate from "./Public/Question/Create/Create/Create";
import PublicQuestionShow from "./Public/Question/Show/Show";
import QuestionShow from "./Mentor/Question/Show/Show";
import QuestionEdit from "./Mentor/Question/Edit/Edit";
import MentorQuestions from "./Public/Home/Q&A/questionsForMentor.js";

export const LoginUser = createContext();

const Router = () => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        // ログインユーザー情報取得
        axios
            .get("/react/user")
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <BrowserRouter>
            <LoginUser.Provider value={user}>
                {/*アプリケーションバー*/}
                <Bar />

                {/*ルーティング*/}
                <Switch>
                    {/*一般ユーザがアクセスできるURL*/}
                    {/* トップ画面表示 */}
                    {user.length !== 0 && (
                        <Route key="home" path="/" exact component={Home} />
                    )}
                    {/* ユーザマイページ表示 */}
                    {user.length !== 0 && (
                        <Route path="/my_page" exact component={MyPage} />
                    )}
                    {/* ユーザマイページ質問詳細表示 */}
                    {user.length !== 0 && (
                        <Route
                            path="/my_page/questions/:id"
                            exact
                            component={MyQuestion}
                        />
                    )}
                    {/* 質問履歴画面表示 */}
                    {user.length !== 0 && (
                        <Route path="/history" exact component={History} />
                    )}
                    {/* 公開中の質問をカテゴリー毎に表示 */}
                    {user.length !== 0 && (
                        <Route
                            path="/topic/:id"
                            exact
                            component={PublicQuestionIndexIndex}
                        />
                    )}
                    {/* 受講生の質問投稿画面表示 */}
                    {user.length !== 0 && (
                        <Route
                            path="/public/questions/create"
                            exact
                            component={PublicQuestionCreate}
                        />
                    )}
                    {/* 質問詳細画面表示 */}
                    {user.length !== 0 && (
                        <Route
                            path="/public/questions/:id"
                            exact
                            component={PublicQuestionShow}
                        />
                    )}

                    {/*=======================================================================================*/}
                    {/*管理者ユーザがアクセスできるURL*/}
                    {/* 管理者ユーザマイページ表示 */}
                    {user.length !== 0 && user.is_admin === "staff" && (
                        <Route
                            path="/Admin_my_page"
                            exact
                            component={AdminMyPage}
                        />
                    )}
                    {/* 質問一覧画面表示 */}
                    {user.length !== 0 && user.is_admin === "staff" && (
                        <Route
                            path="/questions/mentor"
                            exact
                            component={MentorQuestions}
                        />
                    )}
                    {/* 質問編集画面表示 */}
                    {user.length !== 0 && user.is_admin === "staff" && (
                        <Route
                            path="/questions/:id/edit"
                            exact
                            component={QuestionEdit}
                        />
                    )}
                    {/* 質問詳細画面表示 */}
                    {user.length !== 0 && user.is_admin === "staff" && (
                        <Route
                            path="/questions/:id"
                            exact
                            component={QuestionShow}
                        />
                    )}
                    {/*404アクセスエラー*/}
                    <Route path="/" component={AccessError} />
                </Switch>
            </LoginUser.Provider>
        </BrowserRouter>
    );
};

export default Router;

if (document.getElementById("Router")) {
    ReactDOM.render(<Router />, document.getElementById("Router"));
}
