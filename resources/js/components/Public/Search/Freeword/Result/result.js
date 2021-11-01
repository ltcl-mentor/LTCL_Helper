import React from 'react';
import Questions from './questions';

function Result(props) {
    
    
    return (
        <div className="container">
           <div className="box">
                <div className="space"></div>
                <div className="result_box">
                    <Questions
                        searchType={ props.searchType }
                        freeword={ props.freeword }
                    />
                </div>
            </div> 
        </div>
    );
}

export default Result;
