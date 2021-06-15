import React from 'react';
import ReactDOM from 'react-dom';

class TopicForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            topic: 0,
        };
    }
    
    handleTopic(topic) {
        this.setState({ topic: topic });
    }
    
    render(){
        let topic;
        if(this. props.category === 0){
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
        
        return (
            <div className="content">
                <h2 className="title">トピックの選択</h2>
                { this.props.setTopic(this.state.topic) }
                { topic }
            </div>
        );
    }
}

export default TopicForm;