import React from 'react';
import ReactDOM from 'react-dom';

class Topic extends React.Component {
    constructor(props){
        super(props);
        this.state={
            topicSelected: '',
            topic:['AWS', 'HTML', 'CSS', 'JavaScript', 'サーバー', 'PHP', 'Laravel', 'DB', 'Git&GitHub', '環境構築', '設計図', 'デプロイ', 'API'],
            lastCategory: '',
        };
    } 
    
    handleTopic(topic){
        this.setState({ topicSelected: topic });
        this.setState({ lastCategory: this.props.category });
    }
    
    handleChange(){
        this.setState({ topicSelected: '' });
    }
    
    render(){
        let topicForm;
        
        if(this.state.topicSelected === '' || this.state.lastCategory !== this.props.category){
            if(this.props.category === 0){
                topicForm = (
                    <div>
                        <h2 className="steps">STEP2 該当するトピックを選択します。</h2>
                        <div className="topic_box">
                            <label className="topic_button"><input type="radio" name="curriculum" onClick={() => { this.handleTopic(0) }}/>AWS</label>
                            <label className="topic_button"><input type="radio" name="curriculum" onClick={() => { this.handleTopic(1) }}/>HTML</label>
                            <label className="topic_button"><input type="radio" name="curriculum" onClick={() => { this.handleTopic(2) }}/>CSS</label>
                            <label className="topic_button"><input type="radio" name="curriculum" onClick={() => { this.handleTopic(3) }}/>JavaScript</label>
                            <label className="topic_button"><input type="radio" name="curriculum" onClick={() => { this.handleTopic(4) }}/>PHP</label>
                            <label className="topic_button"><input type="radio" name="curriculum" onClick={() => { this.handleTopic(5) }}/>Laravel</label>
                            <label className="topic_button"><input type="radio" name="curriculum" onClick={() => { this.handleTopic(6) }}/>DB</label>
                            <label className="topic_button"><input type="radio" name="curriculum" onClick={()=> { this.handleTopic(7) }}/>Git&GitHub</label>
                        </div>
                    </div>
                );
            }else if(this.props.category === 1){
                topicForm = (
                    <div>
                        <h2 className="steps">STEP2 該当するトピックを選択します。</h2>
                        <div  className="topic_box">
                            <label className="topic_button"><input type="radio" name="portfolio"  onClick={() => { this.handleTopic(8) }}/>環境構築</label>
                            <label className="topic_button"><input type="radio" name="portfolio"  onClick={() => { this.handleTopic(9) }}/>設計図</label>
                            <label className="topic_button"><input type="radio" name="portfolio"  onClick={() => { this.handleTopic(10) }}/>デプロイ</label>
                            <label className="topic_button"><input type="radio" name="portfolio"  onClick={() => { this.handleTopic(11) }}/>API</label>
                        </div>
                    </div>
                );
            }else{
                topicForm = (
                    <div className="second_questin_preview">
                        <h2 className="steps">STEP2 該当するトピックを選択します。</h2>
                        <div className="topic_box">
                            <div className="topic_button_preview">AWS</div>
                            <div className="topic_button_preview">HTML</div>
                            <div className="topic_button_preview">CSS</div>
                            <div className="topic_button_preview">JavaScript</div>
                            <div className="topic_button_preview">PHP</div>
                            <div className="topic_button_preview">Laravel</div>
                            <div className="topic_button_preview">DB</div>
                            <div className="topic_button_preview">Git&GitHub</div>
                        </div>
                    </div>
                );
            }
        }else{
            topicForm = (
                <div>
                    <h2 className="steps">STEP2 該当するトピックを選択します。</h2>
                    <div className="topic_result_box">
                        <h4 className="topic_result">{ this.state.topic[this.state.topicSelected] }</h4>
                        <a className="change_button" onClick={() => { this.handleChange() }}>変更する</a>
                    </div>
                </div>
            );
        }
        
        return (
            <div className="container">
                { this.props.setTopic(this.state.topicSelected) }
                { topicForm }
            </div>
        );
    }
}

export default Topic;
