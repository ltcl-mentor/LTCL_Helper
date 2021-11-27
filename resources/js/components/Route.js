import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Bar from './Layout/Bar';
import History from './Public/History/History';
import Home from './Public/Home/Home';
import PublicDocumentIndex from './Public/Document/Index/Index';
import PublicQuestionIndex from './Public/Question/Index/Index';
import PublicQuestionCreate from './Public/Question/Create/Create';
import PublicQuestionShow from './Public/Question/Show/Show';
import Condition from './Public/Search/Condition/Condition';
import Freeword from './Public/Search/Freeword/Freeword';
import Contact from './Public/Contact/Contact';
import MentorTop from './Mentor/Top';
import DocumentIndex from './Mentor/Document/Index/Index';
import DocumentShow from './Mentor/Document/Show/Show';
import DocumentCreate from './Mentor/Document/Create/Create';
import DocumentEdit from './Mentor/Document/Edit/Edit';
import QuestionIndex from './Mentor/Question/Index/Index';
import QuestionShow from './Mentor/Question/Show/Show';
import QuestionCreate from './Mentor/Question/Create/Create';
import QuestionEdit from './Mentor/Question/Edit/Edit';
import LinkFromQuestionIndex from './Mentor/Link/fromQuestion/Index/Index';
import LinkFromQuestionShow from './Mentor/Link/fromQuestion/Show/Show';
import LinkFromDocumentIndex from './Mentor/Link/fromDocument/Index/Index';
import LinkFromDocumentShow from './Mentor/Link/fromDocument/Show/Show';
import UserIndex from './Mentor/User/Index/Index';
import UserRegisterPublic from './Mentor/User/Register/Public/Public';
import UserRegisterAdmin from './Mentor/User/Register/Admin/Admin';

function Router() {
    const [user, setUser] = useState([]);
    
    useEffect(() => {
        axios
            .get('/react/user')
            .then(response => {
                setUser(response.data);
            }).catch(error => {
                console.log(error);
            });
    }, []);
    
    let user_links;
    let admin_links;
    if (user.length !== 0) {
        user_links = (
            <Switch>
                {/* トップ画面表示 */}
                <Route key="home" path="/" exact component={ Home }/>
                
                {/* 質問履歴画面表示 */}
                <Route path="/history" component={ History }/>
                
                {/* 公開中の参考記事一覧表示 */}
                <Route path="/public/documents/index" component={ PublicDocumentIndex }/>
                
                {/* 公開中の質問一覧表示 */}
                <Route path="/public/questions/index" component={ PublicQuestionIndex }/>
                
                {/* 受講生の質問投稿画面表示 */}
                <Route path="/public/questions/create" component={ PublicQuestionCreate }/>
                
                {/* 質問詳細画面表示 */}
                <Route path="/public/questions/:id" component={ PublicQuestionShow }/>
                
                {/* 絞り込み検索画面表示 */}
                <Route path="/search/condition" component={ Condition }/>
                
                {/* フリーワード検索画面表示 */}
                <Route path="/search/freeword" component={ Freeword }/>
                
                {/* お問い合わせ画面表示 */}
                <Route path="/contact" component={ Contact }/>
            </Switch>
        );
        
        if (user.is_admin === "staff") {
            admin_links = (
                <Switch>
                    {/* メンター管理画面表示 */}
                    <Route path="/mentor/top" component={ MentorTop }/>
                    
                    {/* 記事一覧画面表示示 */}
                    <Route path="/documents/index" component={ DocumentIndex }/>
                    
                    {/* 記事新規作成画面表示 */}
                    <Route path="/documents/create" component={ DocumentCreate }/>
                    
                    {/* 記事編集画面表示 */}
                    <Route path="/documents/:id/edit" component={ DocumentEdit }/>
                    
                    {/* 記事詳細画面表示 */}
                    <Route path="/documents/:id" component={ DocumentShow }/>
                    
                    {/* 質問一覧画面表示 */}
                    <Route path="/questions/index" component={ QuestionIndex }/>
                    
                    {/* 質問新規作成画面表示 */}
                    <Route path="/questions/create" component={ QuestionCreate }/>
                    
                    {/* 質問編集画面表示 */}
                    <Route path="/questions/:id/edit" component={ QuestionEdit }/>
                    
                    {/* 質問詳細画面表示 */}
                    <Route path="/questions/:id" component={ QuestionShow }/>
                    
                    {/* 紐付け（単体質問と複数記事）一覧画面表示 */}
                    <Route path="/links/question/index" component={ LinkFromQuestionIndex }/>
                    
                    {/* 紐付け（単体質問と複数記事）登録画面表示 */}
                    <Route path="/links/question/:id" component={ LinkFromQuestionShow }/>
                    
                    {/* 紐付け（単体記事と複数質問）一覧画面表示 */}
                    <Route path="/links/document/index" component={ LinkFromDocumentIndex }/>
                    
                    {/* 紐付け（単体記事と複数質問）登録画面表示 */}
                    <Route path="/links/document/:id" component={ LinkFromDocumentShow }/>
                    
                    {/* ユーザ一覧画面表示 */}
                    <Route path="/users/index" component={ UserIndex }/>
                    
                    {/* 受講生登録画面表示 */}
                    <Route path="/users/register/public" component={ UserRegisterPublic }/>
                    
                    {/* 管理者登録画面表示 */}
                    <Route path="/users/register/admin" component={ UserRegisterAdmin }/>
                </Switch>
            );
        }
    }
    
    return (
        <BrowserRouter>
            <Bar/>
            { user_links }
            { admin_links }
        </BrowserRouter>
    );
}

export default Router;

if (document.getElementById('Router')) {
    ReactDOM.render(<Router />, document.getElementById('Router'));
}