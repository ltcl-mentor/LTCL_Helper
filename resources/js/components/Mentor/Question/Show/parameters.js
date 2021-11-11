import React, {useState, useEffect} from 'react';
import axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function Parameters(props) {
    const [staffs, setStaffs] = useState([]);
    
    useEffect(() => {
        axios
            .get("/react/all/staffs")
            .then(response => {
                setStaffs(response.data);
            }).catch(error => {
                console.log(error);
            });
    }, []);
    
    let author;
    if (props.user_id === 0) {
        author = "削除済みユーザー";
    } else {
        author = staffs.map((staff) => {
            if (staff.id === props.user_id) {
                return staff.name;
            }
        });
    }
    
    let isPublic;
    if (props.check === 0) {
        isPublic = "非公開";
    } else {
        isPublic = "公開";
    }
    
    return (
        <div>
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
                            <TableCell align="center">{ author }</TableCell>
                        </TableRow>
                        
                        <TableRow>
                            <TableCell align="center" component="th" scope="row">公開状況</TableCell>
                            <TableCell align="center">{ isPublic }</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
}

export default Parameters;