import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import useMedia from 'use-media';
import BreakingPoint from '../../../BreakingPoint';

import { LoginUser } from '../../../Route.js';
import Information from './information/information';
import Clendar from './calendar/calendar';
import ContentMobile from './footer/contentMobile';
import ContentPC from './footer/contentPC';
import Modals from "../modal";

const styleFooter = {
    backgroundColor: '#b39ddb',
    paddingTop: '16px',
};


/**
 * top画面 
 */
const Top = (props) => {
    const isWide = useMedia({ minWidth: `${BreakingPoint}px` });
    const user = useContext(LoginUser);
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("user");
    const [mapKey, setMapKey] = useState();
    const [zoomLink, setZoomLink] = useState();
    const [events, setEvents] = useState([]);
  
    // モーダル開閉
    const handleOpen = useCallback(type => {
        setOpen(true);
        setType(type);
    });
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
    
    let footerContent;
    if (isWide) {
        footerContent = <ContentPC mapKey={mapKey} handleOpen={handleOpen} />;
    } else {
        footerContent = <ContentMobile mapKey={mapKey} handleOpen={handleOpen} />;
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
                zoomLink={ zoomLink }
            />
            
            {/* お知らせと天気 */}
            <Information
                isAdmin={ user.is_admin }
                events={ events }
                isWide={ isWide }
            />
            
            {/* お問い合わせと校舎住所 */}
            <div style={styleFooter}>
                {footerContent}
            </div>
        </React.Fragment>
    );
};

export default Top;