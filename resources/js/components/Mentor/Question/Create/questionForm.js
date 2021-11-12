import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import TextareaAutosize from '@mui/material/TextareaAutosize';

import Picture from './picture';

function QuestionForm(props) {
    
    const handleQuestion = (event) => {
        props.setQuestion(event.target.value);
    };
    
    let validation_message;
    if (props.question_validation_error === 1) {
        validation_message = (<p className="errorMassage">質問内容の入力は必須です。</p>);
    } else {
        validation_message = ('');
    }
    
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
                4. 質問内容を入力
            </Typography>
            
            { validation_message }
            
            <Picture/>
            
            <Box sx={{ textAlign: "center", marginTop: 2 }}>
                <TextareaAutosize 
                    name="post[question]"
                    placeholder="質問内容を簡潔に入力"
                    minRows={8}
                    value={ props.question }
                    onChange={ (event) => handleQuestion(event) }
                    style={{ 
                        width: "80%",
                        paddingTop:2,
                    }}
                />
            </Box>
        </div>
    );
}

export default QuestionForm;