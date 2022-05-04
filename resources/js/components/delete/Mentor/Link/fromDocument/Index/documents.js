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

function Documents(props) {
    const [documents, setDocuments] = useState([]);
    const [staffs, setStaffs] = useState([]);
    const [expanded, setExpanded] = useState(false);
    
    useEffect(() => {
        axios
            .get("/react/documents/all")
            .then(response => {
                setDocuments(response.data);
            }).catch(error => {
                console.log(error);
            });
        
        axios
            .get("/react/all/staffs")
            .then(response => {
                setStaffs(response.data);
            }).catch(error => {
                console.log(error);
            });
    }, []);
    
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    
    const list = staffs.map((staff) => {
        return (
            <Accordion expanded={ expanded === staff.id } onChange={ handleChange(staff.id) } sx={{ marginTop: 3 }} key={staff.name}>
                <AccordionSummary
                    expandIcon={ <ExpandMoreIcon /> }
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        { staff.name }
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        { props.target === 0 ? documents.filter(document => document.user_id == staff.id && document.beginner).length + `件` : "" }
                        { props.target === 1 ? documents.filter(document => document.user_id == staff.id && document.amature).length + `件` : "" }
                        { props.target === 2 ? documents.filter(document => document.user_id == staff.id && document.master).length + `件` : "" }
                        { props.target === 3 ? documents.filter(document => document.user_id == staff.id && document.all).length + `件` : "" }
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List>
                        { documents.map((document) => {
                            if (document.user_id === staff.id) {
                                const targets = [document.beginner, document.amature, document.master, document.all];
                                
                                if (targets[props.target]) {
                                    return (
                                        <Link to={ `/links/document/` + document.id } key={document.id}>
                                            <ListItem
                                                key={ document.id }
                                                role="listitem"
                                                button
                                            >
                                                <ListItemText primary={ document.title } />
                                            </ListItem>
                                        </Link>
                                    );
                                }
                            }
                        })}
                    </List>
                </AccordionDetails>
            </Accordion>
        );
    });
    
    return (
        <div className="container">
            { list }
        </div>
    );
}

export default Documents;
