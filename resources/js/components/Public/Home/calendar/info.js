import React, {useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';

function Info(props) {
    
    let info;
    if(!(props.isDateClicked)){
        info = (
            <Typography align="center" variant="h7" component="div" sx={{ paddingTop: 2 }}>
                データの読み込み中です。
            </Typography>
        );
    }else{
        info = (
            <div>
                <Typography align="center" variant="h7" component="div" sx={{ paddingTop: 2 }}>
                    開校時間：{ props.collegeInfo.start } 〜 { props.collegeInfo.close }
                </Typography>
                <Typography align="center" variant="h7" component="div" sx={{ paddingTop: 2 }}>
                    <div>校舎出勤メンター：</div>
                    { props.collegeInfo.staff.map((staff) => (
                        <div>{ staff }</div>
                    )) }
                    <div>オンライン自習室</div>
                    { props.collegeInfo.zoom.map((staff) => (
                        <div>{ staff }</div>
                    )) }
                </Typography>
            </div>
        );
    }

    return (
        <div>{ info }</div>
    );
}

export default Info;