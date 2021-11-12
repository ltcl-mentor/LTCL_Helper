import React, {useState} from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import {Link} from 'react-router-dom';

function Portfolio(props) {
    const portfolio_topics = [
        {"id": 9, "topic": "マイグレーション"},
        {"id": 10, "topic": "リレーション"},
        {"id": 11, "topic": "Laravel拡張"},
        {"id": 12, "topic": "画像処理"},
        {"id": 13, "topic": "Heroku環境"},
        {"id": 14, "topic": "API"},
        {"id": 15, "topic": "デザイン"},
    ];
    const [expanded, setExpanded] = React.useState(false);
    
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    
    const portfolio = portfolio_topics.map((topic) => {
        return (
            <Box sx={{paddingTop: 3, marginBottom: 3}}>
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
                        <Typography>
                            { props.questions.map((question) => {
                                if (question.topic === topic.id) {
                                    return <div className="question">・<Link to={ `/public/questions/` + question.id }>{ question.question }</Link></div>;
                                }
                            })}
                        </Typography>
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
