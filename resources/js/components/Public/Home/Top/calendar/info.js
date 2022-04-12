import React, {useState, useEffect} from 'react';

import Typography from '@material-ui/core/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const styleA = {
    color: '#2196f3',
    ml: 0,
};


/**
 * 校舎情報(データ表示)
 */
const Info = (props) => {
    const [timeout, setTimeout] = useState(false);
    
    useEffect(() => {
        if (props.resError) {
            setTimeout(true);
        } else {
            setTimeout(false);
        }
    },[props.resError]);
    
    let zoom;
    if (props.exists.zoom) {
        zoom = <a className={styleA} href={ props.zoom_link } target="_blank">zoomリンク</a>;
    }

    let info;
    if (!(props.isDateClicked)) {
        if (timeout) {
            info = (
                <Typography component="div" sx={{ pt: 2, pb: 5, fontSize: 18 }}>
                    データの読み込みに失敗しました。<br/>再度お試しいただくか、メンターに直接ご確認ください。
                </Typography>
            );
        } else {
            info = (
                <Typography component="div" sx={{ pt: 2, pb: 5, fontSize: 18, pl: 2 }}>
                    データの読み込み中です。
                </Typography>
            );
        }
    } else {
        info = (
            <Table sx={{ minWidth: 370, pb: 5 }} aria-label="simple table">
                <TableBody>
                    <TableRow
                        key='time'
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell
                            component="th"
                            scope="row"
                            sx={{
                                minWidth: "150px",
                                fontWeight: 'bold',
                                fontSize: 20,
                            }}
                        >
                            開校時間
                        </TableCell>
                        <TableCell sx={{ fontSize: 18 }}>{ props.collegeInfo.start } 〜 { props.collegeInfo.close }</TableCell>
                    </TableRow>
                    
                    {props.exists.collegeStaff &&
                    <TableRow
                        key='college'
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell
                            component="th"
                            scope="row"
                            sx={{
                                minWidth: "150px",
                                fontWeight: 'bold',
                                fontSize: 18,
                            }}
                        >
                            出勤メンター<br/>(校舎)
                        </TableCell>
                        <TableCell sx={{ fontSize: 18 }}>
                            { props.collegeInfo.staff.map((staff) => (
                                <div key={staff}>{ staff }</div>
                            )) }
                        </TableCell>
                    </TableRow>
                    }
                    
                    {props.exists.onlineStaff &&
                    <TableRow
                        key='online_college'
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell
                            component="th"
                            scope="row"
                            sx={{
                                minWidth: "150px",
                                fontWeight: 'bold',
                                fontSize: 18,
                            }}
                        >
                            出勤メンター<br/>(オンライン)
                        </TableCell>
                        <TableCell sx={{ fontSize: 18 }}>
                            { props.collegeInfo.online_staff.map((staff) => (
                                <div key={staff}>{ staff }</div>
                            )) }
                        </TableCell>
                    </TableRow>
                    }
                    
                    <TableRow
                        key='zoom'
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell
                            component="th"
                            scope="row"
                            sx={{
                                minWidth: "150px",
                                fontWeight: 'bold',
                                fontSize: 18,
                            }}
                        >
                            オンライン<br/>質問部屋
                        </TableCell>
                        <TableCell sx={{ fontSize: 18 }}>
                            <div>{ props.collegeInfo.zoom.message }</div>
                            {zoom}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );
    }

    return (
        <React.Fragment>
            { info }
        </React.Fragment>
    );
};

export default Info;