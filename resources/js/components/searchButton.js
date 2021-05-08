import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-scroll';

class SearchButton extends React.Component {
   constructor(props){
        super(props);
        this.state={
            isButtonClicked:false,
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
    
    scrollTry(){
        window.scrollTo(0,1000);
    }
    
    handleClick(){
        this.setState({isButtonClicked:true});
        // window.scrollTo(0,1100);
    }
    
    render(){
        let searchButton;
        if( ( this.props.topic>=1 && this.props.topic<=8 && this.props.category===1) || (this.props.topic>=9 && this.props.category===2) ){
            searchButton=(
                <div className="search_button_box">
                    <Link activeClass="active" to="box" spy={true} smooth={true} offset={500} duration={800}><button className="search_button" onClick={()=>{this.handleClick()}}>検索する</button></Link>
                </div>
            );
        }else{
            searchButton=('');
        }
        
        return(
            <div className="container">
                {this.props.setIsSearchButtonClicked(this.state.isButtonClicked)}
                {searchButton}
            </div>
        );
    }
}

export default SearchButton;
