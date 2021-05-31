import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

class Curriculum extends React.Component {
    constructor(props){
        super(props);
        this.state={
            questions: [],
            curriculum_topics: [
                {"id":0, "topic":"AWS"},
                {"id":1, "topic":"HTML"},
                {"id":2, "topic":"CSS"},
                {"id":3, "topic":"JavaScript"},
                {"id":4, "topic":"PHP"},
                {"id":5, "topic":"Laravel"},
                {"id":6, "topic":"DB"},
                {"id":7, "topic":"Git&GitHub"}
            ],
        };
    } 
    
    componentDidMount() {
        axios
            .get("/react/curriculum/questions")
            .then(response => {
                this.setState({
                    questions: response.data
                });
 
            }).catch(error => {
                console.log(error);
            });
    }
    
    render(){
        const curriculum = this.state.curriculum_topics.map((topic) => {
            return (
                <div className="content">
                    <h1 className="title">{ topic.topic }</h1>
                    { this.state.questions.map((question) => {
                        if(question.topic === topic.id){
                            if(question.check===1){
                                return <div className="question">・<a href={`/questions/`+question.id} target="_blank">{ question.question }</a></div>;
                            }else{
                                return <div className="question">・<a href={`/questions/`+question.id} target="_blank">{ question.question }</a>（未承認）</div>;
                            }
                        }
                    })}
                </div>
            );
        });
        
        return (
            <div className="container">
                { curriculum }
            </div>
        );
    }
}

export default Curriculum;