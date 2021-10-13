import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';

function Keyword(props) {
    const [keyword, setKeyword] = useState('');
    
    const handleKeyword = (event) => {
        setKeyword(event.target.value);
    };
         
    return (
        <div className="content">
            <div className="keyword_box">
                <TextField id="standard-basic" label="キーワード" onChange={ (event) => handleKeyword(event) } />
                { props.setKeyword(keyword) }
            </div>
        </div>
    );
}

export default Keyword;