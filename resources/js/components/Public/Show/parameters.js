import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function Parameters(props) {
    const categories = ['カリキュラム', '成果物'];
    const topics = ['AWS', 'HTML', 'CSS', 'JavaScript', 'サーバー', 'PHP', 'Laravel', 'DB', 'Git&GitHub', '環境構築', '設計図', 'デプロイ', 'API'];
    
    return (
        <div>
            <Paper className="QA_table">
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell align="center" component="th" scope="row">カテゴリー</TableCell>
                            <TableCell align="center">{ categories[props.category] }</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center" component="th" scope="row">トピック</TableCell>
                            <TableCell align="center">{ topics[props.topic] }</TableCell>
                       </TableRow>
                       <TableRow>
                            <TableCell align="center" component="th" scope="row">カリキュラム番号</TableCell>
                            <TableCell align="center">{ props.curriculum_number }</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
}

export default Parameters;