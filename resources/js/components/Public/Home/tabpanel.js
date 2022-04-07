import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {useMountedState} from 'react-use';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Top from './Top/top';
import QA from './Q&A/qa';

const a11yProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};


/**
 * タブパネル
 */
const TabPanel = () => {
    const isMounted = useMountedState();
    const history = useHistory();
    const search = useLocation().search.split('=')[1];
    const [value, setValue] = useState(0);
    
    let component;
    if (value == 0) {
        component = <Top />;
    } else {
        component = <QA />;
    }
    
    // タブ切り替え用
    const handleChange = (event, newValue) => {
        if (newValue == 0) {
            history.push('/?page=top');
        } else {
            history.push('/?page=qa');
        }
    };
    
    useEffect(() => {
        if (isMounted()) {
            if (typeof search == 'undefined') {
                setValue(0);
            } else {
                if (search == "top") {
                    setValue(0);
                } else if (search == "qa") {
                    setValue(1);
                }
            }
        }
    }, [search]);
    
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'white', paddingLeft: 10 }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                >
                    <Tab label="Top" {...a11yProps(0)} sx={{ fontSize: 24 }} />
                    <Tab label="Q&A" {...a11yProps(1)} sx={{ fontSize: 24 }} />
                </Tabs>
            </Box>
            {component}
        </Box>
    );
};

export default TabPanel;
