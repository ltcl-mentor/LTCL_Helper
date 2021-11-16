import React,{useState} from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';

function Title(props) {
    const handleTitle = (event) => {
        props.setTitle(event.target.value);
    };

    let title_validation_message;
    props.title_validation_error === true ? title_validation_message = <p className="errorMassage">タイトルを入力してください。</p> : title_validation_message = ('');
    
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
                2. 記事タイトルの入力
            </Typography>
            
            { title_validation_message }
            
            <Box sx={{ textAlign: "center", marginTop: 4 }}>
                <TextareaAutosize 
                    name="document[title]"
                    placeholder="制限字数は５０文字です"
                    minRows={2}
                    value={ props.title }
                    onChange={ (event) => handleTitle(event) }
                    style={{ 
                        width: "70%",
                        paddingTop:2,
                    }}
                />
            </Box>
        </div>
    );
}

export default Title;