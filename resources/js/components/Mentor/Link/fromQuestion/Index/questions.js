import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Link} from 'react-router-dom';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

/**
 * 質問一覧
 */
function Questions(props) {
    const [questions, setQuestions] = useState([]);
    const [expanded, setExpanded] = React.useState(false);
    
    // 画面描画時に実行
    useEffect(() => {
        // 質問全件取得
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
            <Accordion expanded={ expanded === topic.id } onChange={handleChange(topic.id)} sx={{ marginTop: 3 }} key={topic.topic}>
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
                    <List>
                        { questions.map((question) => {
                            if (question.topic === topic.id) {
                                return (
                                    <Link to={ `/links/question/` + question.id } key={question.id}>
                                        <ListItem
                                            key={ question.id }
                                            role="listitem"
                                            button
                                        >
                                            <ListItemText primary={ question.question } />
                                        </ListItem>
                                    </Link>
                                );
                            }
                        })}
                    </List>
                </AccordionDetails>
            </Accordion>
        );
    });
    
    return (
        <div className="container">
            { question }
        </div>
    );
}

export default Questions;
