import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

class Questions extends React.Component {
    constructor(props){
        super(props);
        this.state={
            questions: [],
            curriculumTopics: [
                {"id":0,"topic":"AWS"},
                {"id":1,"topic":"HTML"},
                {"id":2,"topic":"CSS"},
                {"id":3,"topic":"JavaScript"},
                {"id":4,"topic":"PHP"},
                {"id":5,"topic":"Laravel"},
                {"id":6,"topic":"DB"},
                {"id":7,"topic":"Git&GitHub"}
            ],
            portfolioTopics: [
                {"id":8,"topic":"環境構築"},
                {"id":9,"topic":"成果物"},
                {"id":10,"topic":"デプロイ"},
                {"id":11,"topic":"API"}
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
                    <h2 className="title">{ topic.topic }</h2>
                    { this.state.questions.map((question) => {
                        if(question.category === 0 && question.topic === topic.id){
                            return <div className="question">・<a href={ `/relations/question/`+question.id }>{ question.question }</a></div>;
                        }
                    })}
                </div>
            );
        });
        
        const portfolio = this.state.portfolioTopics.map((topic) => {
            return (
                <div className="content">
                    <h2 className="title">{ topic.topic }</h2>
                    { this.state.questions.map((question) => {
                        if(question.category === 0 && question.topic === topic.id){
                            return <div className="question">・<a href={ `/relations/question/`+question.id }>{ question.question }</a></div>;
                        }
                    })}
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
