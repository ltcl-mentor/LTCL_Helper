import React from 'react';
import Questions from './questions';

function Result(props) {
    
    let results;
    if(props.isSearchButtonClicked){
        results = (
            <div className="box">
                <div className="empty">
                    <div className="space"></div>
                    <div className="circle1"></div>
                    <div className="circle2"></div>
                    <div className="circle3"></div>
                </div>
                <div className="result_box">
                    <Questions
                        category={ props.category }
                        topic={ props.topic }
                        categories={ props.categories }
                        topics={ props.topics }
                        curriculum_number={ props.curriculum_number }
                        keyword={ props.keyword }
                    />
                </div>
            </div>
        );
    }else{
        results = ('');
    }
    
    return (
        <div className="container">
           { results } 
        </div>
    );
}

export default Result;
