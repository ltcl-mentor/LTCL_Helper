import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TextField from '@mui/material/TextField';
import { StyleTable, TBody, TableHead, Warning } from '@/Styles/Mentor/Home/Manage/User/userRegister/responsive/content';

/**
 * userRegisterの管理者PC版
 */
const contentPC = ({ input, validate, handleChange }) => {
    return (
        <StyleTable>
            <TableBody>
                <TableRow>
                    <TableHead>ユーザー名</TableHead>
                    <TBody>
                        <Warning>実名を登録しないでください！</Warning>
                        <TextField
                            name="name"
                            value={input.name}
                            error={validate.name.error}
                            helperText={validate.name.message}
                            onChange={handleChange}
                            autoComplete="username"
                            fullWidth
                        />
                    </TBody>
                </TableRow>
                <TableRow>
                    <TableHead>パスワード</TableHead>
                    <TBody>
                        <TextField
                            name="password"
                            value={input.password}
                            error={validate.password.error}
                            helperText={validate.password.message}
                            onChange={handleChange}
                            type="password"
                            autoComplete="current-password"
                            fullWidth
                        />
                    </TBody>
                </TableRow>
                <TableRow>
                    <TableHead>パスワード(確認)</TableHead>
                    <TBody>
                        <TextField
                            name="confirmPassword"
                            value={input.confirmPassword}
                            error={validate.confirmPassword.error}
                            helperText={validate.confirmPassword.message}
                            onChange={handleChange}
                            type="password"
                            autoComplete="current-password"
                            fullWidth
                        />
                    </TBody>
                </TableRow>
            </TableBody>
        </StyleTable>
    );
};

export default contentPC;
