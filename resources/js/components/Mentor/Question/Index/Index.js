import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Curriculum from './curriculum';
import Portfolio from './portfolio';

import Alert from '../../../Alert';
import Breadcrumbs from '../../../Breadcrumbs';

function Index() {
    const parameter = useLocation();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    let tab_content;
    if (value === 0) {
        tab_content = ( <Curriculum /> );
    } else {
        tab_content = ( <Portfolio /> );
    }
    
    return (
        <div class="container">
            <Alert
                type="question"
                status={ parameter.state && parameter.state.question }
                info={ parameter.state && parameter.state.number }
            />
            
            <Breadcrumbs page="mentor_question_index"/>
            
            <Box sx={{ width: '95%', marginTop: 3 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={ value } onChange={ handleChange } aria-label="basic tabs example">
                        <Tab label="カリキュラム" />
                        <Tab label="成果物" />
                    </Tabs>
                </Box>
                { tab_content }
            </Box>
        </div>
    );
}

export default Index;
