import React from 'react';

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
        <div className="content">
            <h2 className="title">質問内容を入力</h2>
            { validation_message }
            <textarea name="post[question]" placeholder="質問内容を簡潔に入力" rows="8" value={ props.question } onChange={ (event) => handleQuestion(event) }/>
        </div>
    );
}

export default QuestionForm;