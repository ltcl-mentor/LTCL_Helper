import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Link} from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@mui/material/Grid';

/**
 * 絞り込みの検索結果の質問一覧
 */
function Questions(props) {
    const [questions, setQuestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    
    // 画面描画時に実行
    useEffect(() => {
        // 検索結果の質問取得
        axios
            .get(`/react/questions/search?category=${ props.category }&topic=${ props.topic }&curriculum_number=${ props.curriculum_number }&keyword=${ props.keyword }`)
            .then(response => {
                setQuestions(response.data);
            }).catch(error => {
                console.log(error);
            });
    }, []);
    
    // ペジネーションのページ番号がクリックされた際にページ変更
    const handlePageClick = (event, value) => {
        setCurrentPage(value);
    };
    
    // 検索結果の質問一覧情報
    const list = questions.map((question) => {
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
                count={ Math.floor(list.filter(v=>v).length/10) + 1 }
                page={ currentPage }
                onChange={ handlePageClick }
            />
        );
    }
    
    return (
        <Card sx={{ marginTop: 4, marginBottom:4 }}>
            <Typography
                variant="h7"
                component="div"
                sx={{
                    marginTop: 2,
                    marginLeft: 3,
                    marginBottom: 2,
                }}
            >
                カテゴリー：<font color="green">{ props.categories[props.category] }</font>、トピック：<font color="blue">{ props.topics[props.topic] }</font>の検索結果<font color="purple">{ list.filter(v=>v).length }</font>件
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
}

export default Questions;
