import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Breadcrumbs from '../../../Breadcrumbs';
import Parameters from './parameters';
import Question from './question';
import Comment from './comment';
import Documents from './documents';
import RelatedQuestions from './related-questions';

/*
 * 質問詳細画面(公開)のメインコンポーネント
 */
function Show() {
    const { id } = useParams();
    const [question, setQuestion] = useState([]);
    const [images, setImages] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [relatedQuestions, setRelatedQuestions] = useState([]);
    
    // 画面描画時に実行
    useEffect(() => {
        // ユーザの質問詳細画面の閲覧を記録
        axios
            .post(`/questions/record/${ id }`)
            .then(response => {
                
            }).catch(error => {
                console.log(error);
            });
        
        // 公開済みの全質問を取得
        axios
            .get(`/react/checked/question/${ id }`)
            .then(response => {
                setQuestion(response.data);
            }).catch(error => {
                console.log(error);
            });
        
        // 質問に該当する画像の取得
        axios
            .get(`/react/images/${ id }`)
            .then(response => {
                setImages(response.data);
            }).catch(error => {
                console.log(error);
            });
        
        // 質問に関連する全参考記事を取得
        axios
            .get(`/react/related/documents/${ id }`)
            .then(response => {
                setDocuments(response.data);
            }).catch(error => {
                console.log(error);
            });
        
        // この質問と同じカテゴリー、トピックの質問を取得
        axios
            .get(`/react/search/questions?category=${ 0 }&topic=${ 0 }`)
            .then(response => {
                setRelatedQuestions(response.data);
            }).catch(error => {
                console.log(error);
            });
    }, []);
    
    return (
        <div className="container">
            <Breadcrumbs page="public_question_show"/>
            
            <Parameters 
                category={ question.category }
                topic={ question.topic }
                curriculum_number={ question.curriculum_number }
            />
            
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                <Grid item sx={{ width:"70%" }}>
                    <Box>
                        <Question 
                            count={ images.filter(v=>v).length }
                            images={ images }
                            updated_at={ question.updated_at }
                            question={ question.question }
                        />
                        
                        <Comment 
                            comment={ question.comment }
                        />
                        
                        <Typography
                            variant="h4"
                            component="div"
                            align="center"
                            sx={{
                                marginTop: 4,
                                marginBottom: 2,
                            }}
                        >
                            参考記事
                        </Typography>
                        
                        <Documents 
                            documents={ documents }
                        />
                    </Box>
                </Grid>
                
                <Grid item sx={{ width: "30%", minWidth: "300px" }}>
                    <RelatedQuestions 
                        relatedQuestions={ relatedQuestions }
                    />
                </Grid>
            </Grid>
        </div>
    );
    
}

export default Show;
