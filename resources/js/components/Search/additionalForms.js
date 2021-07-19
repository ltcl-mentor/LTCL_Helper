import React from 'react';
import ReactDOM from 'react-dom';
import CurriculumNamber from './curriculum-number';
import Keyword from './keywordForm';

class Addition extends React.Component {
    constructor(props){
        super(props);
        this.state={
            
        };
    }
    
    render(){
        
        return(
            <div className="container">
                <CurriculumNamber 
                    category={ this.props.category }
                    topic={ this.props.topic }
                    setCurriculumnumber={ this.props.setCurriculumnumber }
                />
                <Keyword
                    setKeyword={ this.props.setKeyword }
                />
            </div>
        );
    }
}

export default Addition;
