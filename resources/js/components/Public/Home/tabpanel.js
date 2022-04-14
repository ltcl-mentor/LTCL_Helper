import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {useMountedState} from 'react-use';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Top from './Top/top';
import QA from './Q&A/qa';
import Manage from './Manage/manage';
import { LoginUser } from '../../Route';

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
    const user = useContext(LoginUser);
    const history = useHistory();
    const search = useLocation().search.split('=')[1];
    const [value, setValue] = useState(0);

    let component;
    if (value == 0) {
        component = <Top />;
    } else if (value == 1) {
        component = <QA />;
    } else if (value == 2) {
        component = <Manage />;
    }

    // タブ切り替え用
    const handleChange = (event, newValue) => {
        if (newValue == 0) {
            history.push('/?page=top');
        } else if (newValue == 1) {
            history.push('/?page=qa');
        } else if (newValue == 2) {
            history.push('/?page=manage');
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
                } else if (search == "manage") {
                    setValue(2);
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
                    {user.is_admin == 'staff' &&
                    <Tab label="管理" {...a11yProps(2)} sx={{ fontSize: 24 }} />
                    }
                </Tabs>
            </Box>
            {component}
        </Box>
    );
};

export default TabPanel;
