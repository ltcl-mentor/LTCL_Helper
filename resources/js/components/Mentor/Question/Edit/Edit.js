import React,{useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import TopicForm from './topicForm';
import CrriculumNumber from './curriculum-number';
import QuestionForm from './questionForm';
import CommentForm from './commentForm';

function Edit() {
    const [category, setCategory] = useState();
    const [old_category, setOldCategory] = useState();
    const [topic, setTopic] = useState();
    const [old_topic, setOldTopic] = useState();
    const [curriculum_number, setCurriculumNumber] = useState();
    const [question, setQuestion] = useState();
    const [old_question, setOldQuestion] = useState();
    const [question_validation_error, setQuestionValidationError] = useState(0);
    const [comment, setComment] = useState();
    const [old_comment, setOldComment] = useState();
    const [comment_validation_error, setCommentValidationError] = useState(0);
    const categories = ['カリキュラム', '成果物'];
    const topics = ['AWS', 'HTML', 'CSS', 'JavaScript', 'サーバー', 'PHP', 'Laravel', 'DB', 'Git&GitHub', '環境構築', '設計図', 'デプロイ', 'API'];
    

    
    useEffect(() => {
        componentDidMount();
    }, []);
    
    const componentDidMount = () => {
        const question_id = document.getElementById('edit').getAttribute('question_id');
        axios
            .get(`/react/question/${ question_id }`)
            .then(response => {
                setCategory(response.data.category);
                setOldCategory(response.data.category);
                setTopic(response.data.topic);
                setOldTopic(response.data.topic);
                setCurriculumNumber(response.data.curriculum_number);
                setOldQuestion(response.data.question);
                setOldComment(response.data.comment);
            }).catch(error => {
                console.log(error);
            });
    };
    
    const handleClick = () => {
        if(question.trim().length !== 0 && comment.trim().length !== 0){
            document.getElementById('edit').submit();
        }else if(question.trim().length === 0 && comment.trim().length !== 0){
            setQuestionValidationError(1);
            setCommentValidationError(0);
            return false;
        }else if(question.trim().length !== 0 && comment.trim().length === 0){
            setQuestionValidationError(0);
            setCommentValidationError(1);
            return false;
        }else{
            setQuestionValidationError(1);
            setCommentValidationError(1);
            return false;
        }
    };
    
    return (
        <div className="container">
            <div className="content">
                <h2 className="title">カテゴリーの選択</h2>
                <p>変更前：{ categories[ old_category ] }</p>
                <label className="radios"><input type="radio" name="post[category]" value="0" onClick={() => { setCategory(0) }} checked={ category === 0 }/>カリキュラム</label>
                <label className="radios"><input type="radio" name="post[category]" value="1" onClick={() => { setCategory(1) }} checked={ category === 1 }/>成果物</label>
            </div>
                
            <TopicForm
                category={ category }
                topic={ old_topic }
                setTopic={ setTopic }
                old_topic={ topics[ old_topic ] }
            />
                
            <CrriculumNumber
                category={ category }
                topic={ topic }
                curriculum_number={ curriculum_number }
            />
                
            <QuestionForm
                old_question={ old_question }
                setQuestion={ setQuestion }
                question_validation_error={ question_validation_error }
            />
                
            <CommentForm
                old_comment={ old_comment }
                setComment={ setComment }
                comment_validation_error={ comment_validation_error }
            />
            
            <div className="submit">
                <input type="hidden"/>
                <p onClick={() => { handleClick() }} className="submit_btn">登録する</p>
            </div>
        </div>
    );
}

export default Edit;

if (document.getElementById('Edit')) {
    ReactDOM.render(<Edit />, document.getElementById('Edit'));
}

