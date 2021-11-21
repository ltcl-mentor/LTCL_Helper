import React, {useState} from 'react';

import Breadcrumbs from '../../../Breadcrumbs';
import Form from './form';
import Result from './Result/result';

function Freeword() {
    const [searchType, setSearchType] = useState('OR');
    const [freeword, setFreeword] = useState('');
    
    return (
        <div className="container">
            <Breadcrumbs page="freeword"/>
            
            <Form
                searchType={ searchType }
                setSearchType={ setSearchType }
                setFreeword={ setFreeword }
            />
            
            <Result 
                searchType={ searchType }
                freeword={ freeword }
            />
        </div>
    );
}

export default Freeword;