import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Button from '@mui/material/Button';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Card from '@material-ui/core/Card';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Forms from './studentForm';


/**
 * 管理者登録
 */
const UserRegister = (props) => {
    const history = useHistory();
    const [clickCount, setClickCount] = useState(0);
    const [errorName, setErrorName] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [number, setNumber] = useState('');
    const today = new Date();
    const thisYear = today.getFullYear();
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    let error;

    const handleYear = (event) => {
        setYear(event.target.value);
    };
    
    const handleMonth = (event) => {
        setMonth(event.target.value);
    };
    
    const handleNumber = (event) => {
        setNumber(event.target.value);
    };
    
    const handleSubmitAdmin = () => {
        setErrorName('');
        setErrorPassword('');
        setErrorConfirmPassword('');
        
        if (clickCount === 0) {
            setClickCount(1);
            const name = document.getElementById('name').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('password-confirm').value;
            error = 0;
            
            // バリデーション
            // パスワード不一致
            if (password !== confirmPassword) {
                setErrorPassword('パスワードが一致しません。');
                error++;
            }
            
            // 名前が空欄
            if (name.length == 0) {
                setErrorName('名前を入力してください。');
                error++;
            }
            
            // パスワードが空欄
            if (password.length < 8) {
                setErrorPassword('パスワードは8文字以上を入力してください。');
                error++;
            }
            
            // 確認用パスワードが空欄
            if (confirmPassword.length < 8) {
                setErrorConfirmPassword('パスワード(確認)は8文字以上を入力してください。');
                error++;
            }
            
            if (error > 0) {
                setClickCount(0);
                return false;
            }
            
            axios
                .post("/users/admin/register", {
                    name: name,
                    password: password
                })
                .then(response => {
                    if (response.status === 200) {
                        props.setStudents(response.data.students);
                        props.setStaffs(response.data.staffs);
                        setClickCount(0);
                        props.onClose();
                        history.push("/?page=manage", {type: "user", status: 'admin_created'});
                    }
                }).catch(error => {
                    console.log(error);
                    setClickCount(0);
                });
        } else {
            return false;
        }
    };
    
    let component;
    if (props.value == 0) {
        component = (
            <React.Fragment>
                <Typography align="center" component="div" sx={{ color: '#771AF8', fontSize: '20px', fontWeight: 'bold' }}>
                    受講生の登録
                </Typography>
                
                <Card sx={{ width: '80%', m: '40px auto', boxShadow: 'none', backgroundColor: "#ECE9E9" }}>
                    <FormControl sx={{ width: '28%' }} size="small">
                        <Grid container>
                            <Grid item sx={{ flexGrow: 3 }}>
                                <InputLabel id="demo-select-small">年</InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    value={year}
                                    label="年"
                                    onChange={(event) => handleYear(event)}
                                    sx={{ width: '90%', backgroundColor: 'white' }}
                                >
                                    <MenuItem value={thisYear-1}>{thisYear-1}</MenuItem>
                                    <MenuItem value={thisYear}>{thisYear}</MenuItem>
                                    <MenuItem value={thisYear+1}>{thisYear+1}</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item sx={{ flexGrow: 1 }}>
                                <Typography component="div" sx={{ height: '20px', mt: '8px' }}>
                                    年
                                </Typography>
                            </Grid>
                        </Grid>
                    </FormControl>
                    <FormControl sx={{ width: '37%' }} size="small">
                        <Grid container>
                            <Grid item sx={{ flexGrow: 3 }}>
                                <InputLabel id="demo-select-small">月</InputLabel>
                                <Select
                                    value={month}
                                    label="月"
                                    onChange={(event) => handleMonth(event)}
                                    sx={{ width: '90%', backgroundColor: 'white' }}
                                >
                                    {months.map(mon => {
                                        return (
                                            <MenuItem key={mon} value={mon}>{mon}</MenuItem>
                                        );
                                    })}
                                </Select>
                            </Grid>
                            <Grid item sx={{ flexGrow: 1 }}>
                                <Typography component="div" sx={{ height: '20px', mt: '8px' }}>
                                    月の入学者を
                                </Typography>
                            </Grid>
                        </Grid>
                    </FormControl>
                    <FormControl sx={{ width: '34%' }} size="small">
                        <Grid container>
                            <Grid item sx={{ flexGrow: 3 }}>
                                <InputLabel id="demo-select-small">名</InputLabel>
                                <Select
                                    value={number}
                                    label="名"
                                    onChange={(event) => handleNumber(event)}
                                    sx={{ width: '90%', backgroundColor: 'white' }}
                                >
                                    {months.map(mon => {
                                        return (
                                            <MenuItem key={mon} value={mon}>{mon}</MenuItem>
                                        );
                                    })}
                                </Select>
                            </Grid>
                            <Grid item sx={{ flexGrow: 1 }}>
                                <Typography component="div" sx={{ height: '20px', mt: '8px' }}>
                                    名登録する
                                </Typography>
                            </Grid>
                        </Grid>
                    </FormControl>
                </Card>
                
                <Forms
                    password={'ltcl' + year%100 + ('0' + month).slice(-2)}
                    number={number}
                    onClose={ props.onClose } 
                    setStudents={props.setStudents} 
                    setStaffs={props.setStaffs}
                />
            </React.Fragment>
        );
    } else {
        component = (
            <React.Fragment>
                <Typography align="center" component="div" sx={{ color: '#771AF8', fontSize: '20px', fontWeight: 'bold' }}>
                    管理者の登録
                </Typography>
                
                <Table sx={{ width: '80%', m: '10px auto 0' }}>
                    <TableRow>
                        <TableCell sx={{ borderBottom: 'white', width: '180px', fontWeight: 'bold', color: '#666666', fontSize: '18px', verticalAlign: 'bottom' }}>ユーザー名</TableCell>
                        <TableCell sx={{ borderBottom: 'white' }}>
                            <Typography component="div" sx={{ color: "red", mb: 1 }}>
                                実名を登録しないでください！
                            </Typography>
                            <input id="name" type="text" className="form-control" name="name" required autoComplete="name" autoFocus/>
                            {errorName.length > 0 && 
                                <Typography component="div" sx={{ color: "red", fontSize: '14px' }}>
                                    {errorName}
                                </Typography>
                            }
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ borderBottom: 'white', width: '180px', fontWeight: 'bold', color: '#666666', fontSize: '18px' }}>パスワード</TableCell>
                        <TableCell sx={{ borderBottom: 'white' }}>
                            <input id="password" type="password" className="form-control" name="password" required autoComplete="new-password"/>
                            {errorPassword.length > 0 && 
                                <Typography component="div" sx={{ color: "red", fontSize: '14px' }}>
                                    {errorPassword}
                                </Typography>
                            }
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ borderBottom: 'white', width: '180px', fontWeight: 'bold', color: '#666666', fontSize: '18px' }}>パスワード(確認)</TableCell>
                        <TableCell sx={{ borderBottom: 'white' }}>
                            <input id="password-confirm" type="password" className="form-control" name="password_confirmation" required autoComplete="new-password"/>
                            {errorConfirmPassword.length > 0 && 
                                <Typography component="div" sx={{ color: "red", fontSize: '14px' }}>
                                    {errorConfirmPassword}
                                </Typography>
                            }
                        </TableCell>
                    </TableRow>
                </Table>
                
                <Typography align="center" component="div" sx={{ marginTop: 4, marginBottom: 3 }}>
                    <Button
                        onClick={() => handleSubmitAdmin()}
                        variant="outlined"
                        sx={{ 
                            color: '#771AF8',
                            border: '1px solid #771AF8',
                            '&:hover': { 
                                color: 'white', 
                                backgroundColor: '#771AF8',
                                border: '1px solid #771AF8',
                            }
                        }}
                    >
                        登録する
                    </Button>
                </Typography>
            </React.Fragment>
        );
    }
    
    return (
        <React.Fragment>
            <IconButton onClick={() => props.onClose()} sx={{ color: 'red', ml: '95%' }}>
                <HighlightOffIcon />
            </IconButton>
            {component}
        </React.Fragment>
    );
};

export default UserRegister;