import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import axios from "axios";
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import {LoginUser} from "../../../../Route";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@mui/material/TextField";
import MenuItem from "@material-ui/core/MenuItem";

/**
 * カリキュラムの質問一覧
 */
function Questions(props) {
    const user = useContext(LoginUser);
    const status = props.status;
    const setStatus = props.setStatus;
    const questions = props.questions;
    let val;
    if (props.category < 14) {
        val = 0
    } else {
        val = 1
    }

    const handlePageClick = (event, index) => {
        let questionsUrl;
        if(user.is_admin){
            questionsUrl = `/react/questions/search/paginate?category=${ val }&topic=${ props.category }&admin=true&page=${index}&status=${status}`;
        }else{
            questionsUrl = `/react/questions/search/paginate?category=${ val }&topic=${ props.category }&page=${index}`;
        }

        // 検索結果の質問取得
        axios
            .get(questionsUrl)
            .then(response => {
                console.log(response.data);
                props.setQuestions({
                    eventList: response.data.data,
                    itemsCountPerPage: response.data.per_page,
                    totalItemsCount: response.data.total,
                    currentPage: response.data.current_page,
                    lastPage: response.data.last_page,
                });
            }).catch(error => {
            console.log(error);
            });
    };

    function handleStatus(event) {
        let questionsUrl;
        if(user.is_admin){
            questionsUrl = `/react/questions/search/paginate?category=${ val }&topic=${ props.category }&admin=true&status=${event.target.value}`;
        }
        setStatus(event.target.value);
        axios
            .get(questionsUrl)
            .then(response => {
                props.setQuestions({
                    eventList: response.data.data,
                    itemsCountPerPage: response.data.per_page,
                    totalItemsCount: response.data.total,
                    currentPage: response.data.current_page,
                    lastPage: response.data.last_page,
                });
            }).catch(error => {
            console.log(error);
        });
    }

        // 検索結果の質問一覧情報
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

        let questionLink
        if (user.is_admin) {
            questionLink = `/questions/` + question.id;
        } else {
            questionLink = `/public/questions/` + question.id;
        }

        return (
            <div key={question.id}>

                <Link to={{pathname: questionLink, location: 'question'}} /*target="_blank"*/>
                    <ListItem button sx={{display: 'flex', textAlign: 'flex-start'}}>
                        <ListItemText
                            primary={
                                <Box sx={{display: 'flex'}}>
                                    {user.is_admin && check}
                                    {user.is_admin && status}
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
    let selector;

    if (user.is_admin) {
        selector = (<FormControl  sx={{ width:'20%', marginLeft: 'auto' , marginTop: 2}}>
            <TextField
                label="質問を絞り込む"
                id="demo-simple-select"
                select
                defaultValue={""}
                onChange={ (event) => handleStatus(event) }
                style={{
                    width: "100%",
                    paddingTop:2,
                }}
            >
                <MenuItem value={ 4 } >全て表示</MenuItem>
                <MenuItem value={ 0 } >未対応</MenuItem>
                <MenuItem value={ 1 } >対応中</MenuItem>
                <MenuItem value={ 2 } >解決済</MenuItem>
                <MenuItem value={ 3 } >要対応</MenuItem>
            </TextField>
        </FormControl>)
    }

    // filterでlistに存在する空要素を排除し,その上で配列内の要素が何個あるかを判定
    if (list.filter(v=>v).length === 0) {
        // 検索結果がない場合に出力するメッセージ
        emptyMessage = ( <Typography align="center" variant="h6" component="div" >該当する質問がありません。</Typography> );
    } else {
        // 検索結果一覧情報を1ページ10件に分割
        questionList = list.slice(0, 10);

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
            <Box sx={{display: 'flex'}}>
                <List>
                    { questionList }
                </List>
                {selector}
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
