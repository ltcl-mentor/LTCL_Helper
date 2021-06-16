import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import TopicForm from './topicForm';
import CrriculumNumber from './curriculum-number';
import QuestionForm from './questionForm';
import CommentForm from './commentForm';

function Create() {
    const [category, setCategory] = useState(0);
    const [topic, setTopic] = useState(0);
    const [question, setQuestion] = useState('');
    const [question_validation_error, setQuestionValidationError] = useState(0);
    const [comment, setComment] = useState('');
    const [comment_validation_error, setCommentValidationError] = useState(0);
    
    const handleClick = () => {
        if(question.trim().length !== 0 && comment.trim().length !== 0){
            document.getElementById('create').submit();
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
                <label className="radios"><input type="radio" name="post[category]" value="0" onClick={() => { setCategory(0) }} checked={ category === 0 }/>カリキュラム</label>
                <label className="radios"><input type="radio" name="post[category]" value="1" onClick={() => { setCategory(1) }} checked={ category === 1 }/>成果物</label>
            </div>
                
            <TopicForm
                category={ category }
                setTopic={ setTopic }
            />
                
            <CrriculumNumber
                category={ category }
                topic={ topic }
            />
                
            <QuestionForm
                setQuestion={ setQuestion }
                question_validation_error={ question_validation_error }
            />
                
            <CommentForm
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

export default Create;

if (document.getElementById('Create')) {
    ReactDOM.render(<Create />, document.getElementById('Create'));
}
