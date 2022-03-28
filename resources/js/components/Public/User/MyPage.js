import React, {useState, useEffect, useContext} from 'react';
import axios from "axios";
import {Link} from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@material-ui/core/Paper';

import {LoginUser} from '../../Route.js';
import Breadcrumbs from '../../Breadcrumbs';

/**
 * ユーザマイページのメインコンポーネント
 */
function MyPage(props) {
    const [questions, setQuestions] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    
    // 画面描画時に実行
    useEffect(() => {
        // 検索結果の質問取得
        axios
            .get('/react/questions/mine')
            .then(response => {
                setQuestions(response.data);
            }).catch(error => {
                console.log(error);
            });
    }, []);
    
    // ログインユーザー情報取得
    const user = useContext(LoginUser);
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    
    return (
        <div className="container">
            <Breadcrumbs page="my_page"/>
             
            <Paper sx={{ marginBottom: 2 }}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell align="center" component="th" scope="row">ユーザID</TableCell>
                            <TableCell align="center">{ user.name }</TableCell>
                        </TableRow>
                            
                        <TableRow>
                            <TableCell align="center" component="th" scope="row">ユーザタイプ</TableCell>
                            <TableCell align="center">{ user.is_admin ? "管理者" : "受講生" }</TableCell>
                        </TableRow>
                        
                        { !(user.is_admin) &&
                            <TableRow>
                                <TableCell align="center" component="th" scope="row">入学</TableCell>
                                <TableCell align="center">{ user.entry }</TableCell>
                            </TableRow>
                        }
                            
                        <TableRow>
                            <TableCell align="center" component="th" scope="row">アカウント作成日</TableCell>
                            <TableCell align="center">{ user.created_at }</TableCell>
                        </TableRow>
                        
                        <TableRow>
                            <TableCell align="center" component="th" scope="row">質問投稿数</TableCell>
                            <TableCell align="center">{ user.question_count }件</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
            
            <Paper sx={{ width: '100%' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead stickyHeader>
                            <TableRow>
                                <TableCell align="center">Comment</TableCell>
                                <TableCell align="center">Release</TableCell>
                                <TableCell align="center">Resolution</TableCell>
                                <TableCell align="center">Question</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {questions
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((question) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={question.id}>
                                            <TableCell key={question.id} align="center">
                                                { question.reply ?
                                                    <font color="red">返信可</font>
                                                :
                                                    "返信待ち"
                                                }
                                            </TableCell>
                                            <TableCell key={question.id} align="center">
                                                { question.check ?
                                                    <font color="blue">公開中</font>
                                                :
                                                    <font color="red">非公開</font>
                                                }
                                            </TableCell>
                                            <TableCell key={question.id} align="center">
                                                { question.is_resolved ?
                                                    <font color="green">解決済み</font>
                                                : 
                                                    "未解決" 
                                                }
                                            </TableCell>
                                            <TableCell key={question.id} align="left">
                                                <Link to={'/my_page/questions/' + question.id}>
                                                    { question.title.substring(0,50) + "..." }
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={questions.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}

export default MyPage;