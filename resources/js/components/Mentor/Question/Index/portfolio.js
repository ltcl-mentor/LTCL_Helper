import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Link} from 'react-router-dom';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';

function Portfolio() {
    const [questions, setQuestions] = useState([]);
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
    
    useEffect(() => {
        axios
            .get("/react/portfolio/questions")
            .then(response => {
                setQuestions(response.data);
            }).catch(error => {
                console.log(error);
            });
    }, []);
    
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
                        <Typography sx={{ color: 'text.secondary' }}>公開：{ questions.filter(question => question.topic == topic.id && question.check === 1).length }、非公開：{ questions.filter(question => question.topic == topic.id && question.check === 0).length }</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            { questions.map((question) => {
                                if (question.topic === topic.id) {
                                    if (question.check === 1) {
                                        return <div className="question">・<Link to={ `/questions/` + question.id }>{ question.question }</Link></div>;
                                    } else {
                                        return <div className="question">・（非公開）<Link to={ `/questions/` + question.id }>{ question.question }</Link></div>;
                                    }
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
