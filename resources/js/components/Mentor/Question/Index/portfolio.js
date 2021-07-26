import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

class Portfolio extends React.Component {
    constructor(props){
        super(props);
        this.state={
            questions: [],
            portfolio_topics: [
                {"id":9, "topic":"マイグレーション"},
                {"id":10, "topic":"リレーション"},
                {"id":11, "topic":"Laravel拡張"},
                {"id":12, "topic":"画像処理"},
                {"id":13, "topic":"Heroku環境"},
                {"id":14, "topic":"API"},
                {"id":15, "topic":"デザイン"},
            ],
        };
    } 
    
    componentDidMount() {
        axios
            .get("/react/portfolio/questions")
            .then(response => {
                this.setState({
                    questions: response.data
                });
 
            }).catch(error => {
                console.log(error);
            });
    }
    
    render(){
        const portfolio = this.state.portfolio_topics.map((topic) => {
            return (
                <div className="content">
                    <details>
                        <summary className="title">{ topic.topic }  (公開：{ this.state.questions.filter(question => question.topic == topic.id && question.check === 1).length }件、非公開：{ this.state.questions.filter(question => question.topic == topic.id && question.check === 0).length }件)</summary>
                        { this.state.questions.map((question) => {
                            if(question.topic === topic.id){
                                if(question.check === 1){
                                    return <div className="question">・<a href={`/questions/`+question.id}>{ question.question }</a></div>;
                                }else{
                                    return <div className="question">・（非公開）<a href={`/questions/`+question.id}>{ question.question }</a></div>;
                                }
                            }
                        })}
                    </details>
                </div>
            );
        });

        
        return (
            <div className="container">
                { portfolio }
            </div>
        );
    }
}

export default Portfolio;
