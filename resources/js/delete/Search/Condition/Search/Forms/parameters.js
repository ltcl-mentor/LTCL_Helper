import React from 'react';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Box from '@mui/material/Box';

/**
 * 絞り込みの条件を表示
 */
function Parameters(props) {
    return (
        <Box sx={{ minWidth: "400px", maxWidth: "400px", border: "1px solid black" }}>
            <Typography
                variant="h6"
                component="div"
                align="center"
                sx={{ marginTop: 2 }}
            >
                検索条件
            </Typography>
                
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell align="center" component="th" scope="row">カテゴリー</TableCell>
                        <TableCell align="center">{ props.category !== '' && props.categories[props.category] }</TableCell>
                    </TableRow>
                    
                    <TableRow>
                        <TableCell align="center" component="th" scope="row">トピック</TableCell>
                        <TableCell align="center">{ props.topic !== '' && props.topics[props.topic] }</TableCell>
                    </TableRow>
                    
                    <TableRow>
                        <TableCell align="center" component="th" scope="row">カリキュラム番号</TableCell>
                        <TableCell align="center">{ props.curriculum_number !== '' && props.curriculum_number }</TableCell>
                    </TableRow>
                    
                    <TableRow>
                        <TableCell align="center" component="th" scope="row">キーワード</TableCell>
                        <TableCell align="center">{ props.keyword !== '' && props.keyword }</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Box>
    );
}

export default Parameters;