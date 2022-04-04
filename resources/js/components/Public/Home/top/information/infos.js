import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useHistory} from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
 * お知らせの一覧情報
 */
function Infos(props) {
    const history = useHistory();
    const [dates, setDates] = useState([]);
    const [infos, setInfos] = useState([]);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [showOpen, setShowOpen] = useState(false);
    const [deleteId, setDeleteId] = useState();
    const [deleteInfo, setDeleteInfo] = useState();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [targets, setTargets] = useState('');
    const [slack, setSlack] = useState('');
    const [infoDeleting, setInfoDeleting] = useState(false);
    
    // お知らせが追加、削除された際に実行
    useEffect(() => {
        if (!(props.infoChanging) || !(infoDeleting)) {
            // お知らせ全件取得
            axios
                .get(`/react/infos`)
                .then(response => {
                    setInfos(response.data.infos);
                    setDates(response.data.dates);
                }).catch(error => {
                    console.log(error);
                });
        }
    }, [props.infoChanging, infoDeleting]);
    
    // モーダル開閉
    const handleDeleteOpen = () => setDeleteOpen(true);
    
    const handleDeleteClose = () => setDeleteOpen(false);
    
    const handleShowOpen = () => setShowOpen(true);
    
    const handleShowClose = () => setShowOpen(false);
    
    // 削除実行対象特定
    const handleDeleteTarget = (id, info) => {
        setDeleteId(id);
        setDeleteInfo(info);
    };

    // 詳細表示対象特定
    const handleShowTarget = (title, target, body, date) => {
        setTitle(title);
        setTargets(target);
        setBody(body);
        const message = date !== null ? "有" : "無";
        setSlack(message);
    };

    // 削除実行
    const handleDelete = () =>{
        setInfoDeleting(true);
        axios
            .post(`/informations/${ deleteId }/delete`)
            .then(response => {
                if (response.status === 200) {
                    setInfoDeleting(false);
                    setDeleteOpen(false);
                    history.push("/", { type: "info", status: "deleted" });
                }
            }).catch(error => {
                console.log(error);
            });
    };

    let list;
    // 削除実行時にinfosの日付のキーの種類がdatesと異なり、途中のmapでエラーが出るため
    // datesの要素数とinfosのキーの数を比較
    // お知らせがない時もエラーが出るため条件を追加
    if (typeof infos !== ('undefined' || 'null') && dates.length !== 0 && dates.length === Object.keys(infos).length) {
        list = (
            <List
                sx={{
                    width: '80%',
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    height: 300,
                    '&:ul': { padding: 0 },
                }}
                subheader={<li />}
            >
                { dates.map((date) => (
                    <li key={ date }>
                        <ul>
                            <ListSubheader sx={{ pl: 0, pt: 2, lineHeight: 2 }}>{ date }</ListSubheader>
                            { infos[date].map((info) => (
                                <ListItem key={`${date}-info`} sx={{ p: 0 }}>
                                    <ListItemText 
                                        color="primary" 
                                        onClick={() => {handleShowOpen(), handleShowTarget(info.information, info.targets, info.body, info.slackDate)}} 
                                        primary={info.information.length > 15 ? info.information.substring(0,15) + "..." : info.information}
                                    />
                                    { props.is_admin ? <DeleteIcon onClick={() => {handleDeleteOpen(), handleDeleteTarget(info.id, info.information)}}/> : ''}
                                </ListItem>
                            ))}
                        </ul>
                    </li>
                ))}
             </List>
        );
    } else {
        list = (
            <Typography sx={{ pl: 2, pt: 1, fontSize: '20px' }}>
                お知らせはありません。
            </Typography>
        );
    }
    
    return (
        <React.Fragment>
            { list }
            
            {/* お知らせ削除のモーダル */}
            <Modal
                open={ deleteOpen }
                onClose={ handleDeleteClose }
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={ style }>
                    <Typography align="center" sx={{ paddingTop:2 } } variant="h5">
                        { deleteInfo }
                    </Typography>
                    
                    <Typography align="center" sx={{ paddingTop:2 }}>
                        このお知らせを削除します。よろしいですか？
                    </Typography>
                    
                    <Typography align="center" sx={{ paddingTop:2 }}>
                        <Button color="error" variant="contained" onClick={ handleDelete }>削除</Button>
                        <Button variant="outlined" onClick={() => handleDeleteClose()}>戻る</Button>
                    </Typography>
                </Box>
            </Modal>
            
            {/* お知らせ詳細のモーダル */}
            <Modal
                open={ showOpen }
                onClose={ handleShowClose }
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={ style }>
                    <Typography align="center" variant="h5">
                        { title }
                    </Typography>
                    <Typography align="left" sx={{ fontSize: 12, color: 'gray', mt: 2, wordBreak: 'break-word' }}>
                        { targets }
                    </Typography>
                    <Typography align="left" variant="h6" sx={{ wordBreak: 'break-word' }}>
                        { body }
                    </Typography>
                    {props.is_admin == "staff" &&
                        <Typography align="left" variant="h6" sx={{ wordBreak: 'break-word' }}>
                            Slack通知：{ slack }
                        </Typography>
                    }
                    <Typography align="center" sx={{ paddingTop:2 }}>
                        <Button variant="outlined" onClick={() => handleShowClose()}>戻る</Button>
                    </Typography>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default Infos;