import React, { useState } from 'react';

import Form from './form/form';
import Result from './result/result';


/**
 * フリーワード検索
 */
const Freeword = (props) => {
    const [searchType, setSearchType] = useState('OR');
    const [freeword, setFreeword] = useState('');
    
    return (
        <React.Fragment>
            <Form
                searchType={ searchType }
                setSearchType={ setSearchType }
                setFreeword={ setFreeword }
                isWide={props.isWide}
            />
            
            {/* 先頭が空白の時(/)に全データを持ってきてしまうため条件に追加 */}
            {(freeword.length > 0 && freeword != "/") &&
                <Result 
                    searchType={ searchType }
                    freeword={ freeword }
                />
            }
        </React.Fragment>
    );
};

export default Freeword;