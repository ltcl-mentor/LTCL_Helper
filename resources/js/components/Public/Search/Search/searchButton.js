import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-scroll';
import Fab from '@material-ui/core/Fab';

function SearchButton(props) {
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    
    useEffect(() => {
        setIsButtonClicked(false);
    },[props.corriculum_number, props.keyword]);
    
    const handleClick = () => {
        setIsButtonClicked(true);
    };
    
    let searchButton;
    // topicの条件で不等号に0を入れるとundefindedでも動いてしまうので0の時と1~8の時を分けて定義
    if( (((props.topic === 0) || (props.topic >= 1 && props.topic <= 8)) && props.category === 0) || (props.topic >= 9 && props.category === 1) ){
        searchButton = (
            <div className="search_button_box">
                <Link activeClass="active" to="box" spy={ true } smooth={ true } offset={ 500 } duration={ 800 }>
                    <Fab variant="extended" onClick={() => { handleClick() }}>
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
            { props.setIsSearchButtonClicked(isButtonClicked) }
            { searchButton }
        </div>
    );
}

export default SearchButton;
