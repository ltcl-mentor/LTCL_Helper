import React, {useState, useEffect} from 'react';
import axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

/**
 * 質問の基本データ
 * （カテゴリー、トピック、作成者など）
 */
function Parameters(props) {
    
    return (
        <Paper sx={{ marginBottom: 2 }}>
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
                        <TableCell align="center">{ props.check ? "公開中" : "非公開" }</TableCell>
                    </TableRow>
                    
                    <TableRow>
                        <TableCell align="center" component="th" scope="row">ステータス</TableCell>
                        <TableCell align="center">{ props.is_resolved ? "解決済み" : "未解決" }</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    );
}

export default Parameters;