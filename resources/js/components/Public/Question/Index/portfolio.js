import React, {useState} from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function Portfolio(props) {
    const portfolio_topics = [
        {"id":9, "topic":"マイグレーション"},
        {"id":10, "topic":"リレーション"},
        {"id":11, "topic":"Laravel拡張"},
        {"id":12, "topic":"画像処理"},
        {"id":13, "topic":"Heroku環境"},
        {"id":14, "topic":"API"},
        {"id":15, "topic":"デザイン"},
    ];
    const [expanded, setExpanded] = React.useState(false);
    
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    
    const portfolio = portfolio_topics.map((topic) => {
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
                        <Typography sx={{ color: 'text.secondary' }}>{ props.questions.filter(question => question.topic == topic.id).length }件</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            { props.questions.map((question) => {
                                if(question.topic === topic.id){
                                    if(question.check === 1){
                                        return <div className="question">・<a href={`/questions/`+question.id}>{ question.question }</a></div>;
                                    }else{
                                        return <div className="question">・（非公開）<a href={`/questions/`+question.id}>{ question.question }</a></div>;
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
            { portfolio }
        </div>
    );
}

export default Portfolio;
