import React from 'react';

import Typography from '@material-ui/core/Typography';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const styleWarning = { 
    color: "red", 
    mb: 1 
};
const styleErrorMessage = { 
    color: "red", 
    fontSize: '14px' 
};
const styleTable = { 
    width: '80%',
    m: '10px auto 0'
};
const styleTableBody = { 
    borderBottom: 'white',
    width: '50%'
};
const styleTableHead = {
    borderBottom: 'white',
    width: '50%',
    fontWeight: 'bold',
    color: '#666666',
    fontSize: '18px',
    verticalAlign: 'bottom'
};


/**
 * userRegisterのPC版
 */
const userRegisterPC = (props) => {
    let errorNameMessage;
    if (props.errorName.length > 0) {
        errorNameMessage = (
            <Typography component="div" sx={styleErrorMessage}>
                {props.errorName}
            </Typography>    
        );
    }
    
    let errorPasswordMessage;
    if (props.errorPassword.length > 0) {
        errorPasswordMessage = (
            <Typography component="div" sx={styleErrorMessage}>
                {props.errorPassword}
            </Typography>
        );
    }
    
    let errorConfirmPasswordMessage;
    if (props.errorConfirmPassword.length > 0) {
        errorConfirmPasswordMessage = (
            <Typography component="div" sx={styleErrorMessage}>
                {props.errorConfirmPassword}
            </Typography>
        );
    }
    
    return (
        <Table sx={styleTable}>
            <TableRow>
                <TableCell sx={styleTableHead}>ユーザー名</TableCell>
                <TableCell sx={styleTableBody}>
                    <Typography component="div" sx={styleWarning}>
                        実名を登録しないでください！
                    </Typography>
                    <input id="name" type="text" className="form-control" name="name" required autoComplete="name" autoFocus/>
                    {errorNameMessage}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell sx={styleTableHead}>パスワード</TableCell>
                <TableCell sx={styleTableBody}>
                    <input id="password" type="password" className="form-control" name="password" required autoComplete="new-password"/>
                    {errorPasswordMessage}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell sx={styleTableHead}>パスワード(確認)</TableCell>
                <TableCell sx={styleTableBody}>
                    <input id="password-confirm" type="password" className="form-control" name="password_confirmation" required autoComplete="new-password"/>
                    {errorConfirmPasswordMessage}
                </TableCell>
            </TableRow>
        </Table>
    );
};

export default userRegisterPC;