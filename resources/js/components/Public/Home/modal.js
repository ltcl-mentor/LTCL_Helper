import React from 'react';
import useMedia from 'use-media';
import BreakingPoint from '../../BreakingPoint';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import UserRegister from './modal/userRegister';
import ShowEvent from './modal/showEvent';
import AddEvent from './modal/addEvent';
import Create from './Top/information/create';
import ShowInfo from './modal/showInfo';
import DeleteInfo from './modal/deleteInfo';
import Contact from './modal/contact';

/**
 * モーダル
 */
const Modals = (props) => {
    const isWide = useMedia({ minWidth: `${BreakingPoint}px` });
    
    let content;
    switch (props.type) {
        
        // お知らせ作成
        case "create_info":
            content = <Create onClose={props.handleClose} events={props.events} setDates={props.setDates} setInfos={props.setInfos} isWide={isWide} />;
            break;
            
        // お知らせ詳細
        case "show_info":
            content = <ShowInfo onClose={props.handleClose} info={props.info} />;
            break;
           
        // お知らせ削除 
        case "delete_info":
            content = <DeleteInfo onClose={props.handleClose} info={props.info} setDates={props.setDates} setInfos={props.setInfos} />;
            break;
           
        // ユーザー作成 
        case "user":
            content = <UserRegister value={props.value} onClose={ props.handleClose } setStudents={props.setStudents} setStaffs={props.setStaffs} isWide={isWide} />;
            break;
        
        // イベント詳細 
        case "show_event":
            content = <ShowEvent event={props.event} setEvents={props.setEvents} onClose={props.handleClose} isWide={isWide} />;
            break;
        
        // イベント追加
        case "add_event":
            content = <AddEvent setEvents={props.setEvents} onClose={props.handleClose} isWide={isWide} />;
            break;
            
        // お問い合わせ
        case "contact":
            content = <Contact onClose={props.handleClose} isWide={isWide} />;
            break;
    }
    
    return (
        <Modal
            open={ props.open }
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box 
                sx={{ 
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    borderRadius: '4px',
                    p: 3,
                    maxHeight: '80%',
                    overflow: 'scroll',
                    width: isWide ? '70%' : '100%',
                    '&:focus': {
                        border: 'none'
                    }
                }}
            >
                {content}
            </Box>
        </Modal>
    );
};

export default Modals;