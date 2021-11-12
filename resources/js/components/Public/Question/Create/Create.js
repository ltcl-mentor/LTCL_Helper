import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import SaveIcon from '@material-ui/icons/Save';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import Card from '@material-ui/core/Card';

import Category from '../../Search/Condition/Search/Forms/categoryForm';
import TopicForm from '../../Search/Condition/Search/Forms/topicForm';
import CurriculumNumber from '../../Search/Condition/Search/Forms/additionalForms/curriculum-number/curriculum-number';
import QuestionForm from '../../../Mentor/Question/Create/questionForm';

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
    const csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
    
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
        if (question.trim().length !== 0) {
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
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" to="/">
                    HOME
                </Link>
                
                <Typography color="text.primary">
                    質問投稿
                </Typography>
            </Breadcrumbs>
            
            <Typography
                variant="h4"
                component="div"
                align="center"
                sx={{
                    marginTop: 4,
                    marginBottom: 2,
                }}
            >
                質問投稿
            </Typography>
            
            <Box sx={{ width: "70%", marginLeft: "15%"}}>
                <form action="/questions/store/public" method="post" id="create" enctype="multipart/form-data">
                    <input type="hidden" value={ csrf_token } name="_token" />
                    <input type="hidden" name="post[category]" value={ category } />
                    <input type="hidden" name="post[topic]" value={ topic } />
                    <input type="hidden" name="post[curriculum_number]" value={ curriculum_number } />
                    <input type="hidden" name="post[comment]" value="メンターは入力お願いします。"/>
                    
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
                            <Button onClick={ handleClick } variant="contained" endIcon={<SaveIcon />}>
                                投稿する
                            </Button>
                        </Typography>
                    </Card>
                </form>
            </Box>
        </div>
    );
}

export default Create;
