import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import ReactPaginate from 'react-paginate';

class Questions extends React.Component {
    constructor(props){
        super(props);
        this.state={
            questions: [],
            currentPage: 1,
        };
    } 
    
    componentDidMount() {
        axios
            .get(`/react/search/questions?category=${ this.props.category }&topic=${ this.props.topic }&curriculum_number=${ this.props.curriculum_number }&keyword=${ this.props.keyword }`)
            .then(response => {
                this.setState({
                    questions: response.data
                });
 
            }).catch(error => {
                console.log(error);
            });
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.topic !== prevProps.topic || this.props.category !== prevProps.category || this.props.curriculum_number !== prevProps.curriculum_number || this.props.keyword !== prevProps.keyword) {
            axios
                .get(`/react/search/questions?category=${ this.props.category }&topic=${ this.props.topic }&curriculum_number=${ this.props.curriculum_number }&keyword=${ this.props.keyword }`)
                .then(response => {
                    this.setState({
                        questions: response.data
                    });
 
                }).catch(error => {
                    console.log(error);
                });
        }
    }
    
    handlePaginate({ selected: selectedPage }) {
        this.setState({ currentPage: selectedPage });
    }
    
    render(){
        const list = this.state.questions.map((question) => {
            return <a href={ `/show/`+question.id } className="question" key={ question.id }>{ question.question }</a>;
        });
        
        
        let emptyMessage;
        if(list.filter(v=>v).length === 0){    //filterでlistに存在する空要素を排除し,その上で配列内の要素が何個あるかを判定。
            emptyMessage = ( <div className="emptyMessage">該当する質問がありません。</div> );
        }
        
        return (
            <div>
                <div className="searchResultDocument">
                    カテゴリー：<font color="green">{ this.props.categories[this.props.category] }</font>、トピック：<font color="blue">{ this.props.topics[this.props.topic] }</font>の検索結果<font color="purple">{ list.filter(v=>v).length }</font>件
                </div>
                { list }
                { this.state.currentPage }
                <ReactPaginate
                    pageCount={ list.filter(v=>v).length }
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={ () => this.handlePaginate() }
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
                { emptyMessage }
            </div>
        );
    }
}

export default Questions;
