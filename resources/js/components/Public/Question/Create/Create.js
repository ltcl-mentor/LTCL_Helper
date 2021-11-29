import React,{useState} from 'react';
import axios from "axios";
import {useHistory} from 'react-router-dom';
import Button from '@mui/material/Button';
import SaveIcon from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import Card from '@material-ui/core/Card';

import Breadcrumbs from '../../../Breadcrumbs';
import Category from '../../Search/Condition/Search/Forms/categoryForm';
import TopicForm from '../../Search/Condition/Search/Forms/topicForm';
import CurriculumNumber from '../../Search/Condition/Search/Forms/additionalForms/curriculum-number/curriculum-number';
import QuestionForm from '../../../Mentor/Question/Create/questionForm';

/*
 * 質問投稿(公開)のメインコンポーネント
 */
function Create() {
    const history = useHistory();
    const [clickCount, setClickCount] = useState(0);
    const [category, setCategory] = useState(0);
    const [topic, setTopic] = useState(0);
    const [curriculum_number, setCurriculumNumber] = useState('');
    const [curriculum_number_validation_error, setCurriculumNumberValidationError] = useState(0);
    const [question, setQuestion] = useState('');
    const [question_validation_error, setQuestionValidationError] = useState(0);
    const curriculum_numbers = [
        [
            ['1-1-1'],
            ['2-1-1'],
            ['2-1-2'],
            ['2-1-3'],
            ['3-1-1'],
            ['4-1-1', '4-1-2', '4-1-3', '4-1-4'],
            ['5-1-1', '8-1-1', '8-2-1', '8-3-1', '8-4-1', '8-5-1', '8-6-1'],
            ['6-1-1', '6-2-1'],
            ['7-1-1']
        ],
        ['成果物']
    ];
    
    // 投稿実行
    const handleSubmit = () => {
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
        if (question.trim().length !== 0) {
            if (clickCount === 0) {
                // 重複保存防止のためにクリック数をカウント
                setClickCount(1);
                
                // 質問を送信
                axios
                    .post("/questions/store/public", {
                        category: category,
                        topic: topic,
                        curriculum_number: curriculum_number,
                        question: question,
                        comment: "メンターは入力お願いします。",
                    })
                    .then(response => {
                        // 保存に成功したらHOMEに戻る
                        if (response.status === 200) {
                            history.push("/", { type: "question", status: "created" });
                        }
                    }).catch(error => {
                        console.log(error);
                    });
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
            <Breadcrumbs page="public_question_create"/>
            
            <Box sx={{ width: "70%", marginLeft: "15%" }}> 
                <Card sx={{ marginBottom: 2 }}>
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{
                            marginTop: 4,
                            marginLeft: 2,
                        }}
                    >
                        1. カテゴリーの選択
                    </Typography>
                    
                    <Typography
                        component="div"
                        sx={{
                            marginTop: 2,
                            marginLeft: 4,
                        }}
                    >
                        <Category
                            setCategory={ setCategory }
                        />
                    </Typography>
                    
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{
                            marginTop: 4,
                            marginLeft: 2,
                        }}
                    >
                        2. トピックの選択
                    </Typography>
                    
                    <Typography
                        component="div"
                        sx={{
                            marginTop: 2,
                            marginLeft: 4,
                        }}
                    >
                        <TopicForm
                            category={ category }
                            setTopic={ setTopic }
                            isCanceling={ false }
                        />
                    </Typography>
                    
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{
                            marginTop: 4,
                            marginLeft: 2,
                        }}
                    >
                        3. 該当カリキュラム番号の選択
                    </Typography>
                    
                    { validation_message }
                    
                    <CurriculumNumber
                        category={ category }
                        topic={ topic }
                        setCurriculumNumber={ setCurriculumNumber }
                    />
                    
                    <QuestionForm
                        question={ question }
                        setQuestion={ setQuestion }
                        question_validation_error={ question_validation_error }
                    />
                    
                    <Typography
                        align="center"
                        component="div"
                        sx={{
                            marginTop: 4,
                            marginBottom: 3,
                        }}
                    >
                        <Button onClick={ handleSubmit } variant="contained" endIcon={<SaveIcon />}>
                            投稿する
                        </Button>
                    </Typography>
                </Card>
            </Box>
        </div>
    );
}

export default Create;
