import React,{useState} from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';

function Title(props) {
    const handleTitle = (event) => {
        props.setTitle(event.target.value);
    };

    let title_validation_message;
    props.title_validation_error === true ? title_validation_message = <p className="errorMassage">タイトルを入力してください。</p> : title_validation_message = ('');
    
    return (
        <div>
            <h2 className="title">記事タイトルの入力</h2>
            { title_validation_message }
            <TextareaAutosize 
                name="post[title]"
                placeholder="制限字数は５０文字です"
                minRows={2}
                value={ props.title }
                onChange={ (event) => handleTitle(event) }
                style={{ 
                    width: "60%",
                    marginLeft: "10%",
                    paddingTop:2,
                }}
            />
        </div>
    );
}

export default Title;