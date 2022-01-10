import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Link, useLocation} from 'react-router-dom';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@mui/material/Chip';
import Box from '@material-ui/core/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import Alert from '../../../Alert';
import Breadcrumbs from '../../../Breadcrumbs';

/**
 * 関連記事一覧(管理画面)のメインコンポーネント
 */
function Document() {
    const parameter = useLocation();
    const [documents, setDocuments] = useState([]);
    const [staffs, setStaffs] = useState([]);
    const [expanded, setExpanded] = React.useState(false);
    
    // 画面描画時に実行
    useEffect(() => {
        // 記事一覧取得
        axios
            .get("/react/documents/all")
            .then(response => {
                setDocuments(response.data);
            }).catch(error => {
                console.log(error);
            });
        
        // 管理者一覧取得
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
            <Accordion expanded={ expanded === staff.id } onChange={ handleChange(staff.id) } sx={{ marginBottom: 3 }}>
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
                    <List>
                        { documents.map((document) => {
                        if (document.user_id === staff.id) {
                                return (
                                    <ListItem
                                        key={ document.id }
                                        role="listitem"
                                        button
                                    >
                                        <Link to={ `/documents/` + document.id }>
                                            <ListItemText primary={ document.title } />
                                        </Link>
                                        { document.beginner === 1 ? <Chip variant="outlined" color="success" label="初心者向け" /> : "" }
                                        { document.amature === 1 ? <Chip variant="outlined" color="primary" label="中級者向け" /> : "" }
                                        { document.master === 1 ? <Chip variant="outlined" color="secondary" label="上級者向け" /> : "" }
                                        { document.all === 1 ? <Chip variant="outlined" color="error" label="全員向け" /> : "" }
                                    </ListItem>
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
            <Alert
                type="document"
                status={ parameter.state && parameter.state.document }
                info={ parameter.state && parameter.state.number }
            />
            
            <Breadcrumbs page="mentor_document_index"/>
            
            <Box sx={{ marginTop: 3 }}>
                { document }
            </Box>
        </div>
    );
}

export default Document;
