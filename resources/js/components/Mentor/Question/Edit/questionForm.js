import React from 'react';
import ReactDOM from 'react-dom';

class QuestionForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            question: '',
        };
    }
    
    componentDidUpdate(prevProps){
        if(this.props.old_question !== prevProps.old_question){
            this.setState({ question: this.props.old_question });
        }
    }
    
    changeQuestion(event) {
        this.setState({ question: event.target.value });
    }
    
    render(){
        let validation_message;
        if(this.props.question_validation_error === 1){
            validation_message = (<p className="errorMassage">質問内容の入力は必須です。</p>);
        }else{
            validation_message = ('');
        }
        
        return (
            <div className="content">
                <h2 className="title">質問内容を入力</h2>
                { validation_message }
                <textarea name="post[question]" placeholder="質問内容を簡潔に入力" rows="8" value={ this.state.question } onChange={(event) => { this.changeQuestion(event) }}/>
                { this.props.setQuestion(this.state.question) }
            </div>
        );
    }
}

export default QuestionForm;