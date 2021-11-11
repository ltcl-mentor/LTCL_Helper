import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Link} from 'react-router-dom';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function Questions(props) {
    const [questions, setQuestions] = useState([]);
    const [expanded, setExpanded] = React.useState(false);
    
    useEffect(() => {
        axios
            .get("/react/all/questions")
            .then(response => {
                setQuestions(response.data);
            }).catch(error => {
                console.log(error);
            });
    }, []);
    
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    
    const question = props.topics.map((topic) => {
        return (
            <div className="content">
                <Accordion expanded={ expanded === topic.id } onChange={handleChange(topic.id)}>
                    <AccordionSummary
                        expandIcon={ <ExpandMoreIcon /> }
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            { topic.topic }
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>{ questions.filter(question => question.topic == topic.id).length }件</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            { questions.map((question) => {
                                if (question.topic === topic.id) {
                                    return <div className="question">・<Link to={ `/questions/`+question.id }>{ question.question }</Link></div>;
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
            { question }
        </div>
    );
}

export default Questions;
