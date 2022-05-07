import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@mui/material/Box';
import Pagination from "@mui/material/Pagination";

import DeleteConfirmModal from '../modal/deleteConfirm';

// 各パーツのスタイル設定
const styleBoldFont = { fontWeight: 'bold' };
const styleTableMinWidth = { minWidth: 630 };
const styleTable = {
    width: '90%',
    margin: '0 auto'
};
const stylePagination = {
    display: 'flex', 
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2
};
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#C299FF',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        backgroundColor: '#EEEEEE',
        fontSize: 14,
    },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


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
    const deleteUser = useCallback(() => {
        axios
            .post(`/users/${deleteuser}/delete`)
            .then(response => {
                if (response.status === 200) {
                    props.setStudents({
                        eventList: response.data.students.data,
                        itemsCountPerPage: response.data.students.per_page,
                        totalItemsCount: response.data.students.total,
                        currentPage: response.data.students.current_page,
                        pageRangeDisplayed: 10,
                        lastPage: response.data.students.last_page,
                    });
                    props.setStaffs({
                        eventList: response.data.staffs.data,
                        itemsCountPerPage: response.data.staffs.per_page,
                        totalItemsCount: response.data.staffs.total,
                        currentPage: response.data.staffs.current_page,
                        pageRangeDisplayed: 10,
                        lastPage: response.data.staffs.last_page,
                    });
                    setDeleteuser('');
                    setOpen(false);
                    history.push("/?page=manage", {type: "user", status: 'deleted', info: deleteuser });
                }
            }).catch(error => {
                console.log(error);
            });
    });

    // ユーザーロック解除実行
    const unlockUser = (id) => {
        if (confirm('ユーザのロックを解除します。\nよろしいですか？')) {
            axios
                .post(`/users/${ id }/unlock`)
                .then(response => {
                    if (response.status === 200) {
                        props.setStudents({
                            eventList: response.data.students.data,
                            itemsCountPerPage: response.data.students.per_page,
                            totalItemsCount: response.data.students.total,
                            currentPage: response.data.students.current_page,
                            pageRangeDisplayed: 10,
                            lastPage: response.data.students.last_page,
                        });
                        props.setStaffs({
                            eventList: response.data.staffs.data,
                            itemsCountPerPage: response.data.staffs.per_page,
                            totalItemsCount: response.data.staffs.total,
                            currentPage: response.data.staffs.current_page,
                            pageRangeDisplayed: 10,
                            lastPage: response.data.staffs.last_page,
                        });
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
                <StyledTableCell align="center" sx={styleBoldFont}>受講生ID</StyledTableCell>
                <StyledTableCell align="center" sx={styleBoldFont}>パスワード</StyledTableCell>
            </React.Fragment>
        );
        tablebody = (
            <React.Fragment>
                {props.users.eventList.map((user, index) => {
                    return (
                        <StyledTableRow key={user.id}>
                            <StyledTableCell align="center" component="th" scope="row">{ user.id }</StyledTableCell>
                            <StyledTableCell align="center">{ user.student_name }</StyledTableCell>
                            <StyledTableCell align="center">{ user.name }</StyledTableCell>
                            <StyledTableCell align="center">
                                <Button variant="text" onClick={() => revealPass(index)}>
                                    { pass_number === index ? user.password : 'パスワード' }
                                </Button>
                            </StyledTableCell>
                            {props.account == "master" &&
                                <React.Fragment>
                                    <StyledTableCell align="center">
                                        { user.lock ? <Button variant="contained" onClick={() => unlockUser(user.user_id)}>ロック解除</Button> : '平常' }
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Button variant="contained" color="error" onClick={() => {setDeleteuser(user.user_id), setOpen(true)}} startIcon={ <DeleteIcon /> }>削除する</Button>
                                    </StyledTableCell>
                                </React.Fragment>
                            }
                        </StyledTableRow>
                    );
                })}
            </React.Fragment>
        );
    } else {
        tablebody = (
            <React.Fragment>
                {props.users.eventList.map(user => {
                    return (
                        <StyledTableRow key={user.id}>
                            <StyledTableCell align="center" component="th" scope="row">{ user.id }</StyledTableCell>
                            <StyledTableCell align="center">{ user.name }</StyledTableCell>
                            {props.account == "master" &&
                                <React.Fragment>
                                    <StyledTableCell align="center">
                                        { user.lock ? <Button variant="contained" onClick={() => unlockUser(user.user_id)}>ロック解除</Button> : '平常' }
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Button variant="contained" color="error" onClick={() => {setDeleteuser(user.user_id), setOpen(true)}} startIcon={ <DeleteIcon /> }>削除する</Button>
                                    </StyledTableCell>
                                </React.Fragment>
                            }
                        </StyledTableRow>
                    );
                })}
            </React.Fragment>
        );
    }

    // 管理者側ペジネーションのクリック管理
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

    // 受講生側ペジネーションのクリック管理
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

    // ペジネーション部分
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
            <DeleteConfirmModal open={open} setOpen={setOpen} delete={deleteUser} />
        
            <TableContainer component={Paper} sx={styleTable}>
                <Table sx={styleTableMinWidth} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center" sx={styleBoldFont}>ID</StyledTableCell>
                            <StyledTableCell align="center" sx={styleBoldFont}>名前</StyledTableCell>
                            {tablehead}
                            {props.account == "master" &&
                                <React.Fragment>
                                    <StyledTableCell align="center" sx={styleBoldFont}>ステータス</StyledTableCell>
                                    <StyledTableCell align="center" sx={styleBoldFont}>削除</StyledTableCell>
                                </React.Fragment>
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tablebody}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={stylePagination}>
                {pagination}
            </Box>
        </React.Fragment>
    );
};

export default UserIndex;