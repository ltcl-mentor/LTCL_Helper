import React, {useState, useEffect} from 'react';
import axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

/**
 * 該当質問の基礎データ
 */
function Parameters(props) {
    
    let isPublic;
    if (props.check === 0) {
        isPublic = "非公開";
    } else {
        isPublic = "公開";
    }
    
    return (
        <Paper sx={{ marginTop: 3 }}>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell align="center" component="th" scope="row">カテゴリー</TableCell>
                        <TableCell align="center">{ props.category }</TableCell>
                    </TableRow>
                        
                    <TableRow>
                        <TableCell align="center" component="th" scope="row">トピック</TableCell>
                        <TableCell align="center">{ props.topic }</TableCell>
                    </TableRow>
                        
                    <TableRow>
                        <TableCell align="center" component="th" scope="row">カリキュラム番号</TableCell>
                        <TableCell align="center">{ props.curriculum_number }</TableCell>
                    </TableRow>
                    
                    <TableRow>
                        <TableCell align="center" component="th" scope="row">作成者</TableCell>
                        <TableCell align="center">{ props.author }</TableCell>
                    </TableRow>
                
                    <TableRow>
                        <TableCell align="center" component="th" scope="row">公開状況</TableCell>
                        <TableCell align="center">{ isPublic }</TableCell>
                    </TableRow>
                    
                    <TableRow>
                        <TableCell align="center" component="th" scope="row">質問内容</TableCell>
                        <TableCell align="center">{ props.question }</TableCell>
                    </TableRow>
                    
                    <TableRow>
                        <TableCell align="center" component="th" scope="row">質問へのコメント</TableCell>
                        <TableCell align="center">{ props.comment }</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    );
}

export default Parameters;