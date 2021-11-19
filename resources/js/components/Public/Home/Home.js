import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import axios from "axios";
import Card from '@mui/material/Card';
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Grid from '@mui/material/Grid';

import Content from '../../Layout/side-menu/content';
import Information from './information/information';
import Clendar from './calendar/calendar';
import Weather from './weather';

function Home() {
    const parameter = useLocation().search.substr(1).split('=');
    const [user, setUser] = useState([]);
    const [screen_width, setScreenWidth] = useState(window.innerWidth);
    
    window.addEventListener('resize', function() {
        setScreenWidth(window.innerWidth);
    });
    
    useEffect(() => {
        axios
            .get(`/react/user`)
            .then(response => {
                setUser(response.data);
            }).catch(error => {
                console.log(error);
            });
    }, []);
    
    let success_message;
    switch (parameter[0]) {
        case "contact":
            if (parameter[1] === "success") {
                success_message = (
                    <Alert
                        variant="outlined"
                        severity="success"
                        sx={{
                            margin: "0 auto",
                            width: "70%",
                        }}
                    >
                        <AlertTitle>Success</AlertTitle>
                        お問い合わせの送信に成功しました。
                    </Alert>
                );
            }
            break;
        
        case "question":
            if (parameter[1] === "success") {
                success_message = (
                    <Alert
                        variant="outlined"
                        severity="success"
                        sx={{
                            margin: "0 auto",
                            width: "70%",
                        }}
                    >
                        <AlertTitle>Success</AlertTitle>
                        質問の投稿に成功しました。
                    </Alert>
                );
            }
            break;
    }
    
    return (
        <div className="container">
        
            { success_message }
            
            <Box
                sx={{
                    marginTop: 3,
                }}
            >
                <Grid container spacing={2} justifyContent="center">
                    { screen_width >= 1200 &&
                        <Grid item sx={{ width: "24%" }}>
                            <Card>
                                <Content
                                    is_admin={ user.is_admin }
                                    isMenu={false}
                                />
                            </Card>
                        </Grid>
                    }
                
                    <Grid
                        item
                        sx={{
                            width: screen_width >= 1200 ? "45%" : (screen_width >= 992 && screen_width <= 1200 ? "59%" : "100%")
                        }}
                    >
                        <Card>
                            <Typography 
                                variant="h5"
                                component="div"
                                sx={{ 
                                    borderBottom: "1px solid",
                                    paddingTop: 3,
                                    marginLeft: "5%",
                                    width: "90%",
                                }}
                            >
                                お知らせ
                            </Typography>
                            
                            <Information  is_admin={ user.is_admin }/>
                            
                            <Typography
                                variant="h5"
                                component="div"
                                sx={{
                                    borderBottom: "1px solid",
                                    paddingTop: 4,
                                    marginLeft: "5%",
                                    width: "90%",
                                }}
                            >
                                校舎情報
                            </Typography>
                            
                            <Clendar />
                        </Card>
                    </Grid>
                    
                    <Grid
                        item
                        sx={{
                            width: screen_width >= 1200 ? "29%" : (screen_width >= 992 && screen_width <= 1200 ? "39%" : "100%")
                        }}
                    >
                        <Card sx={{ marginBottom: 4 }}>
                            <Weather />
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default Home;
