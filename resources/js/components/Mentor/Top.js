import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import Button from '@mui/material/Button';
import CreateIcon from '@material-ui/icons/Create';
import ListIcon from '@material-ui/icons/List';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import DescriptionIcon from '@material-ui/icons/Description';
import PersonAddAltIcon from '@material-ui/icons/PersonAddAlt';
import PersonAddIcon from '@material-ui/icons/PersonAddAlt1';
import Typography from '@material-ui/core/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@material-ui/core/Card';
import Badge from '@mui/material/Badge';

import Breadcrumbs from '../Breadcrumbs';

/**
 * 管理画面のメインコンポーネント
 */
function Top() {
    const [counts, setCounts] = useState([]);
    
    // 画面描画時に実行
    useEffect(() => {
        // コメント待ちの質問のデータ数を取得
        axios
            .get('/react/questions/counts')
            .then(response => {
                setCounts(response.data);
            }).catch(error => {
                console.log(error);
            });
    }, []);
    
    return (
        <div class="container">
            <Breadcrumbs page="mentor_top"/>
            
            <Card>
                <Box sx={{ margin: 2, marginBottom: 3, marginLeft: 2 }}>
                    <Typography
                        variant="h4"
                        component="div"
                        align="left"
                        sx={{
                            marginTop: 4,
                            marginBottom: 2,
                        }}
                    >
                        質問
                    </Typography>
                    
                    <Grid container spacing={2} sx={{ flexGrow: 1, marginLeft: 2 }} >
                        <Grid item >
                            <Link to="/questions/index">
                                <Button variant="contained" color="info" startIcon={ <ListIcon /> }>一覧</Button>
                            </Link>
                        </Grid>
                        
                        <Grid item >
                            <Link to="/questions/index/mentor_yet_comment">
                                <Badge badgeContent={ counts.mentor } color="error">
                                <Button variant="contained" color="info" startIcon={ <ListIcon /> }>メンターコメント待ち</Button>
                                </Badge>
                            </Link>
                        </Grid>
                        
                        <Grid item >
                            <Link to="/questions/index/student_yet_comment">
                                <Badge badgeContent={ counts.student } color="error">
                                <Button variant="contained" color="info" startIcon={ <ListIcon /> }>受講生コメント待ち</Button>
                                </Badge>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
                
                <Box sx={{ margin: 2, marginBottom: 3, marginLeft: 2 }}>
                    <Typography
                        variant="h4"
                        component="div"
                        align="left"
                        sx={{
                            marginTop: 4,
                            marginBottom: 2,
                        }}
                    >
                        関連記事
                    </Typography>
                    
                    <Grid container spacing={2} sx={{ flexGrow: 1, marginLeft: 2  }} >
                        <Grid item >
                            <Link to="/documents/index">
                                <Button variant="contained" color="success" startIcon={ <ListIcon /> }>一覧</Button>
                            </Link>
                        </Grid>
                        
                        <Grid item >
                            <Link to="/documents/create">
                                <Button variant="contained" color="success" startIcon={ <CreateIcon /> }>新規登録</Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
                
                <Box sx={{ margin: 2, marginBottom: 3, marginLeft: 2 }}>
                    <Typography
                        variant="h4"
                        component="div"
                        align="left"
                        sx={{
                            marginTop: 4,
                            marginBottom: 2,
                        }}
                    >
                        記事と質問の紐付け
                    </Typography>
                    
                    <Grid container spacing={2} sx={{ flexGrow: 1, marginLeft: 2  }} >
                        <Grid item >
                            <Link to="/links/question/index">
                                <Button variant="contained" color="secondary" startIcon={ <QuestionAnswerIcon /> }>質問から紐付け</Button>
                            </Link>
                        </Grid>
                        
                        <Grid item >
                            <Link to="/links/document/index">
                                <Button variant="contained" color="secondary" startIcon={ <DescriptionIcon /> }>記事から紐付け</Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
                
                <Box sx={{ margin: 2, marginBottom: 3, marginLeft: 2 }}>
                    <Typography
                        variant="h4"
                        component="div"
                        align="left"
                        sx={{
                            marginTop: 4,
                            marginBottom: 2,
                        }}
                    >
                        ユーザー名簿
                    </Typography>
                    
                    <Grid container spacing={2} sx={{ flexGrow: 1, marginLeft: 2 }} >
                        <Grid item >
                            <Link to="/users/index">
                                <Button variant="contained" color="error" startIcon={ <ListIcon /> }>一覧</Button>
                            </Link>
                        </Grid>
                        
                        <Grid item >
                            <Link to="/users/register/admin">
                                <Button variant="contained" color="error" startIcon={ <PersonAddIcon /> }>管理者の登録</Button>
                            </Link>
                        </Grid>
                        
                        <Grid item >
                            <Link to="/users/register/public">
                                <Button variant="contained" color="error" startIcon={ <PersonAddAltIcon /> }>受講生の登録</Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
                
                <Box sx={{ margin: 2, marginBottom: 3, marginLeft: 2 }}>
                    <Typography
                        variant="h4"
                        component="div"
                        align="left"
                        sx={{
                            marginTop: 4,
                            marginBottom: 2,
                        }}
                    >
                        質問データ出力
                    </Typography>
                    
                    <Grid container spacing={2} sx={{ flexGrow: 1, marginLeft: 2 }} >
                        <Grid item >
                            <a href="/questions/export">
                                <Button variant="contained" color="warning" startIcon={ <ListIcon /> }>直近の質問を100件出力</Button>
                            </a>
                        </Grid>
                    </Grid>
                </Box>
            </Card>
        </div>
    );
}

export default Top;