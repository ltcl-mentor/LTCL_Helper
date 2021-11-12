import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import axios from "axios";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Parameters from './parameters';
import Question from './question';
import Comment from './comment';
import Documents from './documents';
import RelatedQuestions from './related-questions';

function Show() {
    const { id } = useParams();
    const [question, setQuestion] = useState([]);
    const [images, setImages] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [relatedQuestions, setRelatedQuestions] = useState([]);

    useEffect(() => {
        axios
            .get(`/react/checked/question/${ id }`)
            .then(response => {
                setQuestion(response.data);
            }).catch(error => {
                console.log(error);
            });
            
        axios
            .get(`/react/images/${ id }`)
            .then(response => {
                setImages(response.data);
            }).catch(error => {
                console.log(error);
            });
            
        axios
            .get(`/react/related/documents/${ id }`)
            .then(response => {
                setDocuments(response.data);
            }).catch(error => {
                console.log(error);
            });
        
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
            <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 4 }}>
                <Link underline="hover" to="/">
                    HOME
                </Link>
                
                <Link underline="hover" to="/public/questions/index">
                    質問一覧
                </Link>
                
                <Typography color="text.primary">
                    質問詳細
                </Typography>
            </Breadcrumbs>
            
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
                            image={ images }
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
