import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useLocation} from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import Alert from '../../../../Alert';
import Breadcrumbs from '../../../../Breadcrumbs';
import Curriculum from './curriculum';
import Portfolio from './portfolio';

/**
 * 質問一覧(管理画面)のメインコンポーネント
 */
function Index() {
    const parameter = useLocation();
    const [value, setValue] = useState(0);
    const [curriculum_questions, setCurriculumQuestions] = useState([]);
    const [portfolio_questions, setPortfolioQuestions] = useState([]);
    
    // 画面描画時に実行
    useEffect(() => {
        // カリキュラム関連の質問取得
        axios
            .get("/react/questions/curriculum")
            .then(response => {
                setCurriculumQuestions(response.data);
            }).catch(error => {
                console.log(error);
            });
        
        // 成果物関連の質問取得
        axios
            .get("/react/questions/portfolio")
            .then(response => {
                setPortfolioQuestions(response.data);
            }).catch(error => {
                console.log(error);
            });
    }, []);
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    return (
        <div className="container">
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
                
                { value === 0 ? <Curriculum questions={ curriculum_questions }/> : <Portfolio questions={ portfolio_questions }/> }
            </Box>
        </div>
    );
}

export default Index;
