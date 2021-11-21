import React from 'react';
import Questions from './questions';

function Result(props) {
    
    
    return (
        <div className="container">
            <Questions
                searchType={ props.searchType }
                freeword={ props.freeword }
            />
        </div>
    );
}

export default Result;
