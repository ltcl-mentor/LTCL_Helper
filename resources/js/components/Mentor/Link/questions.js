import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

class Questions extends React.Component {
    constructor(props){
        super(props);
        this.state={
            questions: [],
            curriculumTopics: [
                {"id":0, "topic":"AWS"},
                {"id":1, "topic":"HTML"},
                {"id":2, "topic":"CSS"},
                {"id":3, "topic":"JavaScript"},
                {"id":4, "topic":"サーバー"},
                {"id":5, "topic":"PHP"},
                {"id":6, "topic":"Laravel"},
                {"id":7, "topic":"DB"},
                {"id":8, "topic":"Git&GitHub"}
            ],
            portfolioTopics: [
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
            .get("/react/all/questions")
            .then(response => {
                this.setState({
                    questions: response.data
                });
 
            }).catch(error => {
                console.log(error);
            });
    }
    
    render(){
        const curriculum = this.state.curriculumTopics.map((topic) => {
            return (
                <div className="content">
                    <details>
                        <summary className="title">{ topic.topic }  { this.state.questions.filter(question => question.topic == topic.id).length }件</summary>
                        { this.state.questions.map((question) => {
                            if(question.category === 0 && question.topic === topic.id){
                                return <div className="question">・<a href={ `/links/question/`+question.id }>{ question.question }</a></div>;
                            }
                        })}
                    </details>
                </div>
            );
        });
        
        const portfolio = this.state.portfolioTopics.map((topic) => {
            return (
                <div className="content">
                    <details>
                        <summary className="title">{ topic.topic }  { this.state.questions.filter(question => question.topic == topic.id).length }件</summary>
                        { this.state.questions.map((question) => {
                            if(question.category === 0 && question.topic === topic.id){
                                return <div className="question">・<a href={ `/links/question/`+question.id }>{ question.question }</a></div>;
                            }
                        })}
                    </details>
                </div>
            );
        });

        
        return (
            <div className="container">
                <div className="cover"><h1 className="curriculum">カリキュラム</h1></div>
                { curriculum }
                <div className="cover"><h1 className="portfolio">成果物</h1></div>
                { portfolio }
            </div>
        );
    }
}

export default Questions;
