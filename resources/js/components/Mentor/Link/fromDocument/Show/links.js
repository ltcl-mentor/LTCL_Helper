import React, {useState, useEffect} from 'react';
import axios from "axios";
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SaveIcon from '@material-ui/icons/Save';

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

function Link(props) {
    const [checked, setChecked] = useState([]);
    const [related_questions, setRelatedQuestions] = useState([]);
    const [default_related_questions, setDefaultRelatedQuestions] = useState([]);
    const [unrelated_questions, setUnrelatedQuestions] = useState([]);
    const [default_unrelated_questions, setDefaultUnrelatedQuestions] = useState([]);
    const upChecked = intersection(checked, related_questions);
    const downChecked = intersection(checked, unrelated_questions);
    const [expanded, setExpanded] = useState(false);
    const [whitchAccordion, setWhitchAccordion] = useState('');
    const topics = [
        {"id": 0, "topic": "AWS"},
        {"id": 1, "topic": "HTML"},
        {"id": 2, "topic": "CSS"},
        {"id": 3, "topic": "JavaScript"},
        {"id": 4, "topic": "サーバー"},
        {"id": 5, "topic": "PHP"},
        {"id": 6, "topic": "Laravel"},
        {"id": 7, "topic": "DB"},
        {"id": 8, "topic": "Git&GitHub"},
        {"id": 9, "topic": "マイグレーション"},
        {"id": 10, "topic": "リレーション"},
        {"id": 11, "topic": "Laravel拡張"},
        {"id": 12, "topic": "画像処理"},
        {"id": 13, "topic": "Heroku環境"},
        {"id": 14, "topic": "API"},
        {"id": 15, "topic": "デザイン"},
    ];
    
    useEffect(() => {
        axios
            .get(`/react/questions/${ props.id }`)
            .then(response => {
                setRelatedQuestions(response.data.related_questions);
                setUnrelatedQuestions(response.data.unrelated_questions);
                setDefaultRelatedQuestions(response.data.related_questions);
                setDefaultUnrelatedQuestions(response.data.unrelated_questions);
            }).catch(error => {
                console.log(error);
            });
    }, []);
    
    useEffect(() => {
        let attach_id = [];
        let detach_id = [];
        
        related_questions.map((question) => {
            attach_id.push(question.id);
        });
        unrelated_questions.map((question) => {
            detach_id.push(question.id);
        });
        
        props.setAttachId(attach_id);
        props.setDetachId(detach_id);
    }, [related_questions, unrelated_questions]);
    
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };
    
    const handleAllDown = () => {
        setUnrelatedQuestions(unrelated_questions.concat(related_questions));
        setRelatedQuestions([]);
    };
    
    const handleCheckedDown = () => {
        setUnrelatedQuestions(unrelated_questions.concat(upChecked));
        setRelatedQuestions(not(related_questions, upChecked));
        setChecked(not(checked, upChecked));
    };
    
    const handleCheckedUp = () => {
        setRelatedQuestions(related_questions.concat(downChecked));
        setUnrelatedQuestions(not(unrelated_questions, downChecked));
        setChecked(not(checked, downChecked));
    };
    
    const handleAllUp = () => {
        setRelatedQuestions(related_questions.concat(unrelated_questions));
        setUnrelatedQuestions([]);
    };
    
    const handleChange = (panel, upOrDown) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        setWhitchAccordion(upOrDown);
    };
    
    const handleReset = () => {
        setRelatedQuestions(default_related_questions);
        setUnrelatedQuestions(default_unrelated_questions);
    };
    
    const customList = (questions, upOrDown) => (
        <Paper
            sx={{
                width: "90%",
                height: 500,
                overflow: 'auto',
                marginLeft: "5%",
                marginBottom: 1,
            }}
        >
            <Typography
                variant="h6"
                align="center"
                component="div"
                sx={{
                    marginTop: 2,
                    marginBottom: 2,
                }}
            >
                { upOrDown === "up" ? "関連質問に設定中" : "関連質問に未設定" }
            </Typography>
            
            { topics.map((topic) => {
                return (
                    <Accordion
                        expanded={ expanded === topic.id && upOrDown === whitchAccordion }
                        onChange={ handleChange(topic.id, upOrDown) }
                    >
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
                            <List dense component="div" role="list">
                                { questions.map((question) => {
                                    const labelId = `transfer-list-item-${ question.id }-label`;
                                    
                                    if (question.topic === topic.id) {
                                        return (
                                            <ListItem
                                                key={ question.id }
                                                role="listitem"
                                                button
                                                onClick={ handleToggle(question) }
                                            >
                                                <ListItemIcon>
                                                    <Checkbox
                                                        checked={ checked.indexOf(question) !== -1 }
                                                        tabIndex={-1}
                                                        disableRipple
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText id={ labelId } primary={ question.question } />
                                            </ListItem>
                                        );
                                    }
                                })}
                            </List>
                        </AccordionDetails>
                    </Accordion>
                );
            })}
        </Paper>
    );
    
    return (
        <Box sx={{ marginTop: 4 }}>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item sx={{ width: "100%" }}>{customList(related_questions, "up")}</Grid>
                
                <Grid item sx={{ width: "100%" }}>
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item sx={{ width: "100%" }}>
                            <Grid container spacing={2} justifyContent="center" alignItems="center">
                                <Grid item>
                                    <Button
                                        sx={{ my: 0.5 }}
                                        variant="outlined"
                                        size="small"
                                        onClick={ handleAllDown }
                                        disabled={ related_questions.length === 0 }
                                        aria-label="move all right"
                                    >
                                        <ArrowDownwardIcon />全移動
                                    </Button>
                                </Grid>
                                
                                <Grid item>
                                    <Button
                                        sx={{ my: 0.5 }}
                                        variant="outlined"
                                        size="small"
                                        onClick={ handleCheckedDown }
                                        disabled={ upChecked.length === 0 }
                                        aria-label="move selected right"
                                    >
                                        <KeyboardArrowDownIcon />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        
                        <Grid item>
                            <Button
                                sx={{ my: 0.5 }}
                                variant="contained"
                                onClick={ handleReset }
                                disabled={ default_related_questions === related_questions && default_unrelated_questions === unrelated_questions }
                                aria-label="reset"
                            >
                                リセットする
                            </Button>
                        </Grid>
                        
                        <Grid item>
                            <Button
                                sx={{ my: 0.5 }}
                                variant="contained"
                                onClick={ handleReset }
                                aria-label="reset"
                                disabled={ !(upChecked.length === 0 && downChecked.length === 0) }
                                onClick={ props.handleSubmit }
                                startIcon={ <SaveIcon /> }
                            >
                                設定する
                            </Button>
                        </Grid>
                        
                        <Grid item sx={{ width: "100%" }}>
                            <Grid container spacing={2} justifyContent="center" alignItems="center">
                                <Grid item>
                                    <Button
                                        sx={{ my: 0.5 }}
                                        variant="outlined"
                                        size="small"
                                        onClick={ handleCheckedUp }
                                        disabled={ downChecked.length === 0 }
                                        aria-label="move selected left"
                                    >
                                        <KeyboardArrowUpIcon />
                                    </Button>
                                </Grid>
                                
                                <Grid item>
                                    <Button
                                        sx={{ my: 0.5 }}
                                        variant="outlined"
                                        size="small"
                                        onClick={ handleAllUp }
                                        disabled={ unrelated_questions.length === 0 }
                                        aria-label="move all left"
                                    >
                                        <ArrowUpwardIcon />全移動
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                
                <Grid item sx={{ width: "100%", marginBottom: 5 }}>{customList(unrelated_questions, "down")}</Grid>
            </Grid>
        </Box>
    );
}

export default Link;