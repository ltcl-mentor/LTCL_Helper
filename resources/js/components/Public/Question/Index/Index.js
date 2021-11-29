import React, {useState, useEffect} from 'react';
import axios from "axios";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import Breadcrumbs from '../../../Breadcrumbs';
import Curriculum from './curriculum';
import Portfolio from './portfolio';

/*
 * 質問一覧(公開)のメインコンポーネント
 */
function Index() {
    const [questions, setQuestions] = useState([]);
    const [value, setValue] = React.useState(0);
    
    //画面描画時に実行
    useEffect(() => {
        axios
            .get("/react/checked/questions")
            .then(response => {
                setQuestions(response.data);
            }).catch(error => {
                console.log(error);
            });
    }, []);
    
    
    // タブの切り替え
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    
    let tab_content;
    // カリキュラムの一覧
    if (value === 0) {
        tab_content = ( <Curriculum questions={ questions }/> );
    
    //成果物の一覧
    } else {
        tab_content = ( <Portfolio questions={ questions }/> );
    }
    
    return (
        <div className="container">
            <Breadcrumbs page="public_question_index"/>
            
            <Box sx={{ width: '95%' }}>
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
