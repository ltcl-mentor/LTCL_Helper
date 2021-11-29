import React from 'react';
import Questions from './questions';

/*
 * 絞り込み検索の検索結果表示
 */
function Result(props) {
    
    let results;
    // 検索ボタンがクリックされており、検索条件も変更がない場合
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
