import React, {useState, useEffect} from 'react';
import axios from "axios";
import ReactPaginate from 'react-paginate';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@material-ui/core/Typography';

function Questions(props) {
    const [questions, setQuestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
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
                <ListItem button>
                    <a href={ '/questions/' + question.id + '/public' } className="question" key={ question.id } target="_blank">
                        <ListItemText
                            primary={ question.question }
                        />
                    </a>
                </ListItem>
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
            questionList = list.slice(currentPage*10, (currentPage + 1)*10);
            pagination = (
                <div className="paginationBox">
                <Typography align="center" component="div" >
                    <ReactPaginate
                        pageCount={ list.filter(v=>v).length/10 }
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={2}
                        onPageChange={ (event) => handlePageClick(event) }
                        containerClassName="pagination"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        activeClassName="active"
                        activeLinkClassName="active"
                        previousLinkClassName="previous-link"
                        nextLinkClassName="next-link"
                        previousLabel="<<"
                        nextLabel=">>"
                        disabledClassName="disabled-button"
                    />
                    </Typography>
                </div>
            );
        }
    }
    
    return (
        <div>
            <div className="list">
                <List>
                    { questionList }
                </List>
            </div>
            { pagination }
            { emptyMessage }
        </div>
    );
}

export default Questions;
