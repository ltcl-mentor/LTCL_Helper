import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import TopicForm from '../../Search/Search/Forms/topicForm';
import CurriculumNumber from '../../Search/Search/Forms/additionalForms/curriculum-number/curriculum-number';
import QuestionForm from '../../../Mentor/Question/Create/questionForm';
import Picture from '../../../Mentor/Question/Create/picture';
import Category from '../../Search/Search/Forms/categoryForm';

function Create() {
    const [category, setCategory] = useState(0);
    const [topic, setTopic] = useState(0);
    const [curriculum_number, setCurriculumNumber] = useState('');
    const [curriculum_number_validation_error, setCurriculumNumberValidationError] = useState(0);
    const [question, setQuestion] = useState('');
    const [question_validation_error, setQuestionValidationError] = useState(0);
    const curriculum_numbers = [
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
        ["成果物"]
    ];
    
    let set = 0;
    
    const handleClick = () => {
        // カリキュラム番号のバリデーション
        // カリキュラム番号が選択されているか
        if (!(curriculum_number)) {
            setCurriculumNumberValidationError(1);
            return false;
        }
        // カテゴリーとトピックに対して適切なカリキュラム番号が選択されているか
        if (!(curriculum_numbers[Number(category)][Number(topic)].includes(curriculum_number))) {
            setCurriculumNumberValidationError(1);
            return false;
        }
        
        // 質問とコメントのバリデーション
        if (question.trim().length !== 0){
            if (set === 0) {
                document.getElementById('create').submit();
                set=1;
            } else {
                return false;
            }
        } else {
            setQuestionValidationError(1);
            return false;
        }
    };
    
    let validation_message;
    if (curriculum_number_validation_error === 1) {
        validation_message = <p className="errorMassage">カリキュラム番号を選択してください。</p>;
    } else {
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
                question={ question }
                setQuestion={ setQuestion }
                question_validation_error={ question_validation_error }
            />
            
            <input type="hidden" name="post[comment]" value="メンターは入力お願いします。"/>
            
            <Picture/>
            
            <div className="submit">
                <p onClick={ handleClick } className="submit_btn">登録する</p>
            </div>
        </div>
    );
}

export default Create;

if (document.getElementById('Question_public_create')) {
    ReactDOM.render(<Create />, document.getElementById('Question_public_create'));
}
