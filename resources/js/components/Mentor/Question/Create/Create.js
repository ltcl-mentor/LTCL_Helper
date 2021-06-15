import React from 'react';
import ReactDOM from 'react-dom';
import CrriculumNumber from './curriculum-number';

class Create extends React.Component{
    constructor(props){
        super(props);
        this.state={
            category: 0,
            topic: 0,
            question: '',
            question_validation_message: '質問内容の入力は必須です。',
            question_validation_error: 0,
            comment: '',
            comment_validation_message: 'コメントの入力は必須です。保留の場合は保留と入力してください。',
            comment_validation_error: 0,
        };
    }
    
    handleCategory(category) {
        this.setState({ category: category });
    }
    
    handleTopic(topic) {
        this.setState({ topic: topic });
    }
    
    changeQuestion(event) {
        this.setState({ question: event.target.value });
    }
    
    changeComment(event) {
        this.setState({ comment: event.target.value });
    }
    
    handleClick() {
        if(this.state.question.trim().length !== 0 && this.state.comment.trim().length !== 0){
            document.getElementById('create').submit();
        }else if(this.state.question.trim().length === 0 && this.state.comment.trim().length !== 0){
            this.setState({ question_validation_error: 1 });
            this.setState({ comment_validation_error: 0 });
            return false;
        }else if(this.state.question.trim().length !== 0 && this.state.comment.trim().length === 0){
            this.setState({ question_validation_error: 0 });
            this.setState({ comment_validation_error: 1 });
            return false;
        }else{
            this.setState({ question_validation_error: 1 });
            this.setState({ comment_validation_error: 1 });
            return false;
        }
    }
    
    render(){
        let topic;
        if(this.state.category === 0){
            topic = (
                <div className="carriculum">
                    <label className="radios"><input type="radio" name="post[topic]" value="0" onClick={() => { this.handleTopic(0) }} checked={ this.state.topic === 0 }/>AWS</label>
                    <label className="radios"><input type="radio" name="post[topic]" value="1" onClick={() => { this.handleTopic(1) }} checked={ this.state.topic === 1 }/>HTML</label>
                    <label className="radios"><input type="radio" name="post[topic]" value="2" onClick={() => { this.handleTopic(2) }} checked={ this.state.topic === 2 }/>CSS</label>
                    <label className="radios"><input type="radio" name="post[topic]" value="3" onClick={() => { this.handleTopic(3) }} checked={ this.state.topic === 3 }/>JavaScript</label>
                    <label className="radios"><input type="radio" name="post[topic]" value="4" onClick={() => { this.handleTopic(4) }} checked={ this.state.topic === 4 }/>サーバー</label>
                    <label className="radios"><input type="radio" name="post[topic]" value="5" onClick={() => { this.handleTopic(5) }} checked={ this.state.topic === 5 }/>PHP</label>
                    <label className="radios"><input type="radio" name="post[topic]" value="6" onClick={() => { this.handleTopic(6) }} checked={ this.state.topic === 6 }/>Laravel</label>
                    <label className="radios"><input type="radio" name="post[topic]" value="7" onClick={() => { this.handleTopic(7) }} checked={ this.state.topic === 7 }/>DB</label>
                    <label className="radios"><input type="radio" name="post[topic]" value="8" onClick={() => { this.handleTopic(8) }} checked={ this.state.topic === 8 }/>Git&GitHub</label>
                </div>
            );
        }else{
            topic = (
                <div className="portfolio">
                    <label className="radios"><input type="radio" name="post[topic]" value="9" onClick={() => { this.handleTopic(9) }} checked={ this.state.topic === 9 }/>環境構築</label>
                    <label className="radios"><input type="radio" name="post[topic]" value="10" onClick={() => { this.handleTopic(10) }} checked={ this.state.topic === 10 }/>設計図</label>
                    <label className="radios"><input type="radio" name="post[topic]" value="11" onClick={() => { this.handleTopic(11) }} checked={ this.state.topic === 11 }/>デプロイ</label>
                    <label className="radios"><input type="radio" name="post[topic]" value="12" onClick={() => { this.handleTopic(12) }} checked={ this.state.topic === 12 }/>API</label>
                </div>
            );
        }
        
        let question_validation_message;
        if(this.state.question_validation_error === 1){
            question_validation_message = (<p className="errorMassage">{ this.state.question_validation_message }</p>);
        }else{
            question_validation_message = ('');
        }
        
        let comment_validation_message;
        if(this.state.comment_validation_error === 1){
            comment_validation_message = (<p className="errorMassage">{ this.state.comment_validation_message }</p>);
        }else{
            comment_validation_message = ('');
        }
        
        return (
            <div className="container">
                <div className="content">
                    <h2 className="title">カテゴリーの選択</h2>
                    <label className="radios"><input type="radio" name="post[category]" value="0" onClick={() => { this.handleCategory(0) }} checked={ this.state.category === 0 }/>カリキュラム</label>
                    <label className="radios"><input type="radio" name="post[category]" value="1" onClick={() => { this.handleCategory(1) }} checked={ this.state.category === 1 }/>成果物</label>
                </div>
                
                <div className="content">
                    <h2 className="title">トピックの選択</h2>
                    { topic }
                </div>
                
                <CrriculumNumber
                    category={ this.state.category }
                    topic={ this.state.topic }
                />
                
                <div className="content">
                    <h2 className="title">質問内容を入力</h2>
                    { question_validation_message }
                    <textarea name="post[question]" placeholder="質問内容を簡潔に入力" rows="8" value={ this.state.question } onChange={(event) => { this.changeQuestion(event) }}/>
                </div>
                
                <div className="content">
                    <h2 className="title">問題解決のヒントやコメントを入力してください。</h2>
                    { comment_validation_message }
                    <textarea name="post[comment]" placeholder="あくまでもヒントにとどめるようにしてください。" rows="8" value={ this.state.comment } onChange={(event) => { this.changeComment(event) }}/>
                </div>
                <div className="submit">
                    <input type="hidden"/>
                    <a onClick={() => {this.handleClick()}}>登録する</a>
                </div>
            </div>
        );
    }
}

export default Create;

if (document.getElementById('Create')) {
    ReactDOM.render(<Create />, document.getElementById('Create'));
}
