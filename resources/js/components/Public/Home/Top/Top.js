import React, { useState, useEffect, useContext } from 'react';
// import { useHistory } from 'react-router-dom';
import axios from 'axios';
import useMedia from 'use-media';
import BreakingPoint from '../../../BreakingPoint';

import Grid from '@mui/material/Grid';
import Typography from '@material-ui/core/Typography';

import { LoginUser } from '../../../Route.js';
import Information from './information/information';
import Clendar from './calendar/calendar';
import Location from './location';
import Modals from "../modal";


/**
 * top画面 
 */
const Top = (props) => {
    const isWide = useMedia({ minWidth: `${BreakingPoint}px` });
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("user");
    const [map_key, setMapKey] = useState();
    const [zoom_link, setZoomLink] = useState();
    const [events, setEvents] = useState([]);
    // const history = useHistory();
    
    // ログインユーザー情報取得
    const user = useContext(LoginUser);
    
    // お問い合わせページへ遷移
    // const contact = () => {
    //     history.push('/contact');
    // };
    
    const handleOpen = type => {
        setOpen(true);
        setType(type);
    };

    const handleClose = () => {
        setOpen(false);
        setType("user");
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
    
    let footer;
    if (isWide) {
        footer = (
            <Grid columns={16} container sx={{ width: '80%', ml: 'auto', mr: 'auto' }}>
                <Grid sx={{ width: '50%' }} item>
                    <Typography component="div" sx={{ color: 'white', fontWeight: 'bold', fontSize: 26 }}>
                        <img src="images/helper_logo.png" width='165px' height='45px' style={{ marginTop: '5px' }} />
                    </Typography>
                    <Typography 
                        onClick={() => handleOpen('contact')}
                        component="div"
                        sx={{ 
                            color: 'black',
                            fontWeight: 'bold',
                            fontSize: 20,
                            pt: 3,
                            cursor: "pointer",
                            "&:hover": {
                                color: '#771AF8',
                            }
                        }}
                    >
                        お問い合わせ
                    </Typography>
                </Grid>
                <Grid sx={{ width: '50%' }} item>
                    <Location
                        map_key={ map_key }
                    />
                </Grid>
            </Grid>
        );
    } else {
        footer = (
            <div style={{ width: '80%', margin: '0 auto' }}>
                <Typography component="div" sx={{ color: 'white', fontWeight: 'bold', fontSize: 26 }}>
                    <img src="images/helper_logo.png" width='165px' height='45px' style={{ marginTop: '5px' }} />
                </Typography>
                <Typography 
                    onClick={() => handleOpen('contact')}
                    component="div"
                    sx={{ 
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: 20,
                        pt: 2,
                        pb: 2,
                        cursor: "pointer",
                        "&:hover": {
                            color: '#771AF8',
                        }
                    }}
                >
                    お問い合わせ
                </Typography>
                <Location
                    map_key={ map_key }
                />
            </div>
        );
    }
    
    return (
        <React.Fragment>
            <Modals
                open={open}
                type={type}
                handleClose={handleClose}
            />
        
            {/* 校舎情報 */}
            <Clendar 
                zoom_link={ zoom_link }
            />
            
            {/* お知らせと天気 */}
            <Information
                is_admin={ user.is_admin }
                events={ events }
                isWide={ isWide }
            />
            
            {/* お問い合わせと校舎住所 */}
            <div className="footer">
                {footer}
            </div>
        </React.Fragment>
    );
};

export default Top;