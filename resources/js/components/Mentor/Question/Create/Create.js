import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import TopicForm from '../../../Public/Search/Search/Forms/topicForm';
import CurriculumNumber from '../../../Public/Search/Search/Forms/additionalForms/curriculum-number';
import QuestionForm from './questionForm';
import CommentForm from './commentForm';
import Picture from './picture';

import Category from '../../../Public/Search/Search/Forms/categoryForm';

function Create() {
    const [category, setCategory] = useState(0);
    const [topic, setTopic] = useState(0);
    const [curriculum_number, setCurriculumNumber] = useState('');
    const [curriculum_number_validation_error, setCurriculumNumberValidationError] = useState(0);
    const [question, setQuestion] = useState('');
    const [question_validation_error, setQuestionValidationError] = useState(0);
    const [comment, setComment] = useState('');
    const [comment_validation_error, setCommentValidationError] = useState(0);
    
    var set = 0;
    
    const handleClick = () => {
        if(!(curriculum_number)){
            setCurriculumNumberValidationError(1);
            return false;
        }
        
        if(question.trim().length !== 0 && comment.trim().length !== 0){
            if(set === 0){
                document.getElementById('create').submit();
                set=1;
            }else{
                return false;
            }
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
    
    let validation_message;
        if(curriculum_number_validation_error === 1){
            validation_message = (<p className="errorMassage">カリキュラム番号を選択してください。</p>);
        }else{
            validation_message = ('');
        }
    
    return (
        <div className="container">
            <div className="content">
                <h2 className="title">カテゴリーの選択</h2>
                <Category 
                    setCategory={ setCategory }
                />
                <input type="hidden" name="post[category]" value={ category } />
            </div>
            
            <div className="content">
                <h2 className="title">トピックの選択</h2>
                <TopicForm
                    category={ category }
                    setTopic={ setTopic }
                />
                <input type="hidden" name="post[topic]" value={ topic } />
            </div>
            
            <div className="content">
                <h2 className="title">該当カリキュラム番号の選択</h2>
                { validation_message }
                <CurriculumNumber
                    category={ category }
                    topic={ topic }
                    setCurriculumNumber={ setCurriculumNumber }
                />
                <input type="hidden" name="post[curriculum_number]" value={ curriculum_number } />
            </div>
                
            <QuestionForm
                setQuestion={ setQuestion }
                question_validation_error={ question_validation_error }
            />
                
            <CommentForm
                setComment={ setComment }
                comment_validation_error={ comment_validation_error }
            />
            
            <Picture/>
            
            <div className="submit">
                <p onClick={() => { handleClick() }} className="submit_btn">登録する</p>
            </div>
        </div>
    );
}

export default Create;

if (document.getElementById('Create')) {
    ReactDOM.render(<Create />, document.getElementById('Create'));
}
