import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import Grid from '@mui/material/Grid';
import Typography from '@material-ui/core/Typography';

import { LoginUser } from '../../../Route.js';
import Information from './information/information';
import Clendar from './calendar/calendar';
import Location from './location';


/**
 * top画面 
 */
const Top = (props) => {
    const [map_key, setMapKey] = useState();
    const [zoom_link, setZoomLink] = useState();
    const [events, setEvents] = useState([]);
    const history = useHistory();
    
    // ログインユーザー情報取得
    const user = useContext(LoginUser);
    
    // お問い合わせページへ遷移
    const contact = () => {
        history.push('/contact');
    };
    
    // 画面描画時に実行
    useEffect(() => {
        // Home画面に必要なデータ取得
        // マップのAPIキー、Zoomのリンク一覧へのURL、イベント一覧
        axios
            .get("/react/home")
            .then(response => {
                setMapKey(response.data.key);
                setZoomLink(response.data.zoom);
                setEvents(response.data.events);
            }).catch(error => {
                console.log(error);
            });
    }, []);
    
    return (
        <React.Fragment>
        
            {/* 校舎情報 */}
            <Clendar 
                zoom_link={ zoom_link }
            />
            
            {/* お知らせと天気 */}
            <Information
                is_admin={ user.is_admin }
                events={ events }
            />
            
            {/* お問い合わせと校舎住所 */}
            <div className="footer">
                <Grid columns={16} container sx={{ width: '80%', ml: 'auto', mr: 'auto' }}>
                    <Grid xs={8} item>
                        <Typography component="div" sx={{ color: 'white', fontWeight: 'bold', fontSize: 26, pl: 2 }}>
                            LTCL Helper
                        </Typography>
                        <Typography 
                            onClick={() => contact()}
                            component="div"
                            sx={{ 
                                color: 'black',
                                fontWeight: 'bold',
                                fontSize: 20,
                                pl: 2,
                                pt: 3,
                                "&:hover": {
                                    cursor: "pointer",
                                    color: '#771AF8',
                                }
                            }}
                        >
                            お問い合わせ
                        </Typography>
                    </Grid>
                    <Grid xs={8} item>
                        <Location
                            map_key={ map_key }
                        />
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    );
};

export default Top;