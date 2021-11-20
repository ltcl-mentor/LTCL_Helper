import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Table from '@material-ui/core/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function Index() {
    const [staffs, setStaffs] = useState([]);
    const [students, setStudents] = useState([]);
    const csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
    
    useEffect(() => {
        axios
            .get(`/react/all/staffs`)
            .then(response => {
                setStaffs(response.data);
            }).catch(error => {
                console.log(error);
            });
            
        axios
            .get(`/react/all/students`)
            .then(response => {
                setStudents(response.data);
            }).catch(error => {
                console.log(error);
            });
    }, []);
    
    const deleteConfirm = () => {
        if (confirm('データが削除されます。\nよろしいですか？')) {
            document.getElementById('delete').submit();
        } else {
            window.alert('キャンセルしました');
            return false;
        }
    };
    
    return (
        <div className="container">
            <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 3 }}>
                <Link underline="hover" to="/">
                    HOME
                </Link>
                
                <Link underline="hover" to="/mentor/top">
                    メンタートップ
                </Link>
                
                <Typography color="text.primary">
                    ユーザ名簿
                </Typography>
            </Breadcrumbs>
            
            <Typography
                variant="h4"
                component="div"
                align="center"
                sx={{
                    marginBottom: 2,
                }}
            >
                管理者一覧
            </Typography>
            
            <Paper sx={{ margin: "0 auto", maxWidth: "700px" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="center">名前</TableCell>
                            <TableCell align="center">削除</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { staffs.map((staff) => {
                            return (
                                <TableRow>
                                    <TableCell align="center" component="th" scope="row">{ staff.id }</TableCell>
                                    <TableCell align="center">{ staff.name }</TableCell>
                                    <TableCell align="center">
                                        <form action={ `/users/` + staff.id + `/delete` } method="post" id="delete">
                                            <input type="hidden" name="_token" value={ csrf_token }/>
                                            <Button variant="contained" color="error" onClick={ deleteConfirm } startIcon={ <DeleteIcon /> }>削除する</Button>
                                        </form>
                                    </TableCell>
                                </TableRow>
                            );
                        }) }
                    </TableBody>
                </Table>
            </Paper>
            
            <Typography
                variant="h4"
                component="div"
                align="center"
                sx={{
                    marginTop: 3,
                    marginBottom: 2,
                }}
            >
                受講生一覧
            </Typography>
            
            <Paper sx={{ margin: "0 auto", maxWidth: "800px" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="center">名前</TableCell>
                            <TableCell align="center">パスワード</TableCell>
                            <TableCell align="center">削除</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { students.length !== 0 &&
                            students.map((student) => {
                                return (
                                    <TableRow>
                                        <TableCell align="center" component="th" scope="row">{ student.id }</TableCell>
                                        <TableCell align="center">{ student.name }</TableCell>
                                        <TableCell align="center">{ student.password }</TableCell>
                                        <TableCell align="center">
                                            <form action={ `/users/` + student.id + `/delete` } method="post" id="delete">
                                                <input type="hidden" name="_token" value={ csrf_token }/>
                                                <Button variant="contained" color="error" onClick={ deleteConfirm } startIcon={ <DeleteIcon /> }>削除する</Button>
                                            </form>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
}

export default Index;