import React, { useState } from 'react';

import Grid from "@mui/material/Grid";
import Typography from "@material-ui/core/Typography";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DeleteIcon from '@material-ui/icons/Delete';

import Weather from './weather';
import { Modals } from '../../modal';

// 各パーツのスタイル設定
const styleGridWidth = { width: '50%' };
const styleUl = { paddingLeft: '16px' };
const styleListItem = { p: 0 };
const styleCursor = { cursor: 'pointer' };
const styleContent = { 
    width: '80%',
    margin: '0 auto'
};
const styleList = {
    width: '80%',
    bgcolor: 'background.paper',
    position: 'relative',
    overflow: 'auto',
    height: 300,
    '&:ul': { padding: 0 },
};
const styleDate = { 
    pl: 0, 
    pt: 2, 
    lineHeight: 2
};
const styleNonInfo = {
    pt: 1, 
    fontSize: '20px'
};


/**
 * PC版お知らせ
 */
const contentPC = (props) => {
    const [showOpen, setShowOpen] = useState(false);
    const [showInfo, setShowInfo] = useState([]);
    
    // モーダル開閉
    const handleShowClose = () => setShowOpen(false);
    
    let list;
    // 削除実行時にinfosの日付のキーの種類がdatesと異なり、途中のmapでエラーが出るため
    // datesの要素数とinfosのキーの数を比較
    // お知らせがない時もエラーが出るため条件を追加
    if (typeof props.infos !== ('undefined' || 'null') && props.dates.length !== 0 && props.dates.length === Object.keys(props.infos).length) {
        list = (
            <List sx={styleList} subheader={<li />}>
                {props.dates.map(date => (
                    <li key={date}>
                        <ul style={styleUl}>
                            <ListSubheader sx={styleDate}>{date}</ListSubheader>
                            {props.infos[date].map((info, index) => (
                                <ListItem key={`${date}-info-${index}`} sx={styleListItem}>
                                    <ListItemText 
                                        color="primary" 
                                        onClick={() => {setShowOpen(true), setShowInfo(info)}} 
                                        sx={styleCursor}
                                        primary={info.information.length > 15 ? info.information.substring(0,15) + "..." : info.information}
                                    />
                                    { props.isAdmin ? <DeleteIcon sx={styleCursor} onClick={() => {props.setDeleteOpen(true), props.setDeleteInfo(info.id)}}/> : ''}
                                </ListItem>
                            ))}
                        </ul>
                    </li>
                ))}
             </List>
        );
    } else {
        list = (
            <Typography sx={styleNonInfo}>
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
                open={props.deleteOpen} 
                type={"delete_info"}
                setOpen={props.setDeleteOpen}
                delete={props.handleDelete}
            />
            
            <Grid container sx={styleContent}>
                <Grid sx={styleGridWidth} item>
                    { list }
                </Grid>
                <Grid sx={styleGridWidth} item>
                    <Weather isWide={true} />
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default contentPC;