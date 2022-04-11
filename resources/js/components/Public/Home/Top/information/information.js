import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import Grid from '@mui/material/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@mui/material/Button';

import Modals from '../../modal';
import Infos from './infos';
import Weather from '../weather';
import { LoginUser } from '../../../../Route';


/**
 * お知らせ
 */
const Information = (props) => {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("user");
    const [dates, setDates] = useState([]);
    const [infos, setInfos] = useState([]);
    const [events, setEvents] = useState([]);
    const user = useContext(LoginUser);
    
    const handleOpen = (type) => {
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
            }).catch(error => {
                console.log(error);
            });
    }, []);
    
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
            
            <Grid columns={16} container sx={{ width: '80%', ml: 'auto', mr: 'auto' }}>
                <Grid xs={8} item>
                    <Typography component="div" sx={{ color: '#771AF8', fontWeight: 'bold', fontSize: 24, pl: 2 }}>
                        お知らせ
                        {user.is_admin == "staff" &&
                            <Button 
                                sx={{ verticalAlign: 'top', color: '#771AF8', '&:hover': { backgroundColor: 'white', textDecoration: 'underline' } }}
                                onClick={() => handleOpen("create_info")}
                            >
                                お知らせを追加する
                            </Button>
                        }
                    </Typography>
                    <Infos
                        is_admin={ props.is_admin }
                        dates={dates}
                        infos={infos}
                        setDates={setDates}
                        setInfos={setInfos}
                    />
                </Grid>
                <Grid xs={8} item>
                    <Weather />
                </Grid>
            </Grid>
        </div>
    );
};

export default Information;