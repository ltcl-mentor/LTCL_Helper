import React, {useState, useEffect} from 'react';
import axios from "axios";
import ReactPaginate from 'react-paginate';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

function Questions(props) {
    const [questions, setQuestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    
    useEffect(() => {
        axios
            .get(`/react/search/questions?category=${ props.category }&topic=${ props.topic }&curriculum_number=${ props.curriculum_number }&keyword=${ props.keyword }`)
            .then(response => {
                setQuestions(response.data);
            }).catch(error => {
                console.log(error);
            });
    }, []);
    
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
        emptyMessage = ( <div className="emptyMessage">該当する質問がありません。</div> );
    } else {
        questionList = list.slice(currentPage*10, (currentPage + 1)*10);
        pagination = (
            <div className="paginationBox">
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
            </div>
        );
    }
    
    return (
        <div>
            <div className="searchResultDocument">
                カテゴリー：<font color="green">{ props.categories[props.category] }</font>、トピック：<font color="blue">{ props.topics[props.topic] }</font>の検索結果<font color="purple">{ list.filter(v=>v).length }</font>件
            </div>
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
