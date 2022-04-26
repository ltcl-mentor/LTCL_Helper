import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import Grid from "@mui/material/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@mui/material/Button";

import Modals from "../../modal";
import Infos from "./infos";
import Weather from "../weather";
import { LoginUser } from "../../../../Route";

/**
 * お知らせ
 */
const Information = props => {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("user");
    const [dates, setDates] = useState([]);
    const [infos, setInfos] = useState([]);
    const [events, setEvents] = useState([]);
    const user = useContext(LoginUser);

    const handleOpen = type => {
        setOpen(true);
        setType(type);
    };

    const handleClose = () => {
        setOpen(false);
        setType("user");
    };

    useEffect(() => {
        axios
            .get(`/react/infos`)
            .then(response => {
                setInfos(response.data.infos.infos);
                setDates(response.data.infos.dates);
                setEvents(response.data.events);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    
    let information;
    if (props.isWide) {
        information = (
            <Grid
                columns={16}
                container
                sx={{ width: "80%", ml: "auto", mr: "auto" }}
            >
                <Grid sx={{ width: '50%' }} item>
                    <Infos
                        is_admin={props.is_admin}
                        dates={dates}
                        infos={infos}
                        setDates={setDates}
                        setInfos={setInfos}
                        isWide={props.isWide}
                    />
                </Grid>
                <Grid sx={{ width: '50%' }} item>
                    <Weather isWide={props.isWide} />
                </Grid>
            </Grid>
        );
    } else {
        information = (
            <div style={{ width: '90%', margin: '0 auto' }}>
                <Infos
                    is_admin={props.is_admin}
                    dates={dates}
                    infos={infos}
                    setDates={setDates}
                    setInfos={setInfos}
                />
                <Typography
                    component="div"
                    sx={{
                        color: "#771AF8",
                        fontWeight: "bold",
                        fontSize: 24,
                        pl: '6%'
                    }}
                >
                    天気情報
                </Typography>
                <Weather isWide={props.isWide} />
            </div>
        );
    }

    return (
        <div className="information">
            <Modals
                open={open}
                type={type}
                handleClose={handleClose}
                events={events}
                setInfos={setInfos}
                setDates={setDates}
            />

            <Typography
                component="div"
                sx={{
                    color: "#771AF8",
                    fontWeight: "bold",
                    fontSize: 24,
                    pl: '10%'
                }}
            >
                お知らせ
                {user.is_admin == "staff" && (
                    <Button
                        sx={{
                            verticalAlign: "top",
                            color: "#771AF8",
                            "&:hover": {
                                backgroundColor: "white",
                                textDecoration: "underline"
                            }
                        }}
                        onClick={() => handleOpen("create_info")}
                    >
                        お知らせを追加する
                    </Button>
                )}
            </Typography>
            
            {information}
        </div>
    );
};

export default Information;
