import React, { useState } from 'react';

import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Top from './Top/top';
import QA from './Q&A/qa';

const Panel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

Panel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

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
    const [value, setValue] = useState(1);
    
    // タブ切り替え用
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
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
            <Panel value={value} index={0}>
                <Top />
            </Panel>
            <Panel value={value} index={1}>
                <QA />
            </Panel>
        </Box>
    );
};

export default TabPanel;
