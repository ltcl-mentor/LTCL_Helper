import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Questions from './questions';
import Documents from './documents';

function Link() {
    const [value, setValue] = React.useState(0);
    const curriculumTopics = [
        {"id": 0, "topic": "AWS"},
        {"id": 1, "topic": "HTML"},
        {"id": 2, "topic": "CSS"},
        {"id": 3, "topic": "JavaScript"},
        {"id": 4, "topic": "サーバー"},
        {"id": 5, "topic": "PHP"},
        {"id": 6, "topic": "Laravel"},
        {"id": 7, "topic": "DB"},
        {"id": 8, "topic": "Git&GitHub"}
    ];
    const portfolioTopics = [
        {"id": 9, "topic": "マイグレーション"},
        {"id": 10, "topic": "リレーション"},
        {"id": 11, "topic": "Laravel拡張"},
        {"id": 12, "topic": "画像処理"},
        {"id": 13, "topic": "Heroku環境"},
        {"id": 14, "topic": "API"},
        {"id": 15, "topic": "デザイン"},
    ];

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    let tab_content;
    if (value === 0) {
        tab_content = ( <Questions topics={ curriculumTopics } /> );
    } else if (value === 1 ) {
        tab_content = ( <Questions topics={ portfolioTopics } /> );
    } else {
        tab_content = ( <Documents /> );
    }
    
    return (
        <Box sx={{ width: '95%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={ value } onChange={ handleChange } aria-label="basic tabs example">
                    <Tab label="質問から紐付け(カリキュラム)" />
                    <Tab label="質問から紐付け（成果物）" />
                    <Tab label="記事から紐付け" />
                </Tabs>
            </Box>
            { tab_content }
        </Box>
    );
}

export default Link;

if (document.getElementById('Link')) {
    ReactDOM.render(<Link />, document.getElementById('Link'));
}
