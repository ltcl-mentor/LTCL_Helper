import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';

function Curriculum(props) {
    const curriculum_topics = [
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
    const [expanded, setExpanded] = React.useState(false);
    
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    
    const curriculum = curriculum_topics.map((topic) => {
        return (
            <Box sx={{paddingTop: 3, marginBottom: 3}}>
                <Accordion
                    expanded={ expanded === topic.id }
                    onChange={ handleChange(topic.id) }
                >
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
                                    return <div className="question">・<Link to={ '/public/questions/' + question.id }>{ question.question }</Link></div>;
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
            { curriculum }
        </div>
    );
}

export default Curriculum;
