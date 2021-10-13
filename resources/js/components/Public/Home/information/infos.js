import React, {useState, useEffect} from 'react';
import axios from "axios";
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

function Infos(props) {
    const [dates, setDates] = useState([]);
    const [infos, setInfos] = useState([]);
    const [open, setOpen] = useState(false);
    const [deleteId, setDeleteId] = useState();
    const [deleteInfo, setDeleteInfo] = useState();
    
    useEffect(() => {
        axios
            .get(`/react/infos`)
            .then(response => {
                setInfos(response.data.infos);
                setDates(response.data.dates);
            }).catch(error => {
                console.log(error);
            });
    }, []);
    
    const handleOpen = () => setOpen(true);
    
    const handleClose = () => setOpen(false);
    
    const handleDelete = (id, info) => {
        setDeleteId(id);
        setDeleteInfo(info);
    };
    
    const submit = () =>{
        document.getElementById('delete_info').submit();
    };
    
    let list;
    if (dates.length !== 0) {
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
                                    { props.is_admin ? <DeleteIcon onClick={ () => {handleOpen(), handleDelete(info.id, info.information)} }/> : ''}
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
                    <form action={ '/informations/' + deleteId + '/delete' } method="post" id="delete_info">
                        <input type="hidden" value={ props.csrf_token } name="_token" />
                        
                        <Typography align="center" sx={{ paddingTop:2 }}>
                            { deleteInfo }
                        </Typography>
                        
                        <Typography align="center" sx={{ paddingTop:2 }}>
                            このお知らせを削除します。よろしいですか？
                        </Typography>
                        
                        <Typography align="center" sx={{ paddingTop:2 }}>
                            <Button variant="contained" onClick={ submit }>削除</Button>
                        </Typography>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

export default Infos;