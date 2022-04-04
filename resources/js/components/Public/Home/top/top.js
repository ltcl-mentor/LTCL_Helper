import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';

import { LoginUser } from '../../../Route.js';
import Information from './information/information';
import Clendar from './calendar/calendar';
import Footer from './footer';


/**
 * top画面 
 */
const Top = (props) => {
    const [map_key, setMapKey] = useState();
    const [zoom_link, setZoomLink] = useState();
    const [events, setEvents] = useState([]);
    
    // ログインユーザー情報取得
    const user = useContext(LoginUser);
    
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
            <Clendar 
                zoom_link={ zoom_link }
            />
            <Information
                is_admin={ user.is_admin }
                events={ events }
            />
            <Footer map_key={map_key} />
        </React.Fragment>
    );
};

export default Top;