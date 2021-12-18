import React, {useState, useEffect} from 'react';
import axios from "axios";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Parameters from '../../../../Public/Question/Show/parameters';
import Question from '../../../../Public/Question/Show/question';
import Comment from '../../../../Public/Question/Show/comment';
import Documents from '../../../../Public/Question/Show/documents';
import RelatedQuestions from '../../../../Public/Question/Show/related-questions';

function Preview(props) {
    const [relatedQuestions, setRelatedQuestions] = useState([]);
    
    useEffect(() => {
        axios
            .get(`/react/search/questions?category=${ props.question.category }&topic=${ props.question.topic }`)
            .then(response => {
                setRelatedQuestions(response.data);
            }).catch(error => {
                console.log(error);
            });
    }, []);
    
    return (
        <div className="container">
            <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 4 }}>
                <Typography color="text.primary">
                    HOME
                </Typography>
                
                <Typography color="text.primary">
                    質問一覧
                </Typography>
                
                <Typography color="text.primary">
                    質問詳細
                </Typography>
            </Breadcrumbs>
            
            <Parameters 
                category={ props.question.category }
                topic={ props.question.topic }
                curriculum_number={ props.question.curriculum_number }
            />
                
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                <Grid item sx={{ width: "70%" }}>
                    <Box>
                        <Question
                            title={ props.question.title }
                            remarks={ props.question.remarks }
                            updated_at={ props.question.updated_at }
                            question={ props.question.question }
                        />
                        
                        <Comment 
                            comment={ props.question.comment }
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
                            documents={ props.documents }
                        />
                    </Box>
                </Grid>
                
                <Grid item sx={{ width: "30%" }}>
                    <RelatedQuestions 
                        relatedQuestions={ relatedQuestions }
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default Preview;
