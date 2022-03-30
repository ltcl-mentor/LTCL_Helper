import React, {useState, useEffect, useContext} from 'react';
import {useLocation} from 'react-router-dom';
import axios from "axios";
import Card from '@mui/material/Card';
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import {LoginUser} from '../../Route.js';
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
    const [map_key, setMapKey] = useState();
    const [zoom_link, setZoomLink] = useState();
    const [achievement, setAchievement] = useState();
    const [events, setEvents] = useState([]);
    const [screen_width, setScreenWidth] = useState(window.innerWidth);
    
    // ログインユーザー情報取得
    const user = useContext(LoginUser);
    
    // windowの幅が変化した際に随時取得
    window.addEventListener('resize', function() {
        setScreenWidth(window.innerWidth);
    });
    
    // 画面描画時に実行
    useEffect(() => {
        
        // Home画面に必要なデータ取得
        // マップのAPIキー、Zoomのリンク一覧へのURL、質問解決率、イベント一覧
        axios
            .get("/react/home")
            .then(response => {
                setMapKey(response.data.key);
                setZoomLink(response.data.zoom);
                setAchievement(response.data.achievement);
                setEvents(response.data.events);
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
            
            { user.reply_count > 0 &&
                <Alert
                    type="info"
                    status="question"
                />
            }
            
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
                            
                            <Information
                                is_admin={ user.is_admin }
                                achievement={ achievement }
                                events={ events }
                            />
                            
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
