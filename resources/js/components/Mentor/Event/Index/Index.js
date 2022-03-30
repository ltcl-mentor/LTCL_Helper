import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import Alert from '../../../Alert';
import Breadcrumbs from '../../../Breadcrumbs';

// モーダルのCSS設定
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width:'50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  maxHeight: '80%',
  overflow: 'scroll'
};

/**
 * イベント一覧のメインコンポーネント 
 */
function Index() {
    const history = useHistory();
    const parameter = useLocation();
    const [expanded, setExpanded] = useState(false);
    const [events, setEvents] = useState([]);
    const [open, setOpen] = useState(false);
    const [deleteId, setDeleteId] = useState();
    const [deleteEvent, setDeleteEvent] = useState();
    
    // モーダル開閉
    const handleOpen = () => setOpen(true);
    
    const handleClose = () => setOpen(false);
    
    // 削除実行対象特定
    const handleDeleteTarget = (id, event) => {
        setDeleteId(id);
        setDeleteEvent(event);
    };

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    
    useEffect(() => {
        axios
            .get(`/react/events`)
            .then(response => {
                setEvents(response.data);
            }).catch(error => {
                console.log(error);
            });
    }, []);
    
    // 削除実行
    const handleDelete = () =>{
        axios
            .post(`/events/${ deleteId }/delete`)
            .then(response => {
                if (response.status === 200) {
                    setOpen(false);
                    history.push("/mentor/top", { type: "event", status: "delete" });
                }
            }).catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="container">
            <Breadcrumbs page="mentor_event_index" />
            
            <Alert
                type={ parameter.state && parameter.state.type }
                status={ parameter.state && parameter.state.status }
            />
            
            {events.map((event, index) => {
                return (
                    <Accordion key={event.template} expanded={expanded === `panel${index+1}`} onChange={handleChange(`panel${index+1}`)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panelbh-content"
                            id="panelbh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                {event.name}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                slackメッセージ
                                <Button size="large" component={Link} to={"/events/register/" + event.id}>編集</Button>
                                <Button 
                                    color="error" 
                                    size="large" 
                                    onClick={() => {handleOpen(), handleDeleteTarget(event.id, event.name)}} >削除</Button>
                            </Typography>
                            <Typography>
                                {event.template}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                );
            })}
            
            {/* イベント削除のモーダル */}
            <Modal
                open={ open }
                onClose={ handleClose }
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={ style }>
                    <Typography align="center" sx={{ paddingTop:2 } } variant="h5">
                        { deleteEvent }
                    </Typography>
                    
                    <Typography align="center" sx={{ paddingTop:2 }}>
                        このイベントを削除します。よろしいですか？
                    </Typography>
                    
                    <Typography align="center" sx={{ paddingTop:2 }}>
                        <Button color="error" variant="contained" onClick={ handleDelete } sx={{ mr: 1 }}>削除</Button>
                        <Button variant="outlined" onClick={() => handleClose()} sx={{ ml: 1 }}>戻る</Button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default Index;