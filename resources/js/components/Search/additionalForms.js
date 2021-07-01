import React from 'react';
import ReactDOM from 'react-dom';
import CurriculumNamber from './curriculum-number';
import Keyword from './keywordForm';

class Addition extends React.Component {
    constructor(props){
        super(props);
        this.state={
            isOpen: false,
        };
    }
    
    openDetail() {
        this.setState({ isOpen: true });
    }
    
    closeDetail() {
        this.setState({ isOpen: false });
    }
    
    render(){
        let detail;
        if( (((this.props.topic === 0) || (this.props.topic >= 1 && this.props.topic <= 8)) && this.props.category === 0) || (this.props.topic >= 9 && this.props.category === 1) ){
            if(this.state.isOpen){
                detail = (
                    <div>
                        <p onClick={() => { this.closeDetail() }} className="additionBtn">----追加条件を閉じる----</p>
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
            }else{
                detail = (
                    <div>
                        <p onClick={() => { this.openDetail() }} className="additionBtn">----さらに絞り込む----</p>
                    </div>
                ); 
            }
        }else{
            detail = ('');
        }
        
        
        return(
            <div className="container">
                { detail }
            </div>
        );
    }
}

export default Addition;
