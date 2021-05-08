import React from 'react';
import ReactDOM from 'react-dom';
import Questions from './questions';

class Result extends React.Component {
   constructor(props){
        super(props);
        this.state={
            
        };
    } 
    
    render(){
        let results;
        if(this.props.isSearchButtonClicked){
            results=(
                <div className="box">
                    <div className="empty">
                        <div className="space"></div>
                        <div className="circle1"></div>
                        <div className="circle2"></div>
                        <div className="circle3"></div>
                    </div>
                    <div className="result_box">
                        <Questions category={this.props.category} topic={this.props.topic}/>
                    </div>
                </div>
            );
        }else{
            results=(<div className="box"></div>);
        }
        
        return (
            <div className="container">
               {results} 
            </div>
        );
    }
}

export default Result;
