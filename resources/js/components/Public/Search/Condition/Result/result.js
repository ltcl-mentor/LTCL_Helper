import React from 'react';
import Questions from './questions';

function Result(props) {
    
    let results;
    if (props.isSearchButtonClicked) {
        results = (
            <div>
                <Questions
                    category={ props.category }
                    topic={ props.topic }
                    categories={ props.categories }
                    topics={ props.topics }
                    curriculum_number={ props.curriculum_number }
                    keyword={ props.keyword }
                />
            </div>
        );
    } else {
        results = ('');
    }
    
    return (
        <div>
           { results } 
        </div>
    );
}

export default Result;
