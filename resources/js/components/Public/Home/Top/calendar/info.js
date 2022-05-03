import React, {useState, useEffect} from 'react';
import useMedia from 'use-media';

import Typography from '@material-ui/core/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

// 各パーツのスタイル設定
const styleTableRow = { '&:last-child td, &:last-child th': { border: 0 } };
const styleTableCell = { fontSize: 18 };
const styleA = {
    color: '#2196f3',
    marginLeft: 0,
};
const styleWarningMessage = {
    pt: 2,
    pb: 5,
    fontSize: 18,
    pl: '10%'
};
const styleThLarge = {
    minWidth: "150px",
    fontWeight: 'bold',
    fontSize: 20,
};
const styleThSmall = {
    minWidth: "150px",
    fontWeight: 'bold',
    fontSize: 18,
};
const styleTablePC = { 
    width: '100%',
    pb: 5
};
const styleTableMobile = {
    width: '80%',
    margin: '0 auto',
    pb: 5
};


/**
 * 校舎情報(データ表示)
 */
const info = (props) => {
    const [timeout, setTimeout] = useState(false);
    const isWide = useMedia({ minWidth: '545px' });
    
    useEffect(() => {
        if (props.resError) {
            setTimeout(true);
        } else {
            setTimeout(false);
        }
    },[props.resError]);
    
    // 開校時間中のみzoomリンクを表示
    let zoom;
    if (props.exists.zoom) {
        if (props.exists.ontime) {
            zoom = <a style={styleA} href={ props.zoomLink } target="_blank">zoomリンク</a>;
        } else {
            if (isWide) {
                zoom = <p>現在は開校時間ではありません</p>;
            } else {
                zoom = <p>現在は開校時間では<br/>ありません</p>;
            }
        }
    }

    let info;
    if (!(props.isDateClicked)) {
        if (timeout) {
            info = (
                <Typography component="div" sx={styleWarningMessage}>
                    データの読み込みに失敗しました。<br/>再度お試しいただくか、メンターに直接ご確認ください。
                </Typography>
            );
        } else {
            info = (
                <Typography component="div" sx={styleWarningMessage}>
                    データの読み込み中です。
                </Typography>
            );
        }
    } else {
        info = (
            <Table sx={props.isWide ? styleTablePC : styleTableMobile} aria-label="simple table">
                <TableBody>
                    <TableRow key='time' sx={styleTableRow}>
                        <TableCell component="th" scope="row" sx={styleThLarge}>
                            開校時間
                        </TableCell>
                        <TableCell sx={styleTableCell}>{ props.collegeInfo.start } 〜 { props.collegeInfo.close }</TableCell>
                    </TableRow>
                    
                    {props.exists.collegeStaff &&
                        <TableRow key='college' sx={styleTableRow}>
                            <TableCell component="th" scope="row" sx={styleThSmall}>
                                出勤メンター<br/>(校舎)
                            </TableCell>
                            <TableCell sx={styleTableCell}>
                                {props.collegeInfo.staff.map((staff) => (
                                    <div key={staff}>{staff}</div>
                                ))}
                            </TableCell>
                        </TableRow>
                    }
                    
                    {props.exists.onlineStaff &&
                        <TableRow key='online_college' sx={styleTableRow}>
                            <TableCell component="th" scope="row" sx={styleThSmall}>
                                出勤メンター<br/>(オンライン)
                            </TableCell>
                            <TableCell sx={styleTableCell}>
                                {props.collegeInfo.online_staff.map((staff) => (
                                    <div key={staff}>{staff}</div>
                                ))}
                            </TableCell>
                        </TableRow>
                    }
                    
                    <TableRow key='zoom' sx={styleTableRow}>
                        <TableCell component="th" scope="row" sx={styleThSmall}>
                            オンライン<br/>質問部屋
                        </TableCell>
                        <TableCell sx={styleTableCell}>
                            <div>{props.collegeInfo.zoom.message}</div>
                            {zoom}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );
    }

    return (
        <React.Fragment>
            {info}
        </React.Fragment>
    );
};

export default info;