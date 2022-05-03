import React, { useState }  from 'react';

import Typography from "@material-ui/core/Typography";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DeleteIcon from '@material-ui/icons/Delete';

import Weather from './weather';
import Modals from '../../modal';

// 各パーツのスタイル設定
const styleUl = { paddingLeft: '16px' };
const styleListItem = { p: 0 };
const styleCursor = { cursor: 'pointer' };
const styleContent = { 
    width: '90%',
    margin: '0 auto'
};
const styleHeading = {
    color: "#771AF8",
    fontWeight: "bold",
    fontSize: 24,
    pl: '6%'
};
const styleList = {
    width: '100%',
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
    pl: '5%', 
    pb: 3, 
    pt: 1, 
    fontSize: '20px'
};


/**
 * モバイル版お知らせ
 */
const contentMobile = (props) => {
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
                                        primary={info.information.length > 30 ? info.information.substring(0,30) + "..." : info.information}
                                    />
                                    { props.isAdmin ? <DeleteIcon sx={styleCursor} onClick={() => {setDeleteOpen(true), setDeleteInfo(info.id)}}/> : ''}
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
       <div style={styleContent}>
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
            
            <Typography component="div" sx={styleHeading}>
                天気情報
            </Typography>
            <Weather isWide={false} />
        </div>
    );
};

export default contentMobile;