import React from 'react';

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
        <div className="content">
            <h2 className="title">問題解決のヒントやコメントを入力</h2> 
            { validation_message }
            <textarea name="post[comment]" placeholder="あくまでもヒントにとどめるようにしてください。" rows="8" value={ props.comment } onChange={ (event) => handleComment(event) }/>
        </div>
    );
}

export default CommentForm;