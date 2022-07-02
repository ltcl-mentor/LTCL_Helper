import React, { useState, useEffect } from 'react';
import { useMountedState } from 'react-use';
import { Inertia } from '@inertiajs/inertia';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Top from './Top/Top';
import QA from './Q&A/QA';
import Manage from './Manage/Manage';

const a11yProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};

// タブのスタイル設定
const styleTabWidth = { width: '100%' };
const styleTabFontSize = { fontSize: 24 };
const styleTabPosition = {
    borderBottom: 1,
    borderColor:
    'white',
    pl: '10%'
};

/**
 * タブパネル
 */
const tabPanel = ({ auth }) => {
    const isMounted = useMountedState();
    const search = window.location.search.split('=')[1]; // URLからコンポーネント判断
    const [value, setValue] = useState(0);  // タブ切り替え時の状態保持

    let component;
    if (value == 0) {
        component = "a";
        // component = <Top />;
    } else if (value == 1) {
        component = "b";
        // component = <QA />;
    } else if (value == 2) {
        component = "c";
        // component = <Manage />;
    }

    // タブ切り替え用
    const handleChange = (event, newValue) => {
        if (newValue == 0) {
            Inertia.get('/?page=top');
        } else if (newValue == 1) {
            Inertia.get('/?page=qa');
        } else if (newValue == 2) {
            Inertia.get('/?page=manage');
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
        <BoxStyled
            width="500px"
            sx={styleTabWidth}>
            <Box sx={styleTabPosition}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                >
                    <Tab label="Top" {...a11yProps(0)} sx={styleTabFontSize} />
                    <Tab label="Q&A" {...a11yProps(1)} sx={styleTabFontSize} />
                    {auth.user.is_admin == 'staff' &&
                        <Tab label="管理" {...a11yProps(2)} sx={styleTabFontSize} />
                    }
                </Tabs>
            </Box>
            {component}
        </BoxStyled>
    );
};

export default tabPanel;

const BoxStyled = styled.div(Box)`
    width: ${props => `clamp(200px, ${props.width}, 700px)`}
`;
