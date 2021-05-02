import React from 'react';
import ReactDOM from 'react-dom';

class Category extends React.Component {
   constructor(props){
        super(props);
        this.state={
            whichSelected:'',
            category:['','カリキュラム','成果物'],
        };
    } 
    
    handleCurriculum(){
        this.setState({whichSelected:1});
    }
    
    handlePortfolio(){
        this.setState({whichSelected:2});
    }
    
    handleChange(){
        this.setState({whichSelected:''});
    }
    
    render(){
        let categoryForm;
        
        if(this.state.whichSelected===''){
            categoryForm=(
                <div className="category_box">
                    <label className="category_button"><input type="radio" name="category" onClick={()=>{this.handleCurriculum()}}/>カリキュラム</label>
                    <label className="category_button"><input type="radio" name="category" onClick={()=>{this.handlePortfolio()}}/>成果物</label>
                </div>
            );
        }else{
            categoryForm=(
                <div className="category_result_box">
                    <h4 className="category_result">{this.state.category[this.state.whichSelected]}</h4>
                    <a className="change_button" onClick={()=>{this.handleChange()}}>変更する</a>
                </div>
            );
        }
        
        return (
            <div className="container">
                <h2 className="steps">STEP1 該当するカテゴリーを選択します。</h2>
                {this.props.setCategory(this.state.whichSelected)}
                {categoryForm}
            </div>
        );
    }
}

export default Category;
