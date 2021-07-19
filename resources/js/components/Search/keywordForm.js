import React from 'react';
import ReactDOM from 'react-dom';
import TextField from '@material-ui/core/TextField';

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
                <div className="keyword_box">
                    <TextField id="standard-basic" label="キーワード" onChange={(event) => { this.changeKeyword(event) }} />
                    { this.props.setKeyword(this.state.keyword) }
                </div>
            </div>
        );
    }
}

export default Keyword;