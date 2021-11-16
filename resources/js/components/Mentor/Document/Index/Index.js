import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import axios from "axios";
import {Link} from 'react-router-dom';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@mui/material/Chip';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@material-ui/core/Box';

function Document() {
    const parameter = useLocation().search.substr(1).split('=');
    const [documents, setDocuments] = useState([]);
    const [staffs, setStaffs] = useState([]);
    const [expanded, setExpanded] = React.useState(false);
    
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
    
    const document = staffs.map((staff) => {
        return (
            <Accordion expanded={ expanded === staff.id } onChange={ handleChange(staff.id) }>
                <AccordionSummary
                    expandIcon={ <ExpandMoreIcon /> }
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        { staff.name }
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{ documents.filter(document => document.user_id == staff.id).length }件</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        { documents.map((document) => {
                        if (document.user_id === staff.id) {
                                return (
                                    <div className="document">
                                        ・<Link to={ `/documents/` + document.id }>{ document.title }</Link><br/>
                                        { document.beginner === 1 ? <Chip variant="outlined" color="success" label="初心者向け" /> : "" }
                                        { document.amature === 1 ? <Chip variant="outlined" color="primary" label="中級者向け" /> : "" }
                                        { document.master === 1 ? <Chip variant="outlined" color="secondary" label="上級者向け" /> : "" }
                                        { document.all === 1 ? <Chip variant="outlined" color="error" label="全員向け" /> : "" }
                                    </div>
                                );
                            }
                        })}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        );
    });
    
    let success_message;
    if (parameter[0] === "document") {
        if (parameter[1] === "success") {
            success_message = (
                <Alert
                variant="outlined"
                    severity="success"
                    sx={{
                        margin: "0 auto",
                        width: "70%",
                    }}
                >
                    <AlertTitle>Success</AlertTitle>
                    質問の投稿に成功しました。
                </Alert>
            );
        }
    }
    
    return (
        <div className="container">
            <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 4 }}>
                <Link underline="hover" to="/">
                    HOME
                </Link>
                
                <Link underline="hover" to="/mentor/top">
                    メンタートップ
                </Link>
                
                <Typography color="text.primary">
                    記事一覧
                </Typography>
            </Breadcrumbs>
            
            { success_message }
            
            <Box sx={{ marginTop: 3 }}>
                { document }
            </Box>
        </div>
    );
}

export default Document;
