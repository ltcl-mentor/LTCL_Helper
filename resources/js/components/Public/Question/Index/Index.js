import React, {useState, useEffect} from 'react';
import axios from "axios";
import ReactDOM from 'react-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Curriculum from './curriculum';
import Portfolio from './portfolio';

function Index() {
    const [questions, setQuestions] = useState([]);
    const [value, setValue] = React.useState(0);
    
    useEffect(() => {
        axios
            .get("/react/checked/questions")
            .then(response => {
                setQuestions(response.data);
            }).catch(error => {
                console.log(error);
            });
    }, []);
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    let tab_content;
    if (value === 0) {
        tab_content = ( <Curriculum questions={ questions }/> );
    } else {
        tab_content = ( <Portfolio questions={ questions }/> );
    }
    
    return (
        <div className="container">
            <Box sx={{ width: '95%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={ value } onChange={ handleChange } aria-label="basic tabs example">
                        <Tab label="カリキュラム" />
                        <Tab label="成果物" />
                    </Tabs>
                </Box>
                { tab_content }
            </Box>
        </div>
    );
}

export default Index;

// if (document.getElementById('Question_public_index')) {
//     ReactDOM.render(<Index />, document.getElementById('Question_public_index'));
// }
