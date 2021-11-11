import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import Publish from './Publish/publish';
import Parameters from './parameters';
import Question from './question';
import Comment from './comment';
import Documents from '../../../Public/Question/Show/documents';

function Show() {
    const { id } = useParams();
    const [question, setQuestion] = useState([]);
    const [images, setImages] = useState([]);
    const [documents, setDocuments] = useState([]);
    const categories = ['カリキュラム', '成果物'];
    const topics = ['AWS', 'HTML', 'CSS', 'JavaScript', 'サーバー', 'PHP', 'Laravel', 'DB', 'Git&GitHub', 'マイグレーション', 'リレーション', 'Laravel拡張', '画像処理', 'Heroku環境', 'API', 'デザイン'];
    const csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;

    useEffect(() => {
        axios
            .get(`/react/question/${ id }`)
            .then(response => {
                setQuestion(response.data);
            }).catch(error => {
                console.log(error);
            });
            
        axios
            .get(`/react/images/${ id }`)
            .then(response => {
                setImages(response.data);
            }).catch(error => {
                console.log(error);
            });
            
        axios
            .get(`/react/related/documents/${ id }`)
            .then(response => {
                setDocuments(response.data);
            }).catch(error => {
                console.log(error);
            });
    }, []);
    
    const deleteConfirm = () => {
        if (confirm('データが削除されます。\nよろしいですか？')) {
            document.getElementById('delete').submit();
        } else {
            window.alert('キャンセルしました');
            return false;
        }
    };
    
    return (
        <div className="container">
            <div className="title">
                <h1>質問詳細</h1>
            </div>
    
            <Parameters 
                category={ categories[question.category] }
                topic={ topics[question.topic] }
                curriculum_number={ question.curriculum_number }
                user_id={ question.user_id }
                check={ question.check }
            />
            
            <div className="table_q_detail">
                <Question 
                    count={ images.filter(v=>v).length }
                    images={ images }
                    question={ question.question }
                />
                
                <Comment 
                    comment={ question.comment }
                />
            </div>
    
            <div>
                <div className="title">
                    <h1>関連記事</h1>
                    <a href={ `/links/question/` + question.id }>編集する</a>
                </div>
                <Documents 
                    documents={ documents }
                />
            </div>
        </div>
    );
}

export default Show;

if (document.getElementById('Question_mentor_show')) {
    ReactDOM.render(<Show />, document.getElementById('Question_mentor_show'));
}

