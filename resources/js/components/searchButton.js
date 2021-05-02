import React from 'react';
import ReactDOM from 'react-dom';
// import * as Scroll from 'react-scroll';

class SearchButton extends React.Component {
   constructor(props){
        super(props);
        this.state={
            
        };
    }
    
    // componentDidMount() {
    // /*
    // <div name="foo"></div>のところまで移動させる
    // */
    //     Scroll.scroller.scrollTo('result_box',{
    //         duration: 800,
    //         delay: 0,
    //         smooth: 'easeInOutQuart'
    //     });
    // }
    
    // scrollTry(){
    //     scroll.scroller.scrollTO(0,500);
    // }
    
    
    render(){
        let searchButton;
        if( ( this.props.topic>=1 && this.props.topic<=8 && this.props.category===1) || (this.props.topic>=9 && this.props.category===2) ){
            searchButton=(
                <div className="search_button_box">
                    <button className="search_button">検索する</button>
                </div>
            );
        }else{
            searchButton=('');
        }  
        
        return(
            <div className="container">
                {searchButton}
            </div>
        );
    }
}

export default SearchButton;
