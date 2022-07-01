import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import useMedia from "use-media";
import BreakingPoint from "../../../../Styles/BreakingPoint";

import Typography from "@material-ui/core/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { LoginUser } from "../../../Route";
import UserIndex from "./userIndex";
import { Modals } from "../modal";

// 各パーツのスタイル設定
const styleNonMember = { fontSize: 20 };
const styleContent = {
    width: "90%",
    margin: "30px auto"
};
const styleUserContent = {
    width: "100%",
    mt: 1.5
};
const styleTab = {
    borderBottom: 1,
    borderColor: "white",
    mb: 3
};
const styleTabText = {
    fontSize: 20,
    fontWeight: "bold"
};
const styleLink = {
    color: "#771AF8",
    fontSize: 20,
    textDecoration: "underline",
    cursor: "pointer"
};
const styleHeading = {
    color: "#771AF8",
    fontWeight: "bold",
    fontSize: 24
};
const styleGrid = {
    width: "65%",
    m: "30px auto"
};
const styleCard = {
    width: "180px",
    m: "0 auto 16px",
    position: "relative",
    cursor: "pointer",
    "&:before": {
        content: '""',
        pt: "100%",
        display: "block"
    }
};
const styleCardText = {
    position: "absolute",
    top: 0,
    left: 0,
    p: "10px",
    m: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
};
const styleNonEvent = {
    fontSize: 20,
    mb: 5,
    mt: 2
};

const a11yProps = index => {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`
    };
};

/**
 * 管理
 */
const Manage = () => {
    const history = useHistory();
    const isWide = useMedia({ minWidth: `${BreakingPoint}px` });
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("user");
    const [event, setEvent] = useState([]);
    const [events, setEvents] = useState([]);
    const [value, setValue] = useState(0);
    const [students, setStudents] = useState({
        eventList: [],
        currentPage: 1,
        itemsCountPerPage: 1,
        totalItemsCount: 1,
        pageRangeDisplayed: 10,
        lastPage: 0
    });
    const [staffs, setStaffs] = useState({
        eventList: [],
        currentPage: 1,
        itemsCountPerPage: 1,
        totalItemsCount: 1,
        pageRangeDisplayed: 10,
        lastPage: 0
    });
    const user = useContext(LoginUser);
    const contents = [
        {
            content: (
                <a style={{ color: "black" }} href="/questions/export">
                    直近の質問を
                    <br />
                    CSV出力
                </a>
            )
        },
        { content: "質問一括登録", onClick: () => backupQuestion() },
        { content: "受講生\n一括登録", onClick: () => backupStudent() }
    ];

    // タブ切り替え用
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // モーダル開閉
    const handleOpen = type => {
        setOpen(true);
        setType(type);
    };
    const handleClose = () => {
        setOpen(false);
        setType("user");
    };

    // 質問のバックアップ
    const backupQuestion = () => {
        if (window.confirm("質問のバックアップを復元しますか？")) {
            axios
                .post("/questions/backup")
                .then(response => {
                    if (response.status === 200) {
                        history.push("/?page=manage", {
                            type: "backup",
                            status: "question"
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    // 受講生のバックアップ
    const backupStudent = () => {
        if (window.confirm("受講生を一括登録しますか？")) {
            axios
                .post("/users/backup")
                .then(response => {
                    if (response.status === 200) {
                        setStudents({
                            eventList: response.data.students.data,
                            itemsCountPerPage: response.data.students.per_page,
                            totalItemsCount: response.data.students.total,
                            currentPage: response.data.students.current_page,
                            pageRangeDisplayed: 10,
                            lastPage: response.data.students.last_page
                        });
                        history.push("/?page=manage", {
                            type: "backup",
                            status: "student"
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    let width;
    if (isWide) {
        width = { width: "33%" };
    } else {
        width = { width: "100%" };
    }

    // masterアカウント限定機能一覧
    let master;
    if (user.id == 1 && user.name === "master") {
        master = (
            <React.Fragment>
                <Typography component="div" sx={styleHeading}>
                    データ出力・一括登録
                </Typography>

                <Grid container sx={styleGrid}>
                    {contents.map(content => {
                        return (
                            <Grid item sx={width} key={content.content}>
                                <Card sx={styleCard} onClick={content.onClick}>
                                    <Typography
                                        align="center"
                                        variant="h5"
                                        component="div"
                                        sx={styleCardText}
                                    >
                                        {content.content}
                                    </Typography>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </React.Fragment>
        );
    }

    // イベント一覧
    let eventComponent;
    if (events.length > 0) {
        eventComponent = (
            <Grid container sx={styleGrid}>
                {events.map(event => {
                    return (
                        <Grid
                            item
                            sx={width}
                            key={`id${event.id}-${event.name}`}
                        >
                            <Card
                                sx={styleCard}
                                onClick={() => {
                                    handleOpen("show_event"), setEvent(event);
                                }}
                            >
                                <Typography
                                    align="center"
                                    variant="h5"
                                    component="div"
                                    sx={styleCardText}
                                >
                                    {event.name}
                                </Typography>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        );
    } else {
        eventComponent = (
            <Typography align="center" component="div" sx={styleNonEvent}>
                登録されているイベントはありません。
            </Typography>
        );
    }

    // ユーザー一覧
    let component;
    if (value == 0) {
        if (students.eventList.length !== 0) {
            component = (
                <UserIndex
                    users={students}
                    account={
                        user.id == 1 && user.name == "master" ? "master" : ""
                    }
                    type="student"
                    setStudents={setStudents}
                    setStaffs={setStaffs}
                />
            );
        } else {
            component = (
                <Typography align="center" component="div" sx={styleNonMember}>
                    登録されている受講生はいません
                </Typography>
            );
        }
    } else {
        if (staffs.eventList.length > 0) {
            component = (
                <UserIndex
                    users={staffs}
                    account={
                        user.id == 1 && user.name == "master" ? "master" : ""
                    }
                    type="staff"
                    setStudents={setStudents}
                    setStaffs={setStaffs}
                />
            );
        } else {
            component = (
                <Typography align="center" component="div" sx={styleNonMember}>
                    登録されているスタッフはいません
                </Typography>
            );
        }
    }

    useEffect(() => {
        axios
            .get(`/react/mentor`)
            .then(response => {
                setEvents(response.data.events);
                setStaffs({
                    eventList: response.data.staffs.data,
                    itemsCountPerPage: response.data.staffs.per_page,
                    totalItemsCount: response.data.staffs.total,
                    currentPage: response.data.staffs.current_page,
                    pageRangeDisplayed: 10,
                    lastPage: response.data.staffs.last_page
                });
                setStudents({
                    eventList: response.data.students.data,
                    itemsCountPerPage: response.data.students.per_page,
                    totalItemsCount: response.data.students.total,
                    currentPage: response.data.students.current_page,
                    pageRangeDisplayed: 10,
                    lastPage: response.data.students.last_page
                });
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div style={styleContent}>
            <Modals
                open={open}
                type={type}
                handleClose={handleClose}
                setStaffs={setStaffs}
                setStudents={setStudents}
                event={event}
                value={value}
                setEvents={setEvents}
            />

            {/* イベント一覧 */}
            <Typography component="div" sx={styleHeading}>
                イベント一覧
            </Typography>

            <Typography
                align="right"
                component="div"
                sx={styleLink}
                onClick={() => handleOpen("add_event")}
            >
                イベント追加
            </Typography>

            {eventComponent}

            {/* master限定機能 */}
            {master}

            {/* ユーザー一覧 */}
            <Typography component="div" sx={styleHeading}>
                ユーザー一覧
            </Typography>

            <Typography
                align="right"
                component="div"
                sx={styleLink}
                onClick={() => handleOpen("user")}
            >
                ユーザー追加
            </Typography>

            <Box sx={styleUserContent}>
                <Box sx={styleTab}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                    >
                        <Tab
                            label="受講生"
                            {...a11yProps(0)}
                            sx={styleTabText}
                        />
                        <Tab
                            label="管理者"
                            {...a11yProps(1)}
                            sx={styleTabText}
                        />
                    </Tabs>
                </Box>
                {component}
            </Box>
        </div>
    );
};

export default Manage;
