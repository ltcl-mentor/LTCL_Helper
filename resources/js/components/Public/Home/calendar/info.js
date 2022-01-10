import React, {useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Divider from '@material-ui/core/Divider';

/**
 * 校舎情報(データ表示)
 */
function Info(props) {
    
    let info;
    if (!(props.isDateClicked)) {
        info = (
            <Typography align="center" variant="h7" component="div" sx={{ paddingTop: 2, paddingBottom: 5 }}>
                データの読み込み中です。
            </Typography>
        );
    } else {
        info = (
            <Table sx={{ minWidth: 370, paddingBottom: 5 }} aria-label="simple table">
                <TableBody>
                    <TableRow
                        key='time'
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell
                            component="th"
                            scope="row"
                            align="center"
                            sx={{
                                minWidth: "150Px",
                            }}
                        >
                            開校時間
                        </TableCell>
                        <TableCell align="center">{ props.collegeInfo.start } 〜 { props.collegeInfo.close }</TableCell>
                    </TableRow>
                    
                    <TableRow
                        key='college'
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell
                            component="th"
                            scope="row"
                            align="center"
                            sx={{
                                textAlign: "center",
                                minWidth: "150Px",
                            }}
                        >
                            校舎出勤メンター
                        </TableCell>
                        <TableCell align="center">
                            { props.collegeInfo.staff.map((staff) => (
                                <div>{ staff }</div>
                            )) }
                        </TableCell>
                    </TableRow>
                    
                    <TableRow
                        key='zoom'
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell
                            component="th"
                            scope="row"
                            align="center"
                            sx={{
                                textAlign: "center",
                                minWidth: "150Px",
                            }}
                        >
                            オンライン自習室
                        </TableCell>
                        <TableCell align="center">
                            { props.collegeInfo.zoom.map((staff) => (
                                <div>{ staff }</div>
                            )) }
                            <a href={ props.zoom_link } target="_blank">zoomのリンク一覧</a>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );
    }

    return (
        <div>
            <Divider />
            
            { info }
        </div>
    );
}

export default Info;