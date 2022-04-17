import React, {useState, useEffect, useContext} from 'react';
import {useParams, useHistory, Link} from 'react-router-dom';
import axios from "axios";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Button from '@mui/material/Button';

import Breadcrumbs from '../../../Breadcrumbs';
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@mui/material/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Pagination from "@mui/material/Pagination";

/**
 * 質問一覧(公開)のメインコンポーネント
 */
function Index() {
    const [value, setValue] = React.useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [questions, setQuestions] = useState({
        eventList: [],
        currentPage: 1,
        itemsCountPerPage: 1,
        totalItemsCount: 1,
        pageRangeDisplayed: 10,
        lastPage: 0,
    });

    useEffect(() => {
        // 対応が必要な質問の取得
        axios
            .get("/react/questions/mentor")
            .then(response => {
                setQuestions({
                    eventList: response.data.data,
                    itemsCountPerPage: response.data.per_page,
                    totalItemsCount: response.data.total,
                    currentPage: response.data.current_page,
                    pageRangeDisplayed: 10,
                    lastPage: response.data.last_page,
                });
                console.log(response);
            }).catch(error => {
            console.log(error);
        });
    }, []);

    const handlePageClick = (event, index) => {
        // 検索結果の質問取得
        axios
            .get(`/react/questions/mentor?page=${index}`)
            .then(response => {
                setQuestions({
                    eventList: response.data.data,
                    itemsCountPerPage: response.data.per_page,
                    totalItemsCount: response.data.total,
                    currentPage: response.data.current_page,
                    pageRangeDisplayed: 10,
                    lastPage: response.data.last_page,
                });
            }).catch(error => {
            console.log(error);
        });
    };

    // タブの切り替え
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    console.log(questions.eventList)

    const list = questions.eventList.map((question) => {
        let check;
        if (question.check) {
            check = <Button　variant="outlined" color="success">公開中</Button>;
        } else {
            check = <Button　variant="outlined" sx={{borderColor:'gray', color:'gray'}}>非公開</Button>;
        }

        let status;
        if (question.status == 0) {
            status = <Button　variant="contained" sx={{marginLeft: 2}}>未対応</Button>;
        } else if (question.status == 1) {
            status = <Button　variant="outlined" color="success" sx={{marginLeft: 2}}>対応中</Button>;
        } else if (question.status == 2) {
            status = <Button　variant="outlined" color="inherit" sx={{marginLeft: 2}}>解決済</Button>;
        } else if (question.status == 3) {
            status = <Button　variant="contained" color="error" sx={{marginLeft: 2}}>要対応</Button>;
        }

        return (
            <div key={question.id}>
                <Link to={{pathname: `/questions/` + question.id, location: 'question'}} /*target="_blank"*/>
                    <ListItem button sx={{display: 'flex', textAlign: 'flex-start'}}>
                        <ListItemText
                            primary={
                                <Box sx={{display: 'flex'}}>
                                    { check }
                                    { status }
                                    <Typography　variant="body1" style={{ color: 'black' }} sx={{marginLeft: 2, marginTop: 0.7}}>{question.title}</Typography>
                                </Box>
                            }
                        />
                    </ListItem>
                </Link>
            </div>
        );
    });

    let emptyMessage;
    let questionList;
    let pagination;

    if (list.filter(v=>v).length === 0) {
        // 検索結果がない場合に出力するメッセージ
        emptyMessage = ( <Typography align="center" variant="h6" component="div" >該当する質問がありません。</Typography> );
    } else {
        questionList = list.slice((currentPage - 1)*10, currentPage*10);

        // ペジネーションの部分
        pagination = (
            <Pagination
                count={ questions.lastPage }
                page={ questions.currentPage }
                onChange={ handlePageClick }
                sx={{ display: "block" }}
            />
        );
    }


    return (
        <div className="container">
            <Breadcrumbs page="public_question_index"/>

            <Box marginBottom={1} sx={{ display: 'flex', justifyContent: 'flex-start'}}>
                <Card sx={{  width: '140px', height: '140px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Typography sx={{fontSize:"25px" }}>対応待ち</Typography>
                </Card>
            </Box>

            <Box sx={{ width: '95%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs TabIndicatorProps={{style: {backgroundColor: '#771AF8'}}} value={ value } onChange={ handleChange } aria-label="basic tabs example">
                        <Tab label="質問" />
                        <Tab label="関連記事" />
                    </Tabs>
                </Box>

                <Box>
                    <Box sx={{display: 'flex'}}>
                        <List>
                            { questionList }
                        </List>
                    </Box>

                    <Grid container justifyContent="center" sx={{ marginTop: 1, marginBottom: 2 }}>
                        <Grid item>
                            { pagination }
                        </Grid>
                    </Grid>

                    { emptyMessage }
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                    <Button  component={Link} to="/?page=qa">Q&Aに戻る</Button>
                </Box>
            </Box>
        </div>
    );
}

export default Index;
