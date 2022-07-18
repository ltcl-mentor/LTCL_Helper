import React, { useState, useCallback } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Grid from "@mui/material/Grid";
import Card from "@material-ui/core/Card";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Forms from "./studentForm";
import ContentPC from "./responsive/userRegisterPC";
import ContentMobile from "./responsive/userRegisterMobile";
import { styleHeading } from "../modal";
import { CloseButton, SubmitButton } from "@/Components/Shared/Modal/sharedPart";
import { ModalHeading } from "@/Styles/Shared/Modal/modal";

// 各パーツのスタイル設定
const styleGridForm = { flexGrow: 3 };
const styleGridText = { flexGrow: 1 };
const styleSelect = {
    width: "90%",
    backgroundColor: "white"
};
const styleText = {
    height: "20px",
    mt: "8px"
};
const styleCard = {
    m: "40px auto",
    boxShadow: "none",
    backgroundColor: "#ECE9E9",
    width: "90%"
};

/**
 * 管理者登録
 */
const userRegister = props => {
    const history = useHistory();
    const [clickCount, setClickCount] = useState(0);
    const [errorName, setErrorName] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [number, setNumber] = useState("");
    const today = new Date();
    const thisYear = today.getFullYear();
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    let error;

    const handleYear = event => {
        setYear(event.target.value);
    };

    const handleMonth = event => {
        setMonth(event.target.value);
    };

    const handleNumber = event => {
        setNumber(event.target.value);
    };

    const handleSubmitAdmin = useCallback(() => {
        setErrorName("");
        setErrorPassword("");
        setErrorConfirmPassword("");

        if (clickCount === 0) {
            setClickCount(1);
            const name = document.getElementById("name").value;
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("password-confirm")
                .value;
            error = 0;

            // バリデーション
            // パスワード不一致
            if (password !== confirmPassword) {
                setErrorPassword("パスワードが一致しません。");
                error++;
            }

            // 名前が空欄
            if (name.length == 0) {
                setErrorName("名前を入力してください。");
                error++;
            }

            // パスワードが空欄
            if (password.length < 8) {
                setErrorPassword("パスワードは8文字以上を入力してください。");
                error++;
            }

            // 確認用パスワードが空欄
            if (confirmPassword.length < 8) {
                setErrorConfirmPassword(
                    "パスワード(確認)は8文字以上を入力してください。"
                );
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
                        props.setStudents({
                            eventList: response.data.students.data,
                            itemsCountPerPage: response.data.students.per_page,
                            totalItemsCount: response.data.students.total,
                            currentPage: response.data.students.current_page,
                            pageRangeDisplayed: 10,
                            lastPage: response.data.students.last_page
                        });
                        props.setStaffs({
                            eventList: response.data.staffs.data,
                            itemsCountPerPage: response.data.staffs.per_page,
                            totalItemsCount: response.data.staffs.total,
                            currentPage: response.data.staffs.current_page,
                            pageRangeDisplayed: 10,
                            lastPage: response.data.staffs.last_page
                        });
                        setClickCount(0);
                        props.onClose();
                        history.push("/?page=manage", {
                            type: "user",
                            status: "admin_created"
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                    setClickCount(0);
                });
        } else {
            return false;
        }
    });

    let responsive;
    if (props.isWide) {
        responsive = (
            <ContentPC
                errorName={errorName}
                errorPassword={errorPassword}
                errorConfirmPassword={errorConfirmPassword}
            />
        );
    } else {
        responsive = (
            <ContentMobile
                errorName={errorName}
                errorPassword={errorPassword}
                errorConfirmPassword={errorConfirmPassword}
            />
        );
    }

    let display;
    let form1;
    let form2;
    let form3;
    if (props.isWide) {
        form1 = { width: "28%" };
        form2 = { width: "37%" };
        form3 = { width: "34%" };
    } else {
        display = { display: "block" };
        form1 = { width: "100%" };
        form2 = { width: "100%" };
        form3 = { width: "100%" };
    }

    let component;
    if (props.value == 0) {
        component = (
            <React.Fragment>
                <ModalHeading>受講生の登録</ModalHeading>

                <Card sx={styleCard}>
                    <FormControl sx={{ ...display, ...form1 }} size="small">
                        <Grid container>
                            <Grid item sx={styleGridForm}>
                                <InputLabel id="demo-select-small">
                                    年
                                </InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    value={year}
                                    label="年"
                                    onChange={event => handleYear(event)}
                                    sx={styleSelect}
                                >
                                    <MenuItem value={thisYear - 1}>
                                        {thisYear - 1}
                                    </MenuItem>
                                    <MenuItem value={thisYear}>
                                        {thisYear}
                                    </MenuItem>
                                    <MenuItem value={thisYear + 1}>
                                        {thisYear + 1}
                                    </MenuItem>
                                </Select>
                            </Grid>
                            <Grid item sx={styleGridText}>
                                <Typography component="div" sx={styleText}>
                                    年
                                </Typography>
                            </Grid>
                        </Grid>
                    </FormControl>
                    <FormControl sx={{ ...display, ...form2 }} size="small">
                        <Grid container>
                            <Grid item sx={styleGridForm}>
                                <InputLabel id="demo-select-small">
                                    月
                                </InputLabel>
                                <Select
                                    value={month}
                                    label="月"
                                    onChange={event => handleMonth(event)}
                                    sx={styleSelect}
                                >
                                    {months.map(mon => {
                                        return (
                                            <MenuItem key={mon} value={mon}>
                                                {mon}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </Grid>
                            <Grid item sx={styleGridText}>
                                <Typography component="div" sx={styleText}>
                                    月の入学者を
                                </Typography>
                            </Grid>
                        </Grid>
                    </FormControl>
                    <FormControl sx={{ ...display, ...form3 }} size="small">
                        <Grid container>
                            <Grid item sx={styleGridForm}>
                                <InputLabel id="demo-select-small">
                                    名
                                </InputLabel>
                                <Select
                                    value={number}
                                    label="名"
                                    onChange={event => handleNumber(event)}
                                    sx={styleSelect}
                                >
                                    {months.map(mon => {
                                        return (
                                            <MenuItem key={mon} value={mon}>
                                                {mon}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </Grid>
                            <Grid item sx={styleGridText}>
                                <Typography component="div" sx={styleText}>
                                    名登録する
                                </Typography>
                            </Grid>
                        </Grid>
                    </FormControl>
                </Card>

                <Forms
                    password={"ltcl" + (year % 100) + ("0" + month).slice(-2)}
                    number={number}
                    onClose={props.onClose}
                    setStudents={props.setStudents}
                    setStaffs={props.setStaffs}
                />
            </React.Fragment>
        );
    } else {
        component = (
            <React.Fragment>
                <ModalHeading>管理者の登録</ModalHeading>
                {responsive}
                <SubmitButton
                    text="登録する"
                    handleSubmit={handleSubmitAdmin}
                />
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <CloseButton onClose={props.onClose} />
            {component}
        </React.Fragment>
    );
};

export default userRegister;
