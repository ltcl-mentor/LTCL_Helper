import React, {useState, useEffect} from 'react';
import axios from "axios";
import Parameters from '../../../../Public/Question/Show/parameters';
import Question from '../../../../Public/Question/Show/question';
import Comment from '../../../../Public/Question/Show/comment';
import Documents from '../../../../Public/Question/Show/documents';
import RelatedQuestions from '../../../../Public/Question/Show/related-questions';

function Preview(props) {
    const [relatedQuestions, setRelatedQuestions] = useState([]);
    
    useEffect(() => {
        axios
            .get(`/react/search/questions?category=${ props.question.category }&topic=${ props.question.topic }`)
            .then(response => {
                setRelatedQuestions(response.data);
                
            }).catch(error => {
                console.log(error);
            });
    },[]);
    
    return (
        <div className="box">
            <h1 className="title">質問概要</h1>
            <div className="question">
                <Parameters 
                    category={ props.question.category }
                    topic={ props.question.topic }
                    curriculum_number={ props.question.curriculum_number }
                />
                
                <div className="wrapper">
                    <div className="cards">
                        <Question 
                            count={ props.images.filter(v=>v).length }
                            image={ props.images }
                            updated_at={ props.question.updated_at }
                            question={ props.question.question }
                        />
                        
                        <Comment 
                            comment={ props.question.comment }
                        />
                            
                        <div className="realated_documents_wrap">
                            <h1 className="title">参考記事</h1>
                            <Documents 
                                documents={ props.documents }
                            />
                        </div>
                    </div>
                
                    <RelatedQuestions 
                        relatedQuestions={ relatedQuestions }
                    />
                </div>
            </div>
        </div>
    );
}

export default Preview;
