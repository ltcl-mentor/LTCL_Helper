import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import Form from './form';
import Result from './Result/result';

function Freeword() {
    const [searchType, setSearchType] = useState('OR');
    const [freeword, setFreeword] = useState('');
    
    return (
        <div className="container">
            <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 4 }}>
                <Link underline="hover" to="/">
                    HOME
                </Link>
                
                <Typography color="text.primary">
                    フリーワード検索
                </Typography>
            </Breadcrumbs>
            
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