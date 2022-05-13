import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";

import Breadcrumbs from "../../Breadcrumbs";
import "../../../../../public/css/Public/history.css";

/**
 * 質問閲覧履歴のメインコンポーネント
 */
function History() {
    const [questions, setQuestions] = useState({
        eventList: [],
        currentPage: 1,
        itemsCountPerPage: 1,
        totalItemsCount: 1,
        pageRangeDisplayed: 9,
        lastPage: 0
    });
    const [expanded, setExpanded] = useState(false);
    const [two_week_days, setTwoWeekDays] = useState();
    const [todayData, setTodayData] = useState("");

    // 画面描画時に実行
    useEffect(() => {
        // 直近2週間の日付取得
        const today = new Date();
        const todayDataString =
            today.getFullYear() +
            `-` +
            ("0" + (today.getMonth() + 1)).slice(-2) +
            `-` +
            (`0` + today.getDate()).slice(-2);
        var days = [];

        for (let day_count = 0; day_count <= 14; day_count++) {
            const day = new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate() - day_count
            );
            days.push(
                day.getFullYear() +
                    `-` +
                    ("0" + (day.getMonth() + 1)).slice(-2) +
                    `-` +
                    (`0` + day.getDate()).slice(-2)
            );
        }

        setTodayData(todayDataString);
        setTwoWeekDays(days);
    }, []);

    // 画面描画時に実行
    useEffect(() => {
        // ログインユーザの質問閲覧履歴取得
        axios
            .get("/react/history")
            .then(response => {
                setQuestions({
                    eventList: response.data.data,
                    itemsCountPerPage: response.data.per_page,
                    totalItemsCount: response.data.total,
                    currentPage: response.data.current_page,
                    pageRangeDisplayed: 10,
                    lastPage: response.data.last_page
                });
                console.log(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    let histories;
    let flag = true;
    if (two_week_days) {
        histories = two_week_days.map(day => {
            flag = true;
            if (questions.eventList[0]) {
                if (
                    day <= questions.eventList[0].whenClicked.substr(0, 10) &&
                    day >=
                        questions.eventList[
                            questions.eventList.length - 1
                        ].whenClicked.substr(0, 10)
                ) {
                    return (
                        <Box sx={{ marginBottom: 6 }}>
                            <Box>
                                {todayData == day ? (
                                    <Typography
                                        sx={{
                                            width: "33%",
                                            flexShrink: 0,
                                            marginBottom: 2
                                        }}
                                        variant="h5"
                                    >
                                        今日（{day}）
                                    </Typography>
                                ) : (
                                    <Typography
                                        sx={{
                                            width: "33%",
                                            flexShrink: 0,
                                            marginBottom: 2
                                        }}
                                        variant="h5"
                                    >
                                        {day}
                                    </Typography>
                                )}
                            </Box>
                            <Paper>
                                <TableContainer sx={{ marginBottom: 2 }}>
                                    <Table
                                        stickyHeader
                                        aria-label="sticky table"
                                    >
                                        <TableBody>
                                            {questions.eventList.map(
                                                question => {
                                                    if (
                                                        question.whenClicked.substr(
                                                            0,
                                                            10
                                                        ) === day
                                                    ) {
                                                        flag = false;
                                                        return (
                                                            <TableRow
                                                                hover
                                                                role="checkbox"
                                                                tabIndex={-1}
                                                                key={`id-${question.id}:${question.created_at}`}
                                                            >
                                                                <TableCell align="center">
                                                                    {question.is_resolved ? (
                                                                        <font color="green">
                                                                            解決済み
                                                                        </font>
                                                                    ) : (
                                                                        <font color="red">
                                                                            未解決
                                                                        </font>
                                                                    )}
                                                                </TableCell>
                                                                <TableCell
                                                                    align="left"
                                                                    sx={{
                                                                        width:
                                                                            "60%"
                                                                    }}
                                                                >
                                                                    <Link
                                                                        to={
                                                                            "/my_page/questions/" +
                                                                            question.id
                                                                        }
                                                                        style={{
                                                                            color:
                                                                                "black"
                                                                        }}
                                                                    >
                                                                        {question
                                                                            .title
                                                                            .length >
                                                                        31
                                                                            ? question.title.substring(
                                                                                  0,
                                                                                  30
                                                                              ) +
                                                                              "..."
                                                                            : question.title}
                                                                    </Link>
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    {question.check ? (
                                                                        <font color="blue">
                                                                            公開中
                                                                        </font>
                                                                    ) : (
                                                                        <font color="red">
                                                                            非公開
                                                                        </font>
                                                                    )}
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    {question.reply ? (
                                                                        <Link
                                                                            to={
                                                                                "/my_page/questions/" +
                                                                                question.id
                                                                            }
                                                                        >
                                                                            <font color="red">
                                                                                返信可
                                                                            </font>
                                                                        </Link>
                                                                    ) : (
                                                                        <Link
                                                                            to={
                                                                                "/my_page/questions/" +
                                                                                question.id
                                                                            }
                                                                        >
                                                                            <font>
                                                                                返信待ち
                                                                            </font>
                                                                        </Link>
                                                                    )}
                                                                </TableCell>
                                                            </TableRow>
                                                        );
                                                    }
                                                }
                                            )}
                                            {flag && (
                                                <TableRow
                                                    hover
                                                    role="checkbox"
                                                    tabIndex={-1}
                                                >
                                                    <TableCell align="left">
                                                        <Typography
                                                            sx={{
                                                                marginLeft: "5%"
                                                            }}
                                                        >
                                                            閲覧履歴はありません
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </Box>
                    );
                }
            }
        });
    }

    const handlePageClick = (event, index) => {
        // 検索結果の質問取得
        axios
            .get(`/react/history?page=${index}`)
            .then(response => {
                setQuestions({
                    eventList: response.data.data,
                    itemsCountPerPage: response.data.per_page,
                    totalItemsCount: response.data.total,
                    currentPage: response.data.current_page,
                    pageRangeDisplayed: 10,
                    lastPage: response.data.last_page
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    let pagination;

    pagination = (
        <Pagination
            count={questions.lastPage}
            page={questions.currentPage}
            onChange={handlePageClick}
            sx={{ display: "block" }}
        />
    );

    return (
        <div className="container">
            <Breadcrumbs page="history" />
            <Typography
                sx={{ fontSize: "24px", color: "#771AF8", fontWeight: "bold" }}
            >
                質問閲覧履歴
            </Typography>
            {histories}
            <Grid
                container
                justifyContent="center"
                sx={{ marginTop: 1, marginBottom: 2 }}
            >
                <Grid item>{pagination}</Grid>
            </Grid>
        </div>
    );
}

export default History;
