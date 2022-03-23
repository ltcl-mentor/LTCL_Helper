import React, {useState, useEffect} from 'react';
import axios from "axios";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';
import Typography from '@material-ui/core/Typography';
import Info from './info';

/**
 * 校舎情報(カレンダー)
 */
function Calendar(props) {
    const [date, setDate] = useState(new Date());
    const [collegeInfo, setCollegeInfo] = useState([]);
    const [isDateClicked, setIsDateClicked] = useState(false);
    const [resError, setResError] = useState(false);
    const [zoom_exist, setZoomExist] = useState(false);
    const today = new Date();
    
    useEffect(() => {
        setResError(false);
        
        if ( (date.getMonth() >= today.getMonth() - 1) && (date.getMonth() <= today.getMonth()) ) {
            // 指定された日付の校舎情報取得
            axios
                .get(`/react/college/${ date.getFullYear() }/${ date.getMonth() + 1 }/${ date.getDate() }`)
                .then(response => {
                    setCollegeInfo(response.data);
                    setIsDateClicked(true);
                    const exist = response.data.zoom.exist == "あり" ? true : false;
                    setZoomExist(exist);
                }).catch(error => {
                    setResError(true);
                    console.log(error);
                });
        }
    }, [date]);
    
    let info;
    if ( (date.getMonth() >= today.getMonth() - 1) && (date.getMonth() <= today.getMonth()) ) {
        info = (
            <Info 
                collegeInfo={ collegeInfo }
                isDateClicked={ isDateClicked }
                resError={ resError }
                zoom_link={ props.zoom_link }
                zoom_exist={ zoom_exist }
            />
        );
        
    } else {
        info = (
            <Typography align="center" variant="h7" component="div" sx={{ paddingTop: 2 }}>
                確認可能なのは先月、今月の情報のみです。<br />
                もう一度日付を選択し直してください。
            </Typography>
        );
        
    }
    
    return (
        <div>
            <LocalizationProvider dateAdapter={ AdapterDateFns }>
                <CalendarPicker date={ date } onChange={ (newDate) => { setDate(newDate), setIsDateClicked(false) } } />
            </LocalizationProvider>
        
            <Typography align="center" variant="h6" component="div" >
                { date.getMonth() + 1 }月{ date.getDate() }日の校舎情報
            </Typography>
            
            { info }
        </div>
    );
}

export default Calendar;