import React,{useState} from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';

function Link(props) {
    
    const handleLink = (event) => {
        props.setLink(event.target.value);
    };

    let link_validation_message;
    props.link_validation_error === true ? link_validation_message = <p className="errorMassage">記事URLを入力してください。</p> : link_validation_message = ('');
    
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
                3. 記事URLの入力
            </Typography>
        
            { link_validation_message }
            
            <Box sx={{ textAlign: "center", marginTop: 4 }}>
                <TextareaAutosize 
                    name="document[link]"
                    placeholder="URLを入力。入力する際はNotePMの外部共有を利用"
                    minRows={3}
                    value={ props.link }
                    onChange={ (event) => handleLink(event) }
                    style={{ 
                        width: "70%",
                        paddingTop:2,
                    }}
                />
            </Box>
        </div>
    );
}

export default Link;