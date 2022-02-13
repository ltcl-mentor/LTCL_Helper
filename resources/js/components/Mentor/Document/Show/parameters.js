import React, {useState, useEffect} from 'react';
import axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

/**
 * 記事の基本情報
 */
function Parameters(props) {
    
    let targets = "";
    props.targets.map((target) => {
        if(target || target !== false) {
            if(targets.length === 0) {
                targets += target;
            } else {
                targets += `、` + target;
            }
        }
    });
    
    return (
        <Paper>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell align="center" component="th" scope="row">記事タイトル</TableCell>
                        <TableCell align="center">{ props.title }</TableCell>
                    </TableRow>
                    
                    <TableRow>
                        <TableCell align="center" component="th" scope="row">対象者</TableCell>
                        <TableCell align="center">{ targets }</TableCell>
                    </TableRow>
                    
                    <TableRow>
                        <TableCell align="center" component="th" scope="row">記事URL</TableCell>
                        <TableCell align="center"><a href={ props.link } target="_blank">{ props.link }</a></TableCell>
                    </TableRow>
                    
                    <TableRow>
                        <TableCell align="center" component="th" scope="row">作成者</TableCell>
                        <TableCell align="center">{ props.author }</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    );
}

export default Parameters;