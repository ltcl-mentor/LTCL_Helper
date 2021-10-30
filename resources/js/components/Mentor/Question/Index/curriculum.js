import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Link} from 'react-router-dom';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function Curriculum() {
    const [questions, setQuestions] = useState([]);
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
    
    useEffect(() => {
        axios
            .get("/react/curriculum/questions")
            .then(response => {
                setQuestions(response.data);
            }).catch(error => {
                console.log(error);
            });
    }, []);
    
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    
    const curriculum = curriculum_topics.map((topic) => {
        return (
            <div className="content">
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
                                    if (question.check === true) {
                                        return <div className="question">・<Link to={ `/questions/` + question.id }>{ question.question }</Link></div>;
                                    } else {
                                        return <div className="question">・（非公開）<Link to={ `/questions/` + question.id }>{ question.question }</Link></div>;
                                    }
                                }
                            })}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        );
    });
    
    return (
        <div className="container">
            { curriculum }
        </div>
    );
}

export default Curriculum;
