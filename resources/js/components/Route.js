import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Link} from 'react-router-dom';

import Home from './Public/Home/Home';
import Search from './Public/Search/Search';
import Create from './Mentor/Question/Create/Create';

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
                <Route path="/search" component={ Search }/>
            </Switch>
        );
        
        if (user.is_admin === "staff") {
            admin_links = (
                <Switch>
                    <Route path="/create" component={ Create }/>
                </Switch>
            );
        }
    }
    
    return (
        <BrowserRouter>
            { user_links }
            { admin_links }
        </BrowserRouter>
    );
}

export default Router;

if (document.getElementById('app')) {
    ReactDOM.render(<Router />, document.getElementById('app'));
}