import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

class Portfolio extends React.Component {
    constructor(props){
        super(props);
        this.state={
            questions: [],
            portfolio_topics: [
                {"id":8, "topic":"環境構築"},
                {"id":9, "topic":"成果物"},
                {"id":10, "topic":"デプロイ"},
                {"id":11, "topic":"API"}
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
                    <h1 className="title">{ topic.topic }</h1>
                    { this.state.questions.map((question) => {
                        if(question.topic === topic.id){
                            if(question.check === 1){
                                return <div className="question">・<a href={`/questions/`+question.id}>{ question.question }</a></div>;
                            }else{
                                return <div className="question">・<a href={`/questions/`+question.id}>{ question.question }</a>（未承認）</div>;
                            }
                        }
                    })}
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
