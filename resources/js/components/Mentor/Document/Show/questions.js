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


function questions(props) {
    const [questions, setQuestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    
    useEffect(() => {
        axios
            .get(`/react/related/questions/${ props.id }`)
            .then(response => {
                setQuestions(response.data);
            }).catch(error => {
                console.log(error);
            });
    }, []);
    
    const list = questions.map((question) => {
        return (
            <div>
                <Divider light />
                <ListItem button>
                    <Link to={ '/questions/' + question.id } className="question" key={ question.id } target="_blank">
                        <ListItemText
                            primary={ question.question }
                        />
                    </Link>
                </ListItem>
                <Divider />
            </div>
        );
    });
    
    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };
    
    let emptyMessage;
    let questionList;
    let pagination;
    
    if (list.filter(v=>v).length === 0) {    //filterでlistに存在する空要素を排除し,その上で配列内の要素が何個あるかを判定。
        emptyMessage = ( <Typography align="center" variant="h6" component="div" >該当する質問がありません。</Typography> );
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

export default questions;