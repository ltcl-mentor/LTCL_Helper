import React, { useState, useEffect, createContext } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Bar from './Layout/Bar';
import AccessError from './Error';
import MyPage from './Public/User/MyPage';
import AdminMyPage from './Public/User/AdminMypage';
import MyQuestion from './Public/User/QuestionShow';
import History from './Public/History/History';
import Home from './Public/Home/Home';
import PublicDocumentIndex from './Public/Document/Index/Index';
import PublicQuestionIndex from './Public/Question/Index/Index';
import PublicQuestionIndexIndex from './Public/Question/Index/Index/Index';
import PublicQuestionCreate from './Public/Question/Create/Create/Create';
import PublicQuestionShow from './Public/Question/Show/Show';
import Condition from './Public/Search/Condition/Condition';
import Freeword from './Public/Search/Freeword/Freeword';
// import Contact from './Public/Contact/Contact';
import MentorTop from './Mentor/Top';
import DocumentIndex from './Mentor/Document/Index/Index';
import DocumentShow from './Mentor/Document/Show/Show';
import DocumentCreate from './Mentor/Document/Create/Create';
import DocumentEdit from './Mentor/Document/Edit/Edit';
import QuestionIndex from './Mentor/Question/Index/Index/Index';
import QuestionMentorYetCommentIndex from './Mentor/Question/Index/yet-comment-index/FromMentor';
import QuestionStudentYetCommentIndex from './Mentor/Question/Index/yet-comment-index/FromStudent';
import QuestionShow from './Mentor/Question/Show/Show';
import QuestionEdit from './Mentor/Question/Edit/Edit';
import LinkFromQuestionIndex from './Mentor/Link/fromQuestion/Index/Index';
import LinkFromQuestionShow from './Mentor/Link/fromQuestion/Show/Show';
import LinkFromDocumentIndex from './Mentor/Link/fromDocument/Index/Index';
import LinkFromDocumentShow from './Mentor/Link/fromDocument/Show/Show';
import UserIndex from './Mentor/User/Index/Index';
import UserRegisterPublic from './Mentor/User/Register/Public/Public';
import UserRegisterAdmin from './Mentor/User/Register/Admin/Admin';
import EventIndex from './Mentor/Event/Index/Index';
import EventRegister from './Mentor/Event/Create/Create';
import MentorQuestions from './Public/Home/Q&A/questionsForMentor.js';

export const LoginUser = createContext();

function Router() {
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
                    { user.length !== 0 &&
                        <Route key="home" path="/" exact component={Home} />
                    }

                    {/* ユーザマイページ表示 */}
                    { user.length !== 0 &&
                        <Route path="/my_page" exact component={MyPage} />
                    }

                    {/* ユーザマイページ質問詳細表示 */}
                    { user.length !== 0 &&
                        <Route
                            path="/my_page/questions/:id"
                            exact
                            component={MyQuestion}
                        />
                    }

                    {/* 質問履歴画面表示 */}
                    { user.length !== 0 &&
                        <Route path="/history" exact component={History} />
                    }

                    {/* 公開中の参考記事一覧表示 */}
                    { user.length !== 0 &&
                        <Route path="/public/documents/index" exact component={ PublicDocumentIndex }/>
                    }

                    {/* 公開中の質問をカテゴリー毎に表示 */}
                    { user.length !== 0 &&
                        <Route path="/topic/:id" exact component={ PublicQuestionIndexIndex }/>
                    }

                    {/* 公開中の質問一覧表示 */}
                    { user.length !== 0 &&
                        <Route
                            path="/public/questions/index"
                            exact
                            component={PublicQuestionIndex}
                        />
                    }

                    {/* 受講生の質問投稿画面表示 */}
                    { user.length !== 0 &&
                        <Route
                            path="/public/questions/create"
                            exact
                            component={PublicQuestionCreate}
                        />
                    }

                    {/* 質問詳細画面表示 */}
                    { user.length !== 0 &&
                        <Route
                            path="/public/questions/:id"
                            exact
                            component={PublicQuestionShow}
                        />
                    }

                    {/* 絞り込み検索画面表示 */}
                    { user.length !== 0 &&
                        <Route path="/search/condition" exact component={Condition} />
                    }

                    {/* フリーワード検索画面表示 */}
                    { user.length !== 0 &&
                        <Route path="/search/freeword" exact component={Freeword} />
                    }

                    {/* お問い合わせ画面表示 */}
                    {/* user.length !== 0 &&
                        <Route path="/contact" exact component={Contact} />
                    */}
                    
                    {/*=======================================================================================*/}
                    {/*管理者ユーザがアクセスできるURL*/}

                    {/* 管理者ユーザマイページ表示 */}
                    { (user.length !== 0 && user.is_admin === "staff") &&
                        <Route path="/Admin_my_page" exact component={AdminMyPage} />
                    }
                    
                    {/* メンター管理画面表示 */}
                    { (user.length !== 0 && user.is_admin === "staff") &&
                        <Route path="/mentor/top" exact component={MentorTop} />
                    }

                    {/* 記事一覧画面表示示 */}
                    { (user.length !== 0 && user.is_admin === "staff") &&
                        <Route
                            path="/documents/index"
                            exact
                            component={DocumentIndex}
                        />
                    }

                    {/* 記事新規作成画面表示 */}
                    { (user.length !== 0 && user.is_admin === "staff") &&
                        <Route
                            path="/documents/create"
                            exact
                            component={DocumentCreate}
                        />
                    }

                    {/* 記事編集画面表示 */}
                    { (user.length !== 0 && user.is_admin === "staff") &&
                        <Route
                            path="/documents/:id/edit"
                            exact
                            component={DocumentEdit}
                        />
                    }

                    {/* 記事詳細画面表示 */}
                    { (user.length !== 0 && user.is_admin === "staff") &&
                        <Route
                            path="/documents/:id"
                            exact
                            component={DocumentShow}
                        />
                    }

                    {/* 質問一覧画面表示 */}
                    { (user.length !== 0 && user.is_admin === "staff") &&
                        <Route
                            path="/questions/index"
                            exact
                            component={QuestionIndex}
                        />
                    }

                    {/* 質問一覧画面表示 */}
                    { (user.length !== 0 && user.is_admin === "staff") &&
                        <Route
                            path="/questions/mentor"
                            exact
                            component={MentorQuestions}
                        />
                    }

                    {/* メンターコメント待ちの質問一覧画面表示 */}
                    { (user.length !== 0 && user.is_admin === "staff") &&
                        <Route
                            path="/questions/index/mentor_yet_comment"
                            exact
                            component={QuestionMentorYetCommentIndex}
                        />
                    }

                    {/* 受講生コメント待ちの質問一覧画面表示 */}
                    { (user.length !== 0 && user.is_admin === "staff") &&
                        <Route
                            path="/questions/index/student_yet_comment"
                            exact
                            component={QuestionStudentYetCommentIndex}
                        />
                    }

                    {/* 質問編集画面表示 */}
                    { (user.length !== 0 && user.is_admin === "staff") &&
                        <Route
                            path="/questions/:id/edit"
                            exact
                            component={QuestionEdit}
                        />
                    }

                    {/* 質問詳細画面表示 */}
                    { (user.length !== 0 && user.is_admin === "staff") &&
                        <Route
                            path="/questions/:id"
                            exact
                            component={QuestionShow}
                        />
                    }

                    {/* 紐付け（単体質問と複数記事）一覧画面表示 */}
                    { (user.length !== 0 && user.is_admin === "staff") &&
                        <Route
                            path="/links/question/index"
                            exact
                            component={LinkFromQuestionIndex}
                        />
                    }

                    {/* 紐付け（単体質問と複数記事）登録画面表示 */}
                    { (user.length !== 0 && user.is_admin === "staff") &&
                        <Route
                            path="/links/question/:id"
                            exact
                            component={LinkFromQuestionShow}
                        />
                    }

                    {/* 紐付け（単体記事と複数質問）一覧画面表示 */}
                    { (user.length !== 0 && user.is_admin === "staff") &&
                        <Route
                            path="/links/document/index"
                            exact
                            component={LinkFromDocumentIndex}
                        />
                    }

                    {/* 紐付け（単体記事と複数質問）登録画面表示 */}
                    { (user.length !== 0 && user.is_admin === "staff") &&
                        <Route
                            path="/links/document/:id"
                            exact
                            component={LinkFromDocumentShow}
                        />
                    }

                    {/* ユーザ一覧画面表示 */}
                    { (user.length !== 0 && user.is_admin === "staff") &&
                        <Route path="/users/index" exact component={UserIndex} />
                    }

                    {/* 受講生登録画面表示 */}
                    { (user.length !== 0 && user.is_admin === "staff") &&
                        <Route
                            path="/users/register/public"
                            exact
                            component={UserRegisterPublic}
                        />
                    }

                    {/* 管理者登録画面表示 */}
                    { (user.length !== 0 && user.is_admin === "staff") &&
                        <Route
                            path="/users/register/admin"
                            exact
                            component={UserRegisterAdmin}
                        />
                    }

                    {/* イベント一覧画面表示 */}
                    { (user.length !== 0 && user.is_admin === "staff") &&
                        <Route path="/events/index" exact component={EventIndex} />
                    }

                    {/* イベント登録画面表示 */}
                    { (user.length !== 0 && user.is_admin === "staff") &&
                        <Route
                            path="/events/register"
                            exact
                            component={EventRegister}
                        />
                    }

                    {/* イベント編集画面表示 */}
                    { (user.length !== 0 && user.is_admin === "staff") &&
                        <Route
                            path="/events/register/:id"
                            exact
                            component={EventRegister}
                        />
                    }
                    
                    {/*404アクセスエラー*/}
                    <Route path="/" component={AccessError}/>
                    
                </Switch>
            </LoginUser.Provider>
        </BrowserRouter>
    );
}

export default Router;

if (document.getElementById("Router")) {
    ReactDOM.render(<Router />, document.getElementById("Router"));
}
