import React, {useState, useEffect} from 'react';
import Fab from '@material-ui/core/Fab';
import Box from '@mui/material/Box';

/**
 * 検索ボタン
 */
function SearchButton(props) {
    useEffect(() => {
        props.setIsSearchButtonClicked(false);
    }, [props.corriculum_number, props.keyword]);
    
    const handleClick = () => {
        props.setIsSearchButtonClicked(true);
    };
    
    let searchButton;
    // topicの条件で不等号に0を入れるとundefindedでも動いてしまうので0の時と1~8の時を分けて定義
    if ( (((props.topic === 0) || (props.topic >= 1 && props.topic <= 12)) && props.category === 0) || (props.topic >= 13 && props.category === 1) ) {
        searchButton = (
            <Box sx={{ textAlign: "center", marginTop: 4, marginBottom: 3 }}>
                <Fab variant="extended" onClick={ handleClick }>
                    検索する
                </Fab>
            </Box>
        );
    } else {
        searchButton = ('');
    }
    
    return(
        <div className="container">
            { searchButton }
        </div>
    );
}

export default SearchButton;
