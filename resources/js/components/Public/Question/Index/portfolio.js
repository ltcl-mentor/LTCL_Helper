import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

/**
 * 成果物の質問一覧
 */
function Portfolio(props) {
    const [expanded, setExpanded] = useState(false);
    const portfolio_topics = [
        {"id": 14, "topic": "認証・認可機能(成果物)"},
        {"id": 15, "topic": "API(成果物)"},
        {"id": 16, "topic": "画像処理"},
        {"id": 17, "topic": "Heroku環境"},
        {"id": 18, "topic": "デザイン"},
        {"id": 19, "topic": "その他(成果物)"},
    ];
    
    
    // アコーディオンの開閉
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    
    // アコーディオン
    const portfolio = portfolio_topics.map((topic) => {
        return (
            <Box sx={{paddingTop: 3, marginBottom: 3}} key={topic.topic}>
                <Accordion expanded={ expanded === topic.id } onChange={ handleChange(topic.id) }>
                    <AccordionSummary
                        expandIcon={ <ExpandMoreIcon /> }
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            { topic.topic }
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>{ props.questions.filter(question => question.topic == topic.id).length }件</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            { props.questions.map((question) => {
                                if (question.topic === topic.id) {
                                    return (
                                        <Link to={ `/public/questions/` + question.id } key={question.title}>
                                            <ListItem
                                                key={ question.id }
                                                role="listitem"
                                                button
                                            >
                                                <ListItemText primary={ question.title } />
                                            </ListItem>
                                        </Link>
                                    );
                                }
                            })}
                        </List>
                    </AccordionDetails>
                </Accordion>
            </Box>
        );
    });

    
    return (
        <div className="container">
            { portfolio }
        </div>
    );
}

export default Portfolio;
