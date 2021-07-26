import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-scroll';
import Fab from '@material-ui/core/Fab';
// import NavigationIcon from '@material-ui/icons/Navigation';

class SearchButton extends React.Component {
    constructor(props){
        super(props);
        this.state={
            isButtonClicked: false,
        };
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.topic !== prevProps.topic || this.props.category !== prevProps.category || this.props.curriculum_number !== prevProps.curriculum_number || this.props.keyword !== prevProps.keyword) {
            this.setState({ isButtonClicked: false });
        }
    }
    
    handleClick() {
        this.setState({ isButtonClicked: true });
    }
    
    render(){
        let searchButton;
        // topicの条件で不等号に0を入れるとundefindedでも動いてしまうので0の時と1~8の時を分けて定義
        if( (((this.props.topic === 0) || (this.props.topic >= 1 && this.props.topic <= 8)) && this.props.category === 0) || (this.props.topic >= 9 && this.props.category === 1) ){
            searchButton = (
                <div className="search_button_box">
                    <Link activeClass="active" to="box" spy={ true } smooth={ true } offset={ 500 } duration={ 800 }>
                        <Fab variant="extended" onClick={() => { this.handleClick() }}>
                            検索する
                        </Fab>
                    </Link>
                </div>
            );
        }else{
            searchButton = ('');
        }
        
        return(
            <div className="container">
                { this.props.setIsSearchButtonClicked(this.state.isButtonClicked) }
                { searchButton }
            </div>
        );
    }
}

export default SearchButton;