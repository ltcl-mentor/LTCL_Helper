import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

class Questions extends React.Component {
   constructor(props){
        super(props);
        this.state={
            questions: [],
            category: ['カリキュラム', '成果物'],
            topic: ['AWS', 'HTML', 'CSS', 'JavaScript', 'サーバー', 'PHP', 'Laravel', 'DB', 'Git&GitHub', '環境構築', '設計図', 'デプロイ', 'API'],
        };
    } 
    
    componentDidMount() {
        axios
            .get("/react/approved/questions")
            .then(response => {
                this.setState({
                    questions: response.data
                });
 
            }).catch(error => {
                console.log(error);
            });
    }
    
    render(){
        const list = this.state.questions.map((item) => {
            if(item.category === this.props.category && item.topic === this.props.topic){
                return <a href={ `/show/`+item.id } className="question" key={ item.id } target="_blank">{item.question}</a>;
            }
        });
        
        
        let emptyMessage;
        if(list.filter(v=>v).length === 0){    //filterでlistに存在する空要素を排除し,その上で配列内の要素が何個あるかを判定。
            emptyMessage = ( <div className="emptyMessage">該当する質問がありません。</div> );
        }
        
        return (
            <div>
                <div className="searchResultDocument">
                    カテゴリー：<font color="green">{ this.state.category[this.props.category] }</font>、トピック：<font color="blue">{ this.state.topic[this.props.topic] }</font>の検索結果<font color="purple">{ list.filter(v=>v).length }</font>件
                </div>
                { list }
                { emptyMessage }
            </div>
        );
    }
}

export default Questions;
