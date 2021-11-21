import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Curriculum from './curriculum';
import Portfolio from './portfolio';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@material-ui/core/Typography';

function Index() {
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
            <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 4 }}>
                <Link underline="hover" to="/">
                    HOME
                </Link>
                
                <Link underline="hover" to="/mentor/top">
                    メンタートップ
                </Link>
                
                <Typography color="text.primary">
                    質問一覧
                </Typography>
            </Breadcrumbs>
            
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
