import React from 'react';
import ReactDOM from 'react-dom';

class Topic extends React.Component {
    constructor(props){
        super(props);
        this.state={
            topicSelected:'',
            topic:['','AWS','HTML','CSS','JavaScript','PHP','Laravel','DB','Git&GitHub','環境構築','設計図','デプロイ','API'],
            lastCategory:'',
        };
    } 
    
    handleTopic(topic){
        this.setState({topicSelected:topic});
        this.setState({lastCategory:this.props.category});
    }
    
    handleChange(){
        this.setState({topicSelected:''});
    }
    
    render(){
        let topicForm;
        
        if(this.state.topicSelected==='' || this.state.lastCategory !== this.props.category){
            if(this.props.category===1){
                topicForm=(
                    <div>
                        <h2 className="steps">STEP2 該当するトピックを選択します。</h2>
                        <div className="topic_box">
                            <label className="topic_button"><input type="radio" name="curriculum" onClick={()=>{this.handleTopic(1)}}/>AWS</label>
                            <label className="topic_button"><input type="radio" name="curriculum" onClick={()=>{this.handleTopic(2)}}/>HTML</label>
                            <label className="topic_button"><input type="radio" name="curriculum" onClick={()=>{this.handleTopic(3)}}/>CSS</label>
                            <label className="topic_button"><input type="radio" name="curriculum" onClick={()=>{this.handleTopic(4)}}/>JavaScript</label>
                            <label className="topic_button"><input type="radio" name="curriculum" onClick={()=>{this.handleTopic(5)}}/>PHP</label>
                            <label className="topic_button"><input type="radio" name="curriculum" onClick={()=>{this.handleTopic(6)}}/>Laravel</label>
                            <label className="topic_button"><input type="radio" name="curriculum" onClick={()=>{this.handleTopic(7)}}/>DB</label>
                            <label className="topic_button"><input type="radio" name="curriculum" onClick={()=>{this.handleTopic(8)}}/>Git&GitHub</label>
                        </div>
                    </div>
                );
            }else if(this.props.category===2){
                topicForm=(
                    <div>
                        <h2 className="steps">STEP2 該当するトピックを選択します。</h2>
                        <div  className="topic_box">
                            <label className="topic_button"><input type="radio" name="portfolio"  onClick={()=>{this.handleTopic(9)}}/>環境構築</label>
                            <label className="topic_button"><input type="radio" name="portfolio"  onClick={()=>{this.handleTopic(10)}}/>設計図</label>
                            <label className="topic_button"><input type="radio" name="portfolio"  onClick={()=>{this.handleTopic(11)}}/>デプロイ</label>
                            <label className="topic_button"><input type="radio" name="portfolio"  onClick={()=>{this.handleTopic(12)}}/>API</label>
                        </div>
                    </div>
                );
            }else{
                topicForm=(
                    <div className="second_questin_preview">
                        <h2 className="steps">STEP2 該当するトピックを選択します。</h2>
                        <div className="topic_box">
                            <div className="topic_button">AWS</div>
                            <div className="topic_button">HTML</div>
                            <div className="topic_button">CSS</div>
                            <div className="topic_button">JavaScript</div>
                            <div className="topic_button">PHP</div>
                            <div className="topic_button">Laravel</div>
                            <div className="topic_button">DB</div>
                            <div className="topic_button">Git&GitHub</div>
                        </div>
                        <div>検索する</div>
                    </div>
                );
            }
        }else{
            topicForm=(
                <div>
                    <h2 className="steps">STEP2 該当するトピックを選択します。</h2>
                    <div className="topic_result_box">
                        <h4 className="topic_result">{this.state.topic[this.state.topicSelected]}</h4>
                        <a className="change_button" onClick={()=>{this.handleChange()}}>変更する</a>
                    </div>
                </div>
            );
        }
        
        return (
            <div className="container">
                {this.props.setTopic(this.state.topicSelected)}
                {topicForm}
            </div>
        );
    }
}

export default Topic;
