import React, {useState} from 'react';

import Breadcrumbs from '../../../Breadcrumbs';
import Form from './form';
import Result from './Result/result';

/**
 * フリーワード検索のメインコンポーネント
 */
function Freeword() {
    const [searchType, setSearchType] = useState('OR');
    const [freeword, setFreeword] = useState('');
    
    return (
        <div className="container">
            {/* パンくずリスト */}
            <Breadcrumbs page="freeword"/>
            
            {/* 検索内容の入力部分 */}
            <Form
                searchType={ searchType }
                setSearchType={ setSearchType }
                setFreeword={ setFreeword }
            />
            
            {/* 検索結果 */}
            <Result 
                searchType={ searchType }
                freeword={ freeword }
            />
        </div>
    );
}

export default Freeword;