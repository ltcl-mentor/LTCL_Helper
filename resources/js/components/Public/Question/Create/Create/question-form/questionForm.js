import React, {useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import TextareaAutosize from '@mui/material/TextareaAutosize';

import TextForm from './original-text-form/originalTextForm';

/**
 * 質問タイトル、調べたこと、内容入力フォーム
 */
function QuestionForm(props) {
    const handleTitle = (event) => {
        props.setTitle(event.target.value);
    };
    
    const handleRemarks = (event) => {
        props.setRemarks(event.target.value);
    };
    
    return (
        <React.Fragment>
            <Typography
                variant="h5"
                component="div"
                sx={{
                    marginTop: 4,
                    marginLeft: 2,
                }}
            >
                4. 質問内容を入力
            </Typography>
            
            { props.question_validation_error === 1 && <p className="errorMassage">入力は必須です。</p> }
            
            <Box sx={{ width: "90%", marginLeft: "5%" }}>
                <Typography
                    variant="h7"
                    component="div"
                    sx={{
                        marginTop: 4,
                        marginLeft: 4,
                    }}
                >
                    質問タイトル（50字以内）
                </Typography>
            
                 <TextareaAutosize
                    placeholder="質問タイトルを入力"
                    minRows={2}
                    value={ props.title }
                    onChange={ (event) => handleTitle(event) }
                    style={{ 
                        width: "90%",
                        marginLeft: "5%",
                        paddingTop:2,
                    }}
                />
            </Box>
            
            <Box sx={{ width: "90%", marginLeft: "5%" }}>
                <Typography
                    variant="h7"
                    component="div"
                    sx={{
                        marginTop: 4,
                        marginLeft: 4,
                    }}
                >
                    調べたこと（参考にしたサイトURLなども記載）
                </Typography>
                
                <TextareaAutosize
                    placeholder="調べたことを入力"
                    minRows={4}
                    value={ props.remarks }
                    onChange={ (event) => handleRemarks(event) }
                    style={{ 
                        width: "90%",
                        marginLeft: "5%",
                        paddingTop:2,
                    }}
                />
                
                <Typography
                    variant="h7"
                    component="div"
                    sx={{
                        marginTop: 4,
                        marginLeft: 4,
                    }}
                >
                    質問の具体的な内容（試したことなど）
                </Typography>
            </Box>
            
            <TextForm
                text={ props.question }
                setText={ props.setQuestion }
                images={ props.images }
                setImages={ props.setImages }
            />
        </React.Fragment>
    );
}

export default QuestionForm;