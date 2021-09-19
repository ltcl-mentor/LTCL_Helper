import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import Parameters from './parameters';
import Question from './question';
import Comment from './comment';
import Documents from './documents';
import RelatedQuestions from './related-questions';

function Show() {
    const [question, setQuestion] = useState([]);
    const [images, setImages] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [relatedQuestions, setRelatedQuestions] = useState([]);
    const question_id = document.getElementById('Public_Show').getAttribute('question_id');
    const category = document.getElementById('Public_Show').getAttribute('category');
    const topic = document.getElementById('Public_Show').getAttribute('topic');

    useEffect(() => {
        axios
            .get(`/react/question/${ question_id }`)
            .then(response => {
                setQuestion(response.data);
                
            }).catch(error => {
                console.log(error);
            });
            
        axios
            .get(`/react/images/${ question_id }`)
            .then(response => {
                setImages(response.data);
                
            }).catch(error => {
                console.log(error);
            });
            
        axios
            .get(`/react/related/documents/${ question_id }`)
            .then(response => {
                setDocuments(response.data);
                
            }).catch(error => {
                console.log(error);
            });
        
        axios
            .get(`/react/search/questions?category=${ category }&topic=${ topic }`)
            .then(response => {
                setRelatedQuestions(response.data);
                
            }).catch(error => {
                console.log(error);
            });
    },[]);
    
    return (
        <div className="container">
            <div className="box">
                <h1 className="title">質問概要</h1>
                <div className="question">
                    <Parameters 
                        category={ question.category }
                        topic={ question.topic }
                        curriculum_number={ question.curriculum_number }
                    />
                
                    <div className="wrapper">
                        <div className="cards">
                            <Question 
                                count={ images.filter(v=>v).length }
                                image={ images }
                                updated_at={ question.updated_at }
                                question={ question.question }
                            />
                            
                            <Comment 
                                comment={ question.comment }
                            />
                            
                            <div className="realated_documents_wrap">
                                <h1 className="title">参考記事</h1>
                                <Documents 
                                    documents={ documents }
                                />
                            </div>
                        </div>
                
                        <RelatedQuestions 
                            relatedQuestions={ relatedQuestions }
                        />
                        
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default Show;

if (document.getElementById('Public_Show')) {
    ReactDOM.render(<Show />, document.getElementById('Public_Show'));
}

