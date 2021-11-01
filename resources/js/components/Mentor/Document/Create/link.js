import React,{useState} from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';

function Link(props) {
    
    const handleLink = (event) => {
        props.setLink(event.target.value);
    };

    let link_validation_message;
    props.link_validation_error === true ? link_validation_message = <p className="errorMassage">記事URLを入力してください。</p> : link_validation_message = ('');
    
    return (
        <div>
            <h2 className="title">記事URLの入力</h2>
            { link_validation_message }
            <TextareaAutosize 
                name="post[link]"
                placeholder="URLを入力。入力する際はNotePMの外部共有を利用"
                minRows={3}
                value={ props.link }
                onChange={ (event) => handleLink(event) }
                style={{ 
                    width: "60%",
                    marginLeft: "10%",
                    paddingTop:2,
                }}
            />
        </div>
    );
}

export default Link;