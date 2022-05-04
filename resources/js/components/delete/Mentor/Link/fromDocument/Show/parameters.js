import React, {useState, useEffect} from 'react';
import axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

/**
 * 該当記事の基礎データ
 */
function Parameters(props) {
    const [staffs, setStaffs] = useState([]);
    
    // 画面描画時に実行
    useEffect(() => {
        // 管理者一覧取得
        axios
            .get("/react/all/staffs")
            .then(response => {
                setStaffs(response.data);
            }).catch(error => {
                console.log(error);
            });
    }, []);
    
    let author;
    if (props.author === 0) {
        author = "削除済みユーザー";
    } else {
        author = staffs.map((staff) => {
            if (staff.id === props.author) {
                return staff.name;
            }
        });
    }
    
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
        <Paper sx={{ marginTop: 3 }}>
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
                        <TableCell align="center">{ author }</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    );
}

export default Parameters;