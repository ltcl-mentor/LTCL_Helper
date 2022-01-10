import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useLocation} from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import Alert from '../../../../Alert';
import Breadcrumbs from '../../../../Breadcrumbs';
import Curriculum from '../Index/curriculum';
import Portfolio from '../Index/portfolio';

/**
 * 受講生からのコメント待ち質問の一覧のメインコンポーネント
 */
function Student() {
    const parameter = useLocation();
    const [value, setValue] = useState(0);
    const [curriculum_questions, setCurriculumQuestions] = useState([]);
    const [portfolio_questions, setPortfolioQuestions] = useState([]);
    
    // 画面描画時に実行
    useEffect(() => {
        // カリキュラム関連で該当する質問取得
        axios
            .get("/react/questions/student_yet/0")
            .then(response => {
                setCurriculumQuestions(response.data);
            }).catch(error => {
                console.log(error);
            });
        
        // 成果物関連で該当する質問取得
        axios
            .get("/react/questions/student_yet/1")
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
        <div class="container">
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

export default Student;