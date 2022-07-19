import React from "react";
import TextField from '@mui/material/TextField';
import { Warning, SubHeading } from "@/Styles/Mentor/Home/Manage/User/userRegister/responsive/content";

/**
 * userRegisterの管理者モバイル版
 */
const contentMobile = ({ input, validate, handleChange }) => {
    return (
        <React.Fragment>
            <Warning>実名を登録しないでください！</Warning>
            <div>
                <SubHeading>ユーザー名</SubHeading>
                <TextField
                    name="name"
                    value={input.name}
                    error={validate.name.error}
                    helperText={validate.name.message}
                    onChange={handleChange}
                    autoComplete="username"
                    fullWidth
                />
                <SubHeading>パスワード</SubHeading>
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
                <SubHeading>パスワード(確認)</SubHeading>
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
            </div>
        </React.Fragment>
    );
};

export default contentMobile;
