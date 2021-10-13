import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import Publish from './Publish/publish';
import Parameters from './parameters';
import Question from './question';
import Comment from './comment';
import Documents from '../../../Public/Question/Show/documents';

function Show() {
    const [question, setQuestion] = useState([]);
    const [images, setImages] = useState([]);
    const [documents, setDocuments] = useState([]);
    const categories = ['カリキュラム', '成果物'];
    const topics = ['AWS', 'HTML', 'CSS', 'JavaScript', 'サーバー', 'PHP', 'Laravel', 'DB', 'Git&GitHub', 'マイグレーション', 'リレーション', 'Laravel拡張', '画像処理', 'Heroku環境', 'API', 'デザイン'];
    const question_id = document.getElementById('Question_mentor_show').getAttribute('question_id');
    const csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;

    useEffect(() => {
        axios
            .get(`/react/question/${ question_id }`)
            .then(response => {
                setQuestion(response.data);
            }).catch(error => {
                console.log(error);
            });
            
        axios
            .get(`/react/images/${ question_id }`)
            .then(response => {
                setImages(response.data);
            }).catch(error => {
                console.log(error);
            });
            
        axios
            .get(`/react/related/documents/${ question_id }`)
            .then(response => {
                setDocuments(response.data);
            }).catch(error => {
                console.log(error);
            });
    }, []);
    
    const deleteConfirm = () => {
        "use strict"; 
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
                
                <Publish
                    question_id={ question_id }
                    csrf_token={ csrf_token }
                    question={ question }
                    images={ images }
                    documents={ documents }
                    category={ categories[question.category] }
                    topic={ topics[question.topic] }
                />
                
                <a href={ `/questions/` + question.id + `/edit` } className="editBtn">編集する</a>
                
                <form action={ `/questions/` + question.id + `/delete` } method="post" id="delete">
                    <input type="hidden" name="_token" value={ csrf_token }/>
                    <input type="submit" className="hidden"/>
                    <p className="deleteBtn" onClick={ deleteConfirm }>削除する</p>
                </form>
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

