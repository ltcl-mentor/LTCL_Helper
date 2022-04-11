import React from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import UserRegister from './modal/userRegister';
import ShowEvent from './modal/showEvent';
import AddEvent from './modal/addEvent';
import Create from './Top/information/create';
import ShowInfo from './modal/showInfo';
import DeleteInfo from './modal/deleteInfo';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'background.paper',
    borderRadius: '4px',
    p: 3,
    maxHeight: '80%',
    overflow: 'scroll',
    '&:focus': {
        border: 'none'
    }
};


/**
 * モーダル
 */
const Modals = (props) => {
    let content;
    switch (props.type) {
        case "create_info":
            content = <Create onClose={props.handleClose} events={props.events} setDates={props.setDates} setInfos={props.setInfos} />;
            break;
            
        case "show_info":
            content = <ShowInfo onClose={props.handleClose} info={props.info} />;
            break;
            
        case "delete_info":
            content = <DeleteInfo onClose={props.handleClose} info={props.info} setDates={props.setDates} setInfos={props.setInfos} />;
            break;
            
        case "user":
            content = <UserRegister value={props.value} onClose={ props.handleClose } setStudents={props.setStudents} setStaffs={props.setStaffs} />;
            break;
            
        case "show_event":
            content = <ShowEvent event={props.event} setEvents={props.setEvents} onClose={props.handleClose} />;
            break;
        
        case "add_event":
            content = <AddEvent setEvents={props.setEvents} onClose={props.handleClose} />;
            break;
    }
    
    return (
        <Modal
            open={ props.open }
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={ style }>
                {content}
            </Box>
        </Modal>
    );
};

export default Modals;