import React,{useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import {useParams} from 'react-router-dom';
import Button from '@mui/material/Button';
import SaveIcon from '@material-ui/icons/Save';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import Card from '@material-ui/core/Card';

import Category from './categoryForm';
import TopicForm from './topicForm';
import CurriculumNumber from './Curriculum-number/curriculum-number';
import QuestionForm from '../Create/questionForm';
import CommentForm from '../Create/commentForm';
import Picture from './picture';

function Edit() {
    const { id } = useParams();
    const [oldData, setOldData] = useState([]);
    const [category, setCategory] = useState(0);
    const [topic, setTopic] = useState(0);
    const [curriculum_number, setCurriculumNumber] = useState();
    const [curriculum_number_validation_error, setCurriculumNumberValidationError] = useState(0);
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
        [
            ["成果物"],
        ]
    ];
    // 選択されたcategory、topicに該当するカリキュラム番号群を保持
    // const [curriculum_numbers, setCurriculumNumbers] = useState(["1-1-1"]);
    const [question, setQuestion] = useState();
    const [question_validation_error, setQuestionValidationError] = useState(0);
    const [comment, setComment] = useState();
    const [comment_validation_error, setCommentValidationError] = useState(0);
    // const question_id = document.getElementById('Question_mentor_edit').getAttribute('question_id');
    const csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
    
    useEffect(() => {
        axios
            .get(`/react/question/${ id }`)
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
    
    // カリキュラム番号の初期値が変更されたvategory、topicと対応していなくても
    // 更新ができてしまうのでその対策
    useEffect(() => {
        setCurriculumNumber('');
    }, [category, topic]);
    
    // 保存処理の重複を防止するためにクリック回数を記録する変数set
    let set = 0;
    const handleClick = () => {
        // カリキュラム番号のバリデーション
        // 入力確認
        if (!(curriculum_number)) {
            setCurriculumNumberValidationError(1);
            return false;
        }
        // category、topicとの対応確認
        if (!(curriculum_numbers[Number(category)][Number(topic)].includes(curriculum_number))) {
            setCurriculumNumberValidationError(1);
            return false;
        }
        
        // 質問とコメントのバリデーション
        if (question.trim().length !== 0 && comment.trim().length !== 0){
            if (set==0) {
                console.log(0);
                document.getElementById('update').submit();
                set=1;
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
    
    return (
        <div className="container">
            <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 4 }}>
                <Link underline="hover" to="/">
                    HOME
                </Link>
                
                <Link underline="hover" to="/mentor/top">
                    メンタートップ
                </Link>
                
                <Link underline="hover" to={ `/questions/` + id }>
                    質問詳細
                </Link>
                
                <Typography color="text.primary">
                    質問編集
                </Typography>
            </Breadcrumbs>
            
            <Box sx={{ width: "70%", marginLeft: "15%" }}>
                <form action={`/questions/` + id  + `/update`} method="post" enctype="multipart/form-data" id ="update">
                    <input type="hidden" name="_token" value={ csrf_token }/>
                    <input type="hidden" name="post[curriculum_number]" value={ curriculum_number } />
                    
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
                                category={ category }
                                old_category={ oldData.category }
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
                                topic={ topic }
                                setTopic={ setTopic }
                                old_topic={ oldData.topic }
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
                        
                        <CurriculumNumber
                            setCurriculumNumber={ setCurriculumNumber }
                            curriculum_number={ curriculum_number }
                            old_curriculum_number={ oldData.curriculum_number }
                            curriculum_number_validation_error={ curriculum_number_validation_error }
                            curriculum_numbers={ curriculum_numbers[Number(category)][Number(topic)] }
                        />
                        
                        <QuestionForm
                            question={ question }
                            setQuestion={ setQuestion }
                            question_validation_error={ question_validation_error }
                        />
                        
                        <Picture
                            question_id={ id }
                        />
                        
                        <CommentForm
                            comment={ comment }
                            setComment={ setComment }
                            comment_validation_error={ comment_validation_error }
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
                                更新する
                            </Button>
                        </Typography>
                    </Card>
                </form>
            </Box>
        </div>
    );
}

export default Edit;
