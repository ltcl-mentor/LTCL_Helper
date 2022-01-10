import React, {useEffect} from 'react';
import CurriculumNumber from './curriculum-number/curriculum-number';
import Keyword from './keyword';

/**
 * カテゴリーとトピックの選択以外の追加条件の表示
 */
function Addition(props) {
    
    // 画面描画時に実行
    useEffect(() => {
        props.setIsCanceling(false);
    }, []);
    
    return(
        <div className="container">
            {/* カリキュラム番号 */}
            <CurriculumNumber 
                category={ props.category }
                topic={ props.topic }
                setCurriculumNumber={ props.setCurriculumNumber }
                isCanceling={ props.isCanceling }
            />
            
            {/* キーワード */}
            <Keyword
                setKeyword={ props.setKeyword }
                isCanceling={ props.isCanceling }
            />
        </div>
    );
}

export default Addition;
