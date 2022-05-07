import React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Table from '@material-ui/core/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

/**
 * 管理者一覧
 */
function Admins(props) {
    return (
        <Paper sx={{ margin: "0 auto", maxWidth: "700px" }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center">名前</TableCell>
                        <TableCell align="center">ステータス</TableCell>
                        <TableCell align="center">削除</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { props.staffs.map((staff) => {
                        return (
                            <TableRow key={staff.id}>
                                <TableCell align="center" component="th" scope="row">{ staff.id }</TableCell>
                                <TableCell align="center">{ staff.name }</TableCell>
                                <TableCell align="center">
                                    { staff.lock ? <Button variant="contained" onClick={ () => props.setUnlockUserId(staff.id) }>ロック解除</Button> : '平常' }
                                </TableCell>
                                <TableCell align="center">
                                    <Button variant="contained" color="error" onClick={ (event) => props.setDeleteUserId(staff.id) } startIcon={ <DeleteIcon /> }>削除する</Button>
                                </TableCell>
                            </TableRow>
                        );
                    }) }
                </TableBody>
            </Table>
        </Paper>
    );
}

export default Admins;