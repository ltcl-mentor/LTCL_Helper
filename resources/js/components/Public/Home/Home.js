import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import axios from "axios";
import Card from '@mui/material/Card';
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Alert from '../../Alert';
import Content from '../../Layout/side-menu/content';
import Information from './information/information';
import Clendar from './calendar/calendar';
import Weather from './weather';
import Location from './location';

/**
 * トップ画面のメインコンポーネント
 */
function Home() {
    const parameter = useLocation();
    const [user, setUser] = useState([]);
    const [map_key, setMapKey] = useState();
    const [zoom_link, setZoomLink] = useState();
    const [screen_width, setScreenWidth] = useState(window.innerWidth);
    
    // windowの幅が変化した際に随時取得
    window.addEventListener('resize', function() {
        setScreenWidth(window.innerWidth);
    });
    
    // 画面描画時に実行
    useEffect(() => {
        // ログインユーザ情報取得
        axios
            .get("/react/user")
            .then(response => {
                setUser(response.data);
            }).catch(error => {
                console.log(error);
            });
        
        // マップのAPIキーとZoomのリンク一覧へのURL取得
        axios
            .get("/react/env")
            .then(response => {
                setMapKey(response.data.key);
                setZoomLink(response.data.zoom);
            }).catch(error => {
                console.log(error);
            });
    }, []);
    
    return (
        <div className="container">
            <Alert
                type={ parameter.state && parameter.state.type }
                status={ parameter.state && parameter.state.status }
            />
            
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
                            marginBottom: 5,
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
                            
                            <Information is_admin={ user.is_admin }/>
                            
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
                            
                            <Clendar 
                                zoom_link={ zoom_link }
                            />
                        </Card>
                    </Grid>
                    
                    <Grid
                        item
                        sx={{
                            width: screen_width >= 1200 ? "29%" : (screen_width >= 992 && screen_width <= 1200 ? "39%" : "100%")
                        }}
                    >
                        <Card sx={{ marginBottom: 4 }}>
                            <Location
                                map_key={ map_key }
                                screen_width={ screen_width }
                            />
                        </Card>
                        
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
