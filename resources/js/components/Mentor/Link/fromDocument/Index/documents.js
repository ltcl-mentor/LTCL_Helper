import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Link} from 'react-router-dom';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function Documents(props) {
    const [documents, setDocuments] = useState([]);
    const [staffs, setStaffs] = useState([]);
    const [expanded, setExpanded] = React.useState(false);
    const targets = ["beginner", "amature", "master"];
    
    console.log(targets[props.target]);
    
    useEffect(() => {
        axios
            .get("/react/all/documents")
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
            <div className="content">
                <Accordion expanded={ expanded === staff.id } onChange={ handleChange(staff.id) }>
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
                        <Typography>
                            { documents.map((document) => {
                                if (document.user_id === staff.id) {
                                    switch(props.target) {
                                        case 0:
                                            if (document.beginner) {
                                                return <div  className="document">・<Link to={ `/links/document/`+document.id }>{ document.title }</Link></div>;
                                            }
                                            break;
                                        case 1:
                                            if (document.amature) {
                                                return <div  className="document">・<Link to={ `/links/document/`+document.id }>{ document.title }</Link></div>;
                                            }
                                            break;
                                        case 2:
                                            if (document.master) {
                                                return <div  className="document">・<Link to={ `/links/document/`+document.id }>{ document.title }</Link></div>;
                                            }
                                            break;
                                        case 3:
                                            if (document.all) {
                                                return <div  className="document">・<Link to={ `/links/document/`+document.id }>{ document.title }</Link></div>;
                                            }
                                            break;
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
            { list }
        </div>
    );
}

export default Documents;
