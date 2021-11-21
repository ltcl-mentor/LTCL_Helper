import React from 'react';
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import CreateIcon from '@material-ui/icons/Create';
import ListIcon from '@material-ui/icons/List';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import DescriptionIcon from '@material-ui/icons/Description';
import PersonAddAltIcon from '@material-ui/icons/PersonAddAlt';
import PersonAddIcon from '@material-ui/icons/PersonAddAlt1';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

function Top() {
    return (
        <div class="container">
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" to="/">
                    HOME
                </Link>
                
                <Typography color="text.primary">
                    メンタートップ
                </Typography>
            </Breadcrumbs>
            
            <Box sx={{marginTop:2, marginBottom: 3}}>
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
                
                <Grid container spacing={2} sx={{ flexGrow: 1 }} >
                    <Grid item >
                        <Link to="/questions/index">
                            <Button variant="contained" color="info" startIcon={ <ListIcon /> }>一覧</Button>
                        </Link>
                    </Grid>
                    
                    <Grid item >
                        <Link to="/questions/create">
                            <Button variant="contained" color="info" startIcon={ <CreateIcon /> }>新規登録</Button>
                        </Link>
                    </Grid>
                </Grid>
            </Box>
            
            <Box sx={{marginTop:2, marginBottom: 3}}>
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
                
                <Grid container spacing={2} sx={{ flexGrow: 1 }} >
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
            
            <Box sx={{marginTop:2, marginBottom: 3}}>
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
                
                <Grid container spacing={2} sx={{ flexGrow: 1 }} >
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
    
            <Box sx={{marginTop:2, marginBottom: 3}}>
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
                
                <Grid container spacing={2} sx={{ flexGrow: 1 }} >
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
        </div>
    );
}

export default Top;