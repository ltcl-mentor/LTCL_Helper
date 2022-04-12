import React, {useState, useEffect} from 'react';
import {useParams, useHistory, Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import axios from "axios";
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';

/**
 * カリキュラムの質問一覧
 */
function Questions(props) {

    const [currentPage, setCurrentPage] = useState(1);
    const questions = props.questions;
    const handlePageClick = (event, index) => {
        let val;
        if (props.category < 14) {
            val = 0
        } else {
            val = 1
        }
        // 検索結果の質問取得
        axios
            .get(`/react/questions/search/paginate?category=${ val }&topic=${ props.category }&page=${index}`)
            .then(response => {
                props.setQuestions({
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
            <div key={question.id}>


                <Link to={ `/public/questions/` + question.id } target="_blank">
                    <ListItem button>
                        <ListItemText
                            primary={<Typography　variant="body1" style={{ color: 'black' }}>{question.title}</Typography>}
                        />
                    </ListItem>
                </Link>


            </div>
        );
    });

    let emptyMessage;
    let questionList;
    let pagination;

    // filterでlistに存在する空要素を排除し,その上で配列内の要素が何個あるかを判定
    if (list.filter(v=>v).length === 0) {
        // 検索結果がない場合に出力するメッセージ
        emptyMessage = ( <Typography align="center" variant="h6" component="div" >該当する質問がありません。</Typography> );
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
        <Box>
            <Box>
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
    );
}

export default Questions;
