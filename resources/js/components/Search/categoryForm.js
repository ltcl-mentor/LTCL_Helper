import React from 'react';
import ReactDOM from 'react-dom';

class Category extends React.Component {
    constructor(props){
        super(props);
        this.state={
            category: '',
        };
    } 
    
    handleCategory(category){
        this.setState({ category: category });
    }
    
    handleChange(){
        this.setState({ category: '' });
    }
    
    render(){
        let categoryForm;
        
        if(this.state.category === ''){
            categoryForm=(
                <div className="category_box">
                    <label className="category_button"><input type="radio" name="category" onClick={() => { this.handleCategory(0) }}/>カリキュラム</label>
                    <label className="category_button"><input type="radio" name="category" onClick={() => { this.handleCategory(1) }}/>成果物</label>
                </div>
            );
        }else{
            categoryForm=(
                <div className="category_result_box">
                    <h4 className="category_result">{ this.props.categories[this.state.category] }</h4>
                    <a className="change_button" onClick={() => { this.handleChange() }}>変更する</a>
                </div>
            );
        }
        
        return (
            <div className="container">
                <h2 className="steps">STEP1 該当するカテゴリーを選択します。</h2>
                { this.props.setCategory(this.state.category) }
                { categoryForm }
            </div>
        );
    }
}

export default Category;
