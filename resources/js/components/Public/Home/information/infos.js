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
};

/**
 * お知らせの一覧情報
 */
function Infos(props) {
    const history = useHistory();
    const [dates, setDates] = useState([]);
    const [infos, setInfos] = useState([]);
    const [open, setOpen] = useState(false);
    const [deleteId, setDeleteId] = useState();
    const [deleteInfo, setDeleteInfo] = useState();
    const [infoDeleting, setInfoDeleting] = useState(false);
    
    // お知らせが追加、削除された際に実行
    useEffect(() => {
        if (!(props.infoChanging) || !(infoDeleting)) {
            // お知らせ全権取得
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
    const handleOpen = () => setOpen(true);
    
    const handleClose = () => setOpen(false);
    
    // 削除実行対象特定
    const handleDeleteTarget = (id, info) => {
        setDeleteId(id);
        setDeleteInfo(info);
    };
    
    // 削除実行
    const handleDelete = () =>{
        setInfoDeleting(true);
        axios
            .post(`/informations/${ deleteId }/delete`)
            .then(response => {
                if (response.status === 200) {
                    setInfoDeleting(false);
                    setOpen(false);
                    history.push("/", { type: "info", status: "deleted" });
                }
            }).catch(error => {
                console.log(error);
            });
    };
    
    let list;
    // 削除実行時にinfosの日付のキーの種類がdatesと異なり、途中のmapでエラーが出るため
    // datesの要素数とinfosのキーの数を比較
    if (dates.length !== 0 && dates.length === Object.keys(infos).length) {
        list = (
            <List
                sx={{
                    width: '80%',
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    height: 300,
                    paddingLeft: "10%",
                    '& ul': { padding: 0 },
                }}
                subheader={<li />}
            >
                { dates.map((date) => (
                    <li key={ date }>
                        <ul>
                            <ListSubheader>{ date }</ListSubheader>
                            { infos[date].map((info) => (
                                <ListItem key={`${date}-info`}>
                                    <ListItemText primary={ info.information } />
                                    { props.is_admin ? <DeleteIcon onClick={ () => {handleOpen(), handleDeleteTarget(info.id, info.information)} }/> : ''}
                                </ListItem>
                            ))}
                        </ul>
                    </li>
                ))}
             </List>
        );
    }
    
    return (
        <div>
            { list }
            
            <Modal
                open={ open }
                onClose={ handleClose }
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={ style }>
                    <Typography align="center" sx={{ paddingTop:2 }}>
                        { deleteInfo }
                    </Typography>
                    
                    <Typography align="center" sx={{ paddingTop:2 }}>
                        このお知らせを削除します。よろしいですか？
                    </Typography>
                    
                    <Typography align="center" sx={{ paddingTop:2 }}>
                        <Button variant="contained" onClick={ handleDelete }>削除</Button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

export default Infos;