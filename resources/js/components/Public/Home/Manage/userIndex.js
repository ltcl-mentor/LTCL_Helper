import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableHead from '@mui/material/TableHead';
import Button from '@mui/material/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import IconButton from '@mui/material/IconButton';
import Pagination from "@mui/material/Pagination";

// モーダルのCSS設定
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


/**
 * ユーザー一覧
 */
const UserIndex = (props) => {
    const history = useHistory();
    const [pass_number, setPassNumber] = useState('');
    const [open, setOpen] = useState(false);
    const [deleteuser, setDeleteuser] = useState('');

    // パスワード表示
    const revealPass = (number) => {
        if (pass_number === number) {
            setPassNumber('');
        } else {
            setPassNumber(number);
        }
    };

    // ユーザー削除
    // 後でconfirmを変えたい
    const deleteUser = () => {
        axios
            .post(`/users/${deleteuser}/delete`)
            .then(response => {
                if (response.status === 200) {
                    props.setStaffs(response.data.staffs);
                    props.setStudents(response.data.students);
                    setDeleteuser('');
                    setOpen(false);
                    history.push("/?page=manage", {type: "user", status: 'deleted', info: deleteuser });
                }
            }).catch(error => {
                console.log(error);
            });
    };

    // ユーザーロック解除実行
    const unlockUser = (id) => {
        if (confirm('ユーザのロックを解除します。\nよろしいですか？')) {
            axios
                .post(`/users/${ id }/unlock`)
                .then(response => {
                    if (response.status === 200) {
                        props.setStaffs(response.data.staffs);
                        props.setStudents(response.data.students);
                        history.push("/?page=manage", {type: "user", status: 'unlock', info: id });
                    }
                }).catch(error => {
                    console.log(error);
                });
        } else {
            window.alert('キャンセルしました');
            return false;
        }
    };

    let tablehead;
    let tablebody;
    if (props.type == "student") {
        tablehead = (
            <React.Fragment>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>受講生ID</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>パスワード</TableCell>
            </React.Fragment>
        );
        tablebody = (
            <React.Fragment>
                {props.users.eventList.map((user, index) => {
                    return (
                        <TableRow key={user.id} sx={{ backgroundColor: '#EEEEEE' }}>
                            <TableCell align="center" component="th" scope="row">{ user.id }</TableCell>
                            <TableCell align="center">{ user.student_name }</TableCell>
                            <TableCell align="center">{ user.name }</TableCell>
                            <TableCell align="center">
                                <Button variant="text" onClick={ () => revealPass(index) }>
                                    { pass_number === index ? user.password : 'パスワード' }
                                </Button>
                            </TableCell>
                            {props.account == "master" &&
                                <React.Fragment>
                                    <TableCell align="center">
                                        { user.lock ? <Button variant="contained" onClick={() => unlockUser(user.user_id)}>ロック解除</Button> : '平常' }
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button variant="contained" color="error" onClick={() => {setDeleteuser(user.user_id), setOpen(true)}} startIcon={ <DeleteIcon /> }>削除する</Button>
                                    </TableCell>
                                </React.Fragment>
                            }
                        </TableRow>
                    );
                })}
            </React.Fragment>
        );
    } else {
        tablebody = (
            <React.Fragment>
                {props.users.eventList.map(user => {
                    return (
                        <TableRow key={user.id} sx={{ backgroundColor: '#EEEEEE' }}>
                            <TableCell align="center" component="th" scope="row">{ user.id }</TableCell>
                            <TableCell align="center">{ user.name }</TableCell>
                            {props.account == "master" &&
                                <React.Fragment>
                                    <TableCell align="center">
                                        { user.lock ? <Button variant="contained" onClick={() => unlockUser(user.id)}>ロック解除</Button> : '平常' }
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button variant="contained" color="error" onClick={() => {setDeleteuser(user.id), setOpen(true)}} startIcon={ <DeleteIcon /> }>削除する</Button>
                                    </TableCell>
                                </React.Fragment>
                            }
                        </TableRow>
                    );
                })}
            </React.Fragment>
        );
    }

    const handlePageClick = (event, index) => {
        axios
            .get(`/react/mentor?page=${index}`)
            .then(response => {
                props.setStaffs({
                    eventList: response.data.staffs.data,
                    itemsCountPerPage: response.data.staffs.per_page,
                    totalItemsCount: response.data.staffs.total,
                    currentPage: response.data.staffs.current_page,
                    pageRangeDisplayed: 10,
                    lastPage: response.data.staffs.last_page,
                });
            }).catch(error => {
            console.log(error);
        });
    };

    const handlePageClickStudent = (event, index) => {
        axios
            .get(`/react/mentor?page=${index}`)
            .then(response => {
                props.setStudents({
                    eventList: response.data.students.data,
                    itemsCountPerPage: response.data.students.per_page,
                    totalItemsCount: response.data.students.total,
                    currentPage: response.data.students.current_page,
                    pageRangeDisplayed: 10,
                    lastPage: response.data.students.last_page,
                });
            }).catch(error => {
            console.log(error);
        });
    };

    let pagination;

    pagination = (
        <Pagination
            count={ props.users.lastPage }
            page={ props.users.currentPage }
            onChange={ (props.type == 'staff') ? handlePageClick : handlePageClickStudent}
            sx={{ display: "block" }}
        />
    );

    return (
        <React.Fragment>
            <Paper sx={{ boxShadow: 'none', borderRadius: 0, marginBottom: 6, width: '70%', margin: '0 auto' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#C299FF', color: 'white' }}>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>ID</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>名前</TableCell>
                            {tablehead}
                            {props.account == "master" &&
                                <React.Fragment>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>ステータス</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>削除</TableCell>
                                </React.Fragment>
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tablebody}
                    </TableBody>
                </Table>
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2}}>
                    {pagination}
                </Box>
            </Paper>

            {/* 削除モーダル */}
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={ style }>
                    <IconButton onClick={() => setOpen(false)} sx={{ color: 'red', ml: '95%' }}>
                        <HighlightOffIcon />
                    </IconButton>
                    <Typography align="center" sx={{ color: "red", fontSize: '30px', fontWeight: 'bold' }}>
                        WARNING！
                    </Typography>
                    <Typography align="center" sx={{ color: "red", fontSize: '20px', fontWeight: 'bold', mt: '10px' }}>
                        削除すると元に戻せません。<br/>本当に削除しますか？
                    </Typography>
                    <Typography align="center" sx={{ mt: '20px' }}>
                        <Button size="large" color="error" variant="contained" onClick={() => deleteUser()}>削除</Button>
                    </Typography>
                </Box>
            </Modal>
        </React.Fragment>
    );
};

export default UserIndex;
