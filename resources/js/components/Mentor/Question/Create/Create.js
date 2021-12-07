import React,{useState} from 'react';
import axios from "axios";
import {useHistory} from 'react-router-dom';
import Button from '@mui/material/Button';
import SaveIcon from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import Card from '@material-ui/core/Card';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import Breadcrumbs from '../../../Breadcrumbs';
import TopicForm from '../../../Public/Search/Condition/Search/Forms/topicForm';
import CurriculumNumber from '../../../Public/Search/Condition/Search/Forms/additionalForms/curriculum-number/curriculum-number';
import QuestionForm from './questionForm';
import CommentForm from './commentForm';
import Category from '../../../Public/Search/Condition/Search/Forms/categoryForm';

/*
 * 質問投稿(メンター用)のメインコンポーネント
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
    const [comment, setComment] = useState('');
    const [comment_validation_error, setCommentValidationError] = useState(0);
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
    const steps = ['基本情報の入力', '質問の入力', 'コメントの入力'];
    const [activeStep, setActiveStep] = useState(0);
    // const [skipped, setSkipped] = React.useState(new Set());
    
    // ステッパーを次に進める
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    
    // ステッパーを前に戻す
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    
    // ステッパーをリセット
    const handleReset = () => {
        setActiveStep(0);
    };
    
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
        if (question.trim().length !== 0 && comment.trim().length !== 0) {
            if (clickCount === 0) {
                setClickCount(1);
                
                axios
                    .post("/questions/store", {
                        category: category,
                        topic: topic,
                        curriculum_number: curriculum_number,
                        question: question,
                        comment: comment,
                    })
                    .then(response => {
                        if (response.status === 200) {
                            history.push(`/questions/${ response.data.id }`, { question: "created" });
                        }
                    }).catch(error => {
                        console.log(error);
                    });
            } else {
                return false;
            }
        } else if (question.trim().length === 0 && comment.trim().length !== 0) {
            setQuestionValidationError(1);
            setCommentValidationError(0);
            return false;
        } else if (question.trim().length !== 0 && comment.trim().length === 0) {
            setQuestionValidationError(0);
            setCommentValidationError(1);
            return false;
        } else {
            setQuestionValidationError(1);
            setCommentValidationError(1);
            return false;
        }
    };
    
    // ステッパーの内容
    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <div>
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
                
                    { curriculum_number_validation_error === 1 && <p className="errorMassage">カリキュラム番号を選択してください。</p> }
                
                    <CurriculumNumber
                        category={ category }
                        topic={ topic }
                        setCurriculumNumber={ setCurriculumNumber }
                    />
                    </div>
                );
                
            case 1:
                return (
                    <div>
                    <QuestionForm
                        question={ question }
                        setQuestion={ setQuestion }
                        question_validation_error={ question_validation_error }
                        activeStep={ activeStep }
                    />
                    </div>
                );
                
            case 2:
                return (
                    <div>
                    
                    <CommentForm
                        comment={ comment }
                        setComment={ setComment }
                        comment_validation_error={ comment_validation_error }
                    />
                    </div>
                );
                
            default:
                return 'Unknown step';
        }
    };
    
    return (
        <div className="container">
            <Breadcrumbs page="mentor_question_create"/>
            
            <Box sx={{ width: "70%", marginLeft: "15%" }}>
                <Card sx={{ marginBottom: 2 }}>
                    <Stepper activeStep={activeStep} sx={{ marginTop: 3 }}>
                        { steps.map((step, step_number) => {
                            return (
                                <Step key={step_number}>
                                    <StepLabel>{step}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                            
                    { activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                <Typography
                                    align="center"
                                    component="div"
                                    sx={{
                                        marginTop: 4,
                                        marginBottom: 3,
                                    }}
                                >
                                    <Button onClick={ handleSubmit } variant="contained" endIcon={<SaveIcon />}>
                                        登録する
                                    </Button>
                                </Typography>
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    戻る
                                </Button>
                                
                                <Box sx={{ flex: '1 1 auto' }} />
                                
                                <Button onClick={handleReset}>Reset</Button>
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>{ getStepContent(activeStep) }</Typography>
                            
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    戻る
                                </Button>
                                
                                <Box sx={{ flex: '1 1 auto' }} />
                                
                                <Button onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? '入力完了' : '次へ'}
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Card>
            </Box>
        </div>
    );
}

export default Create;
