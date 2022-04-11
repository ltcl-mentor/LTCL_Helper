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

const BasicInformation = (props) => {
    
    return(
        <>
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
                                { props.user.name }
                            </TableCell>
                        </TableRow>
                            
                        <TableRow>
                            <TableCell align="center" component="th" scope="row" sx={{ width: '50%', fontWeight: 'bold', fontSize: '20px', backgroundColor: '#C299FF', color: 'white' }}>
                                入学月
                            </TableCell>
                            <TableCell align="center" sx={{ width: '50%', fontSize: '20px', backgroundColor: '#EEEEEE' }}>
                                { props.user.entry }
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        </>
        )
}
export default BasicInformation;