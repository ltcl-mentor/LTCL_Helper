import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Card from '@material-ui/core/Card';
import Grid from '@mui/material/Grid';


/**
 * 絞り込み検索の検索結果表示
 */
const Result = (props) => {
    const [questions, setQuestions] = useState({
        eventList: [],
        activePage: 1,
        itemsCountPerPage: 1,
        totalItemsCount: 1,
        pageRangeDisplayed: 10,
        lastPage: 0,
    });
    const [currentPage, setCurrentPage] = useState(1);
    
    useEffect(() => {
        // 検索結果の質問取得
        // 日本語の検索内容入力時に一度エンコードする
        // コントローラー側でデコード
        const encodedFreeword = encodeURI(props.freeword);
            
        axios
            .get(`/react/questions/search/paginate?category=${ props.category }&topic=${ props.topic }&curriculum_number=${ props.curriculum_number }&keyword=${ props.keyword }`)
            .then(response => {
                // console.log(response.data);
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
    }, []);
    
    // ペジネーションのページ番号がクリックされた際にページ変更
    const handlePageClick = (event, index) => {
            // 日本語の検索内容入力時に一度エンコードする
            // コントローラー側でデコード
            const encodedFreeword = encodeURI(props.freeword);

            // 検索結果の質問取得
            axios
                .get(`/react/questions/search/paginate?category=${ props.category }&topic=${ props.topic }&curriculum_number=${ props.curriculum_number }&keyword=${ props.keyword }&page=${index}`)
                .then(response => {
                    // console.log(response.data);
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

    // 検索結果の質問一覧情報
    const list = questions.eventList.map((question) => {
        return (
            <div>
                <Divider light />

                <Link to={ `/public/questions/` + question.id } target="_blank">
                    <ListItem button>
                        <ListItemText
                            primary={ question.title }
                        />
                    </ListItem>
                </Link>

                <Divider />
            </div>
        );
    });
    
    
    let emptyMessage;
    let questionList;
    let pagination;

    if (list.filter(v=>v).length === 0) {
        // 検索結果がない場合に出力するメッセージ
        emptyMessage = ( <Typography align="center" variant="h6" sx={{ pb: '20px' }}>該当する質問がありません。</Typography> );
    } else {
        // 検索結果一覧情報を1ページ10件に分割
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
        <Card>
            <Typography
                variant="h7"
                component="div"
                sx={{
                    marginTop: 2,
                    marginLeft: 3,
                    marginBottom: 2,
                }}
            >
                カテゴリー：<font color="green">{ props.categories[props.category] }</font>、トピック：<font color="blue">{ props.topics[props.topic] }</font>の検索結果{/*<font color="purple">{ list.filter(v=>v).length }</font>件*/}
            </Typography>
            
            <Box sx={{ width: "90%", margin: "0 auto" }}>
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
        </Card>
    );
};

export default Result;