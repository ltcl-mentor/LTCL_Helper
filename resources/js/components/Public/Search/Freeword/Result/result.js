import React from 'react';
import Questions from './questions';

/*
 * フリーワード検索の検索結果表示
 */
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
