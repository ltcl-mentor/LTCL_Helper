import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

class Questions extends React.Component {
   constructor(props){
        super(props);
        this.state={
            questions: [],
        };
    } 
    
    componentDidMount() {
        axios
            .get(`/react/search/questions/${this.props.category}/${this.props.topic}`)
            .then(response => {
                this.setState({
                    questions: response.data
                });
 
            }).catch(error => {
                console.log(error);
            });
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.topic !== prevProps.topic || this.props.category !== prevProps.category) {
            axios
                .get(`/react/search/questions/${this.props.category}/${this.props.topic}`)
                .then(response => {
                    this.setState({
                        questions: response.data
                    });
 
                }).catch(error => {
                    console.log(error);
                });
        }
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
                { emptyMessage }
            </div>
        );
    }
}

export default Questions;
