import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import TopicForm from './topicForm';
import CrriculumNumber from './curriculum-number';
import QuestionForm from './questionForm';
import CommentForm from './commentForm';
import Picture from './picture';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

function Create() {
    const [category, setCategory] = useState(0);
    const [topic, setTopic] = useState(0);
    const [question, setQuestion] = useState('');
    const [question_validation_error, setQuestionValidationError] = useState(0);
    const [comment, setComment] = useState('');
    const [comment_validation_error, setCommentValidationError] = useState(0);
    
    var set = 0;
    
    const handleClick = () => {
        if(question.trim().length !== 0 && comment.trim().length !== 0){
            if(set==0){
                set=1;
                document.getElementById('create').submit();
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
    
    const handleCategory = (event) => {
        setCategory( Number(event.target.value) );
    };
    
    return (
        <div className="container">
            <div className="content">
                <h2 className="title">カテゴリーの選択</h2>
                <FormControl component="fieldset">
                    <RadioGroup row aria-label="category" name="category" value={ category } onChange={(event) => { handleCategory(event) }}>
                        <FormControlLabel value={0} control={<Radio />} label="カリキュラム" />
                        <FormControlLabel value={1} control={<Radio />} label="成果物" />
                    </RadioGroup>
                </FormControl>
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
