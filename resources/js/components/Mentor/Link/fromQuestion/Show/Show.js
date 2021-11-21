import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import axios from "axios";
import {useParams} from 'react-router-dom';

import Alert from '../../../../Alert';
import Breadcrumbs from '../../../../Breadcrumbs';
import Parameters from './parameters';
import Links from './links';

function Index() {
    const { id } = useParams();
    const parameter = useLocation().search.substr(1).split('=');
    const [question, setQuestion] = useState([]);
    const [attach_id, setAttachId] = useState([]);
    const [detach_id, setDetachId] = useState([]);
    const csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
    const categories = ['カリキュラム', '成果物'];
    const topics = ['AWS', 'HTML', 'CSS', 'JavaScript', 'サーバー', 'PHP', 'Laravel', 'DB', 'Git&GitHub', 'マイグレーション', 'リレーション', 'Laravel拡張', '画像処理', 'Heroku環境', 'API', 'デザイン'];
    const [staffs, setStaffs] = useState([]);
    
    useEffect(() => {
        axios
            .get(`/react/question/${ id }`)
            .then(response => {
                setQuestion(response.data);
            }).catch(error => {
                console.log(error);
            });
            
        axios
            .get("/react/all/staffs")
            .then(response => {
                setStaffs(response.data);
            }).catch(error => {
                console.log(error);
            });
    }, []);
    
    let set = 0;
    const handleSubmit = () => {
        // フォーム送信と重複保存の防止
        if (set === 0) {
            document.getElementById('link').submit();
            set=1;
        } else {
            return false;
        }
    };
    
    return (
        <div class="container">
            <Alert type={ parameter[0] } status={ parameter[1] }/>
            
            <Breadcrumbs page="mentor_link_question_show"/>
            
            <Parameters
                category={ categories[question.category] }
                topic={ topics[question.topic] }
                curriculum_number={ question.curriculum_number }
                user_id={ question.user_id }
                check={ question.check }
                question={ question.question }
                comment={ question.comment }
                staffs={ staffs }
            />
            
            <Links
                id={ id }
                attach_id={ attach_id }
                setAttachId={ setAttachId }
                detach_id={ detach_id }
                setDetachId={ setDetachId }
                csrf_token={ csrf_token }
                handleSubmit={ handleSubmit }
                staffs={ staffs }
            />
        </div>
    );
}

export default Index;
