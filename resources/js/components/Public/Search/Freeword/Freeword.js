import React, {useState} from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Typography from '@material-ui/core/Typography';

import Form from './form';
import Result from './Result/result';

function Freeword() {
    const [searchType, setSearchType] = useState('OR');
    const [freeword, setFreeword] = useState('');
    
    return (
        <div className="container">
            <Typography align="center" variant="h3" component="div" >
                フリーワード検索
            </Typography>
            
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