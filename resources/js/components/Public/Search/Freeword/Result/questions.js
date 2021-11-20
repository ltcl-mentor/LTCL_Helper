import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Link} from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Card from '@material-ui/core/Card';

function Questions(props) {
    const [questions, setQuestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoarding, setIsLording] = useState(false);
    
    useEffect(() => {
        if (props.freeword.trim().length !== 0) {
            // 日本語の検索内容入力時に一度エンコードする
            // コントローラー側でデコード
            const encodedFreeword = encodeURI(props.freeword);
            
            setIsLording(true);
            
            axios
                .get(`/react/search/questions?searchType=${ props.searchType }&freeword=${ encodedFreeword }`)
                .then(response => {
                    setQuestions(response.data);
                }).catch(error => {
                    console.log(error);
                });
            
            setIsLording(false);
        }
    }, [props.searchType, props.freeword]);
    
    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };
    
    const list = questions.map((question) => {
        return (
            <div>
                <Divider light />
                
                <Link to={ `/public/questions/` + question.id } target="_blank">
                    <ListItem button>
                        <ListItemText
                            primary={ question.question }
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
    
    if (list.filter(v=>v).length === 0) {    //filterでlistに存在する空要素を排除し,その上で配列内の要素が何個あるかを判定。
        emptyMessage = ( <Typography align="center" variant="h6" component="div" >該当する質問がありません。</Typography> );
    } else {
        if(isLoarding) {
            emptyMessage = ( <CircularProgress color="secondary" /> );
        } else {
            questionList = list.slice((currentPage - 1)*10, currentPage*10);
            pagination = (
                <Pagination
                    count={ Math.floor(list.filter(v=>v).length/10) + 1 }
                    page={ currentPage }
                    onChange={ handlePageClick }
                    sx={{ display: "block" }}
                />
            );
        }
    }
    
    return (
        <Card sx={{ marginTop: 4, marginBottom:4 }}>
            <Box sx={{ width: "80%", textAlign: "center" }}>
                <List>
                    { questionList }
                </List>
            </Box>
            
            { pagination }
            
            { emptyMessage }
        </Card>
    );
}

export default Questions;
