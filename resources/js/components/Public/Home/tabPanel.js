import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useMountedState } from 'react-use';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Top from './Top/Top';
import QA from './Q&A/QA';
import Manage from './Manage/manage';
import { LoginUser } from '../../Route';

const a11yProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};

// タブのスタイル設定
const tabWidth = { width: '100%' };
const tabFontSize = { fontSize: 24 };
const tabPosition = { 
    borderBottom: 1,
    borderColor:
    'white',
    pl: '10%'
};

/**
 * タブパネル
 */
const tabPanel = () => {
    const isMounted = useMountedState();
    const user = useContext(LoginUser);
    const history = useHistory();
    const search = useLocation().search.split('=')[1]; // URLからコンポーネント判断
    const [value, setValue] = useState(0);  // タブ切り替え時の状態保持

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

    // クエリパラメータの値によるコンポーネントの切り替え
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
        <Box sx={tabWidth}>
            <Box sx={tabPosition}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                >
                    <Tab label="Top" {...a11yProps(0)} sx={tabFontSize} />
                    <Tab label="Q&A" {...a11yProps(1)} sx={tabFontSize} />
                    {user.is_admin == 'staff' &&
                    <Tab label="管理" {...a11yProps(2)} sx={tabFontSize} />
                    }
                </Tabs>
            </Box>
            {component}
        </Box>
    );
};

export default tabPanel;