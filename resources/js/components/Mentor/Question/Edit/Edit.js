import React,{useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import Category from './categoryForm';
import TopicForm from './topicForm';
import CurriculumNumber from './Curriculum-number/curriculum-number';
import QuestionForm from '../Create/questionForm';
import CommentForm from '../Create/commentForm';
import Picture from './picture';

function Edit() {
    const [oldData, setOldData] = useState([]);
    const [category, setCategory] = useState(0);
    const [topic, setTopic] = useState(0);
    const [curriculum_number, setCurriculumNumber] = useState();
    const [curriculum_number_validation_error, setCurriculumNumberValidationError] = useState(0);
    const curriculum_numbers_array = [
        [
            ["1-1-1"],
            ["2-1-1"],
            ["2-1-2"],
            ["2-1-3"],
            ["3-1-1"],
            ["4-1-1", "4-1-2", "4-1-3", "4-1-4"],
            ["5-1-1", "8-1-1", "8-2-1", "8-3-1", "8-4-1", "8-5-1", "8-6-1"],
            ["6-1-1", "6-2-1"],
            ["7-1-1"]
        ],
        [
            ["成果物"],
        ]
    ];
    const [curriculum_numbers, setCurriculumNumbers] = useState(["1-1-1"]);
    const [question, setQuestion] = useState();
    const [question_validation_error, setQuestionValidationError] = useState(0);
    const [comment, setComment] = useState();
    const [comment_validation_error, setCommentValidationError] = useState(0);
    const question_id = document.getElementById('Question_mentor_edit').getAttribute('question_id');
    
    useEffect(() => {
        axios
            .get(`/react/question/${ question_id }`)
            .then(response => {
                setOldData(response.data);
                setCategory(response.data.category);
                setTopic(response.data.topic);
                setCurriculumNumber(response.data.curriculum_number);
                setQuestion(response.data.question);
                setComment(response.data.comment);
            }).catch(error => {
                console.log(error);
            });
    }, []);
    
    useEffect(() => {
        if(category === 0 && topic <= 8) {
            setCurriculumNumbers(curriculum_numbers_array[Number(category)][Number(topic)]);
        }else if(category === 1 && topic >= 9) {
            setCurriculumNumbers(curriculum_numbers_array[Number(category)][0]);
        }else {
            setCurriculumNumbers(curriculum_numbers_array[0][0]);
        }
    }, [category, topic]);
    
    
    // 保存処理の重複を防止するためにクリック回数を記録する変数set
    let set = 0;
    const handleClick = () => {
        // カリキュラム番号のバリデーション
        if(!(curriculum_number)){
            setCurriculumNumberValidationError(1);
            return false;
        }
        
        if(!(curriculum_numbers[Number(category)][Number(topic)].includes(curriculum_number))) {
            setCurriculumNumberValidationError(1);
            return false;
        }
            
        
        // 質問とコメントのバリデーション
        if(question.trim().length !== 0 && comment.trim().length !== 0){
            if(set==0){
                set=1;
                document.getElementById('update').submit();
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
    
    return (
        <div className="container">
            <Category
                category={ category }
                old_category={ oldData.category }
                setCategory={ setCategory }
            />
            
            <TopicForm
                category={ category }
                topic={ topic }
                setTopic={ setTopic }
                old_topic={ oldData.topic }
            />
            
            <CurriculumNumber
                old_curriculum_number={ oldData.curriculum_number }
                setCurriculumNumber={ setCurriculumNumber }
                curriculum_number_validation_error={ curriculum_number_validation_error }
                curriculum_numbers={ curriculum_numbers }
            />  
                
            <QuestionForm
                question={ question }
                setQuestion={ setQuestion }
                question_validation_error={ question_validation_error }
            />
                
            <CommentForm
                comment={ comment }
                setComment={ setComment }
                comment_validation_error={ comment_validation_error }
            />
            
            <Picture 
                question_id={ question_id }
            />
            
            <div className="submit">
                <input type="hidden"/>
                <p onClick={() => { handleClick() }} className="submit_btn">登録する</p>
            </div>
        </div>
    );
}

export default Edit;

if (document.getElementById('Question_mentor_edit')) {
    ReactDOM.render(<Edit />, document.getElementById('Question_mentor_edit'));
}

