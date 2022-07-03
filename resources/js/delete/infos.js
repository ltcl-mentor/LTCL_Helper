import React, { useState } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@mui/material/Typography';

import Modals from '../../modal';

const styleUl = {
    paddingLeft: '16px'
};


/**
 * お知らせの一覧情報
 */
const Infos = (props) => {
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [showOpen, setShowOpen] = useState(false);
    const [deleteInfo, setDeleteInfo] = useState('');
    const [showInfo, setShowInfo] = useState([]);
    
    // モーダル開閉
    const handleDeleteClose = () => setDeleteOpen(false);
    const handleShowClose = () => setShowOpen(false);

    let list;
    // 削除実行時にinfosの日付のキーの種類がdatesと異なり、途中のmapでエラーが出るため
    // datesの要素数とinfosのキーの数を比較
    // お知らせがない時もエラーが出るため条件を追加
    if (typeof props.infos !== ('undefined' || 'null') && props.dates.length !== 0 && props.dates.length === Object.keys(props.infos).length) {
        list = (
            <List
                sx={{
                    width: props.isWide ? '80%' : '100%',
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    height: 300,
                    '&:ul': { padding: 0 },
                }}
                subheader={<li />}
            >
                { props.dates.map(date => (
                    <li key={ date }>
                        <ul style={styleUl}>
                            <ListSubheader sx={{ pl: 0, pt: 2, lineHeight: 2 }}>{ date }</ListSubheader>
                            { props.infos[date].map((info, index) => (
                                <ListItem key={`${date}-info-${index}`} sx={{ p: 0 }}>
                                    <ListItemText 
                                        color="primary" 
                                        onClick={() => {setShowOpen(true), setShowInfo(info)}} 
                                        sx={{ cursor: 'pointer' }}
                                        primary={info.information.length > 15 ? info.information.substring(0,15) + "..." : info.information}
                                    />
                                    { props.is_admin ? <DeleteIcon sx={{ cursor: 'pointer' }} onClick={() => {setDeleteOpen(true), setDeleteInfo(info.id)}}/> : ''}
                                </ListItem>
                            ))}
                        </ul>
                    </li>
                ))}
             </List>
        );
    } else {
        list = (
            <Typography sx={{ pl: !props.isWide && '5%', pb: !props.isWide && 3, pt: 1, fontSize: '20px' }}>
                お知らせはありません。
            </Typography>
        );
    }
    
    return (
        <React.Fragment>
            <Modals 
                open={showOpen} 
                type={"show_info"} 
                handleClose={handleShowClose}
                info={showInfo}
            />
            
            <Modals 
                open={deleteOpen} 
                type={"delete_info"} 
                handleClose={handleDeleteClose}
                info={deleteInfo}
                setDates={props.setDates}
                setInfos={props.setInfos}
            />
            
            { list }
        </React.Fragment>
    );
};

export default Infos;