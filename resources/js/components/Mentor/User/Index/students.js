import React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Table from '@material-ui/core/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function Students(props) {
    return (
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
                    { props.students.length !== 0 &&
                        props.students.map((student) => {
                            return (
                                <TableRow>
                                    <TableCell align="center" component="th" scope="row">{ student.id }</TableCell>
                                    <TableCell align="center">{ student.name }</TableCell>
                                    <TableCell align="center">{ student.password }</TableCell>
                                    <TableCell align="center">
                                        <Button variant="contained" color="error" onClick={ (event) => props.setDeleteUserId(student.user_id) } startIcon={ <DeleteIcon /> }>削除する</Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    }
                </TableBody>
            </Table>
        </Paper>
    );
}

export default Students;