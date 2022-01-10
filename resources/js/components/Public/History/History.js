import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import Breadcrumbs from '../../Breadcrumbs';

/**
 * 質問閲覧履歴のメインコンポーネント
 */
function History() {
    const [questions, setQuestions] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [two_week_days, setTwoWeekDays] = useState();
    
    // 画面描画時に実行
    useEffect(() => {
        // 直近2週間の日付取得
        const today = new Date();
        var days = [];
        
        for (let day_count = 0; day_count <= 14; day_count++) {
            const day = new Date(today.getFullYear(), today.getMonth(), today.getDate() - day_count);
            days.push(day.getFullYear() + `-` + (day.getMonth() + 1) + `-` + (`0` + day.getDate()).slice(-2));
        }
        
        setTwoWeekDays(days);
    }, []);
    
    // 画面描画時に実行
    useEffect(() => {
        // ログインユーザの質問閲覧履歴取得
        axios
            .get("/react/history")
            .then(response => {
                setQuestions(response.data);
            }).catch(error => {
                console.log(error);
            });
    }, []);
    
    // アコーディオンの開閉
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    
    let histories;
    if (two_week_days) {
        histories = two_week_days.map((day) => {
            return (
                <Accordion expanded={ expanded === day } onChange={ handleChange(day) } sx={{ marginTop: 3, marginBottom: 6 }}>
                    <AccordionSummary
                        expandIcon={ <ExpandMoreIcon /> }
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            { day }
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List dense component="div" role="list">
                            { questions.map((question) => {
                                if (question.whenClicked.substr( 0, 10 ) === day) {
                                    const time = question.whenClicked.substr(11).split('.');
                                    
                                    return (
                                        <Link to={ `/public/questions/` + question.id }>
                                            <ListItem
                                                key={ question.id }
                                                role="listitem"
                                                button
                                            >
                                                <ListItemText primary={ question.question } />
                                                <ListItemText primary={ time[0] } />
                                            </ListItem>
                                        </Link>
                                    );
                                }
                            }) }
                        </List>
                    </AccordionDetails>
                </Accordion>
            );
        });
    }
    
    return (
        <div className="container">
            <Breadcrumbs page="history"/>
            
            {  histories }
        </div>
    );
}

export default History;