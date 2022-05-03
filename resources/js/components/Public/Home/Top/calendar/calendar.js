import React, { useState, useEffect } from 'react';
import axios from "axios";
import useMedia from 'use-media';

import { makeStyles } from "@material-ui/styles";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';
import Typography from '@material-ui/core/Typography';
import Grid from '@mui/material/Grid';

import Info from './info';

// 各パーツのスタイル設定
const useStyles = makeStyles({
    root: {
        margin: 0,
        width: '100%',
        justifyContent: 'space-evenly',
    },
});
const styleGridWidth = { width: '50%' };
const styleHeading = {
    color: '#771AF8',
    fontWeight: 'bold',
    fontSize: 24,
    pl: '10%'
};
const styleWarningMessage = { 
    pt: 2, 
    fontSize: 20
};
const styleGridContent = { 
    width: '80%',
    margin: '0 auto'
};
const styleContent = {
    backgroundColor: '#eee',
    paddingTop: '16px',
};


/**
 * 校舎情報(カレンダー)
 */
const calendar = (props) => {
    const isWideCalender = useMedia({ minWidth: '940px' });
    const classes = useStyles();
    const [date, setDate] = useState(new Date());
    const [collegeInfo, setCollegeInfo] = useState([]);
    const [isDateClicked, setIsDateClicked] = useState(false);
    const [resError, setResError] = useState(false);
    const [exists, setExists] = useState({});
    const today = new Date();
    
    useEffect(() => {
        setResError(false);
        
        if ((date.getMonth() >= today.getMonth() - 1) && (date.getMonth() <= today.getMonth())) {
            // 指定された日付の校舎情報取得
            axios
                .get(`/react/college/${ date.getFullYear() }/${ date.getMonth() + 1 }/${ date.getDate() }`)
                .then(response => {
                    setCollegeInfo(response.data);
                    setIsDateClicked(true);
                    const existInfo = {
                        zoom: response.data.zoom.exist,
                        ontime: response.data.zoom.ontime,
                        collegeStaff: response.data.staff[0] ? true : false,
                        onlineStaff: response.data.online_staff[0] ? true : false,
                    };
                    setExists(existInfo);
                }).catch(error => {
                    setResError(true);
                    console.log(error);
                });
        }
    }, [date]);
    
    let info;
    if ((date.getMonth() >= today.getMonth() - 1) && (date.getMonth() <= today.getMonth())) {
        info = (
            <Info 
                collegeInfo={collegeInfo}
                isDateClicked={isDateClicked}
                resError={resError}
                zoomLink={props.zoomLink}
                exists={exists}
                isWide={isWideCalender}
            />
        );
    } else {
        info = (
            <Typography  component="div" sx={styleWarningMessage}>
                確認可能なのは先月、今月の情報のみです。<br />
                もう一度日付を選択し直してください。
            </Typography>
        );
    }
    
    // 940px以下ではカレンダーは表示しない
    let allInfo;
    if (isWideCalender) {
        allInfo = (
            <Grid container sx={styleGridContent}>
                <Grid item sx={styleGridWidth}>
                    { info }
                </Grid>
                <Grid item sx={styleGridWidth}>
                    <LocalizationProvider dateAdapter={ AdapterDateFns }>
                        <CalendarPicker className={classes.root} date={date} onChange={(newDate) => { setDate(newDate), setIsDateClicked(false)} } />
                    </LocalizationProvider>
                </Grid>
            </Grid>
        );
    } else {
        allInfo = info;
    }
    
    return (
        <div style={styleContent}>
            <Typography component="div" sx={styleHeading}>
                { date.getMonth() + 1 }月{ date.getDate() }日の校舎情報
            </Typography>
            
            {allInfo}
        </div>
    );
};

export default calendar;