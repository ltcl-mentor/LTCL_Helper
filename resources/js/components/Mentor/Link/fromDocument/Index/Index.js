import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Documents from './documents';

function Index() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    return (
        <div class="container">
            <Box sx={{ width: '95%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={ value } onChange={ handleChange } aria-label="basic tabs example">
                        <Tab label="初心者向け" />
                        <Tab label="中級者向け" />
                        <Tab label="上級者向け" />
                        <Tab label="全員向け" />
                    </Tabs>
                </Box>
                <Documents target={ value } />
            </Box>
        </div>
    );
}

export default Index;
