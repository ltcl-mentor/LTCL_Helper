import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import TextareaAutosize from '@mui/material/TextareaAutosize';

function CommentForm(props) {
    
    const handleComment = (event) => {
        props.setComment(event.target.value);
    };
    
    let validation_message;
    if (props.comment_validation_error === 1) {
        validation_message = (<p className="errorMassage">コメントの入力は必須です。保留の場合は保留と入力してください。</p>);
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
                5. ヒント、コメントを入力
            </Typography>
            
            { validation_message }
            
            <Box sx={{ textAlign: "center", marginTop: 4 }}>
                <TextareaAutosize 
                    name="post[comment]"
                    placeholder="あくまでもヒントにとどめるようにしてください。"
                    minRows={8}
                    value={ props.comment }
                    onChange={ (event) => handleComment(event) }
                    style={{ 
                        width: "80%",
                        paddingTop:2,
                    }}
                />
            </Box>
        </div>
    );
}

export default CommentForm;