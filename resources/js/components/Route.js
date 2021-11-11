import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Link} from 'react-router-dom';

import Bar from './Layout/Bar';
import Home from './Public/Home/Home';
import PublicDocumentIndex from './Public/Document/Index/Index';
import PublicQuestionIndex from './Public/Question/Index/Index';
import PublicQuestionCreate from './Public/Question/Create/Create';
import PublicQuestionShow from './Public/Question/Show/Show';
import Condition from './Public/Search/Condition/Condition';
import Freeword from './Public/Search/Freeword/Freeword';
import MentorTop from './Mentor/Top';
import DocumentIndex from './Mentor/Document/Index/Index';
import DocumentShow from './Mentor/Document/Show/Show';
import DocumentCreate from './Mentor/Document/Create/Create';
import DocumentEdit from './Mentor/Document/Edit/Edit';
import QuestionIndex from './Mentor/Question/Index/Index';
import QuestionShow from './Mentor/Question/Show/Show';
import QuestionCreate from './Mentor/Question/Create/Create';
import QuestionEdit from './Mentor/Question/Edit/Edit';

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
                <Route path="/" exact component={ Home }/>
                <Route path="/documents/index/public" component={ PublicDocumentIndex }/>
                <Route path="/questions/index/public" component={ PublicQuestionIndex }/>
                <Route path="/questions/create/public" component={ PublicQuestionCreate }/>
                <Route path="/questions/:id/public" component={ PublicQuestionShow }/>
                <Route path="/search/condition" component={ Condition }/>
                <Route path="/search/freeword" component={ Freeword }/>
            </Switch>
        );
        
        if (user.is_admin === "staff") {
            admin_links = (
                <Switch>
                    <Route path="/mentor/top" component={ MentorTop }/>
                    <Route path="/documents/index" component={ DocumentIndex }/>
                    <Route path="/documents/create" component={ DocumentCreate }/>
                    <Route path="/documents/:id/edit" component={ DocumentEdit }/>
                    <Route path="/documents/:id" component={ DocumentShow }/>
                    <Route path="/questions/index" component={ QuestionIndex }/>
                    <Route path="/questions/create" component={ QuestionCreate }/>
                    <Route path="/questions/:id/edit" component={ QuestionEdit }/>
                    <Route path="/questions/:id" component={ QuestionShow }/>
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