import React, {useState} from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Table from '@material-ui/core/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

/**
 * 生徒一覧
 */
function Students(props) {
    const [pass_number, setPassNumber] = useState('');
    
    const revealPass = (number) => {
        if (pass_number === number) {
            setPassNumber('');
        } else {
            setPassNumber(number);
        }
    };
    
    return (
        <Paper sx={{ margin: "0 auto", maxWidth: "800px" }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center">名前</TableCell>
                        <TableCell align="center">パスワード</TableCell>
                        <TableCell align="center">ステータス</TableCell>
                        <TableCell align="center">削除</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { props.students.length !== 0 &&
                        props.students.map((student, index) => {
                        console.log(student.lock)
                            return (
                                <TableRow>
                                    <TableCell align="center" component="th" scope="row">{ student.id }</TableCell>
                                    <TableCell align="center">{ student.name }</TableCell>
                                    <TableCell align="center">
                                        <Button variant="text" onClick={ () => revealPass(index) }>
                                            { pass_number === index ? student.password : 'パスワード' }
                                        </Button>
                                    </TableCell>
                                    <TableCell align="center">
                                        { student.lock ? <Button variant="contained" onClick={ () => props.setUnlockUserId(student.user_id) }>ロック解除</Button> : '平常' }
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button variant="contained" color="error" onClick={ () => props.setDeleteUserId(student.user_id) } startIcon={ <DeleteIcon /> }>削除する</Button>
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