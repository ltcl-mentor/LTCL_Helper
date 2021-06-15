import React from 'react';
import ReactDOM from 'react-dom';

class CommentForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            comment: '',
        };
    }
    
    changeComment(event) {
        this.setState({ comment: event.target.value });
    }
    
    render(){
        let validation_message;
        if(this.props.comment_validation_error === 1){
            validation_message = (<p className="errorMassage">コメントの入力は必須です。保留の場合は保留と入力してください。</p>);
        }else{
            validation_message = ('');
        }
        
        return (
            <div className="content">
                <h2 className="title">問題解決のヒントやコメントを入力</h2> 
                { validation_message }
                <textarea name="post[comment]" placeholder="あくまでもヒントにとどめるようにしてください。" rows="8" value={ this.state.comment } onChange={(event) => { this.changeComment(event) }}/>
                { this.props.setComment(this.state.comment) }
            </div>
        );
    }
}

export default CommentForm;