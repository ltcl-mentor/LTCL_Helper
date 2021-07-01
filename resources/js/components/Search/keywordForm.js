import React from 'react';
import ReactDOM from 'react-dom';

class Keyword extends React.Component{
    constructor(props){
        super(props);
        this.state={
            keyword: '',
        };
    }
    
    changeKeyword(event) {
        this.setState({ keyword: event.target.value });
    }
    
    render(){
        
         
        return (
            <div className="content">
                <h2 className="step">STEP4 検索ワードを入力してください。（任意）</h2>
                <div className="keyword_box">
                    <textarea name="keyword" placeholder="キーワードを入力" rows="1" onChange={(event) => { this.changeKeyword(event) }}/>
                    { this.props.setKeyword(this.state.keyword) }
                </div>
            </div>
        );
    }
}

export default Keyword;