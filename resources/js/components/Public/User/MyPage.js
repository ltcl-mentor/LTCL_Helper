import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { Link, useHistory } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Grid from '@mui/material/Grid';
// import TablePagination from '@mui/material/TablePagination';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Box from '@material-ui/core/Box';


import {LoginUser} from '../../Route.js';
import Breadcrumbs from '../../Breadcrumbs';

const style = {
  fontWeight: 'normal',
  paddingLeft: '20px',
};


/**
 * ユーザマイページのメインコンポーネント
 */
const MyPage = (props) => {
    const history = useHistory();
    // const [questions, setQuestions] = useState([]);
    const [questions, setQuestions] = useState({
        eventList: [],
        currentPage: 1,
        itemsCountPerPage: 1,
        totalItemsCount: 1,
        pageRangeDisplayed: 9,
        lastPage: 0,
    });
    // const [page, setPage] = useState(0);
    // const [rowsPerPage, setRowsPerPage] = useState(10);
    
    // Topページに戻る
    const handleBackTopPage = () => {
        history.push("/");
    };
    
    // 画面描画時に実行
    useEffect(() => {
        // 検索結果の質問取得
        axios
            .get('/react/questions/mine')
            .then(response => {
                console.log(response.data);
                // setQuestions(response.data);
                setQuestions({
                    eventList: response.data.data,
                    itemsCountPerPage: response.data.per_page,
                    totalItemsCount: response.data.total,
                    currentPage: response.data.current_page,
                    pageRangeDisplayed: 10,
                    lastPage: response.data.last_page,
                });
            }).catch(error => {
                console.log(error);
            });
    }, []);
    
    // ログインユーザー情報取得
    const user = useContext(LoginUser);
    
    // const handleChangePage = (event, newPage) => {
    //     setPage(newPage);
    // };
    
    // const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(+event.target.value);
    //     setPage(0);
    // };
    
    const handlePageClick = (event, index) => {
        // 検索結果の質問取得
        axios
            .get(`/react/questions/mine?page=${index}`)
            .then(response => {
                setQuestions({
                    eventList: response.data.data,
                    itemsCountPerPage: response.data.per_page,
                    totalItemsCount: response.data.total,
                    currentPage: response.data.current_page,
                    pageRangeDisplayed: 10,
                    lastPage: response.data.last_page,
                });
            }).catch(error => {
                console.log(error);
            });
    };
    
    let pagination;
    
    pagination = (
            <Pagination
                count={ questions.lastPage }
                page={ questions.currentPage }
                onChange={ handlePageClick }
                sx={{ display: "block" }}
            />
        );
    
    return (
        <div className="mypage">
            <Breadcrumbs page="my_page"/>
            
            <Typography sx={{ fontSize: '24px', color: '#771AF8', fontWeight: 'bold' }}>
                受講生用マイページ
            </Typography>
            
            {/* 基本情報 */}
            <Typography sx={{ fontSize: '20px', fontWeight: 'bold', marginTop: 4, marginBottom: 3 }}>
                基本情報
            </Typography>
            <Paper sx={{ boxShadow: 'none', borderRadius: 0, marginBottom: 6 }}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell align="center" component="th" scope="row" sx={{ width: '50%', fontWeight: 'bold', fontSize: '20px', backgroundColor: '#C299FF', color: 'white' }}>
                                ユーザID
                            </TableCell>
                            <TableCell align="center" sx={{ width: '50%', fontSize: '20px', backgroundColor: '#EEEEEE' }}>
                                { user.name }
                            </TableCell>
                        </TableRow>
                            
                        <TableRow>
                            <TableCell align="center" component="th" scope="row" sx={{ width: '50%', fontWeight: 'bold', fontSize: '20px', backgroundColor: '#C299FF', color: 'white' }}>
                                入学月
                            </TableCell>
                            <TableCell align="center" sx={{ width: '50%', fontSize: '20px', backgroundColor: '#EEEEEE' }}>
                                { user.entry }
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
            
            {/* 質問投稿履歴 */}
            <Grid container sx={{ justifyContent: 'space-between' }}>
                <Grid item>
                    <Typography sx={{ fontSize: '20px', fontWeight: 'bold', marginTop: 1, marginBottom: 3 }}>
                        質問投稿履歴<span style={style}>全{questions.totalItemsCount}件</span>
                    </Typography>
                </Grid>
                <Grid item>
                    <Button
                        size='large' 
                        variant="text" 
                        endIcon={<AddIcon />} 
                        sx={{ color: '#771AF8', fontSize: '20px', fontWeight: 'bold', pt: '5px', ml: 'auto' }}
                    >
                        <Link to='/public/questions/create'>
                            質問する
                        </Link>
                    </Button>
                </Grid>
            </Grid>
            
            <Paper>
                <TableContainer sx={{ /*maxHeight: 440*/ }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableBody>
                            {//questions
                            questions.eventList
                                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((question) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={`id-${question.id}:${question.created_at}`}>
                                            <TableCell align="center">
                                                { question.is_resolved ?
                                                    <font color="green">解決済み</font>
                                                : 
                                                    <font color="red">未解決</font>
                                                }
                                            </TableCell>
                                            <TableCell align="left">
                                                <Link to={'/my_page/questions/' + question.id} style={{ color: 'black' }}>
                                                    { question.title }
                                                    {/* question.title.substring(0,70) + "..." */}
                                                </Link>
                                            </TableCell>
                                            <TableCell align="center">
                                                { question.check ?
                                                    <font color="blue">公開中</font>
                                                :
                                                    <font color="red">非公開</font>
                                                }
                                            </TableCell>
                                            <TableCell align="center">
                                                { question.reply ?
                                                    <Link to={'/my_page/questions/' + question.id}>
                                                        <font color="red">返信可</font>
                                                    </Link>
                                                :
                                                    <Link to={'/my_page/questions/' + question.id}>
                                                        <font>返信待ち</font>
                                                    </Link>
                                                }
                                            </TableCell>
                                        </TableRow>
                                    );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/*<TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={questions.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />*/}
            </Paper>
            <Grid container justifyContent="center" sx={{ marginTop: 2, marginBottom: 2 }}>
                    <Grid item>
                        { pagination }
                    </Grid>
                </Grid>
            
            <div
                style={{
                    textAlign: "center",
                    marginTop: 5,
                    marginBottom: 30
                }}
            >
                <Button
                    variant="text"
                    onClick={handleBackTopPage}
                    style={{
                        color: "black",
                        minWidth: 150,
                        maxWidth: 200,
                        marginBottom: 5
                    }}
                >
                    Topに戻る
                </Button>
            </div>
        </div>
    );
};

export default MyPage;