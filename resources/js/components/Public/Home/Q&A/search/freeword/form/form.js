import React from 'react';

import Typography from '@material-ui/core/Typography';
import Card from '@mui/material/Card';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import SearchBox from '../../searchBox';

const style = {
    width: '220px',
    margin: '0 auto',
};


/**
 * 検索内容の入力欄
 */
const Form = (props) => {
    
    // AND検索かOR検索かの選択内容取得
    const handleSearchType = (event) => {
        props.setSearchType(event.target.value);
    };
    
    return (
        <React.Fragment>
            <Card
                sx={{
                    width: "90%",
                    margin: "5% auto",
                    backgroundColor: "#ECE9E9",
                }}
            >
                <Typography align="left" variant="h7" component="div" sx={{ maxWidth: '565px', width: '80%', m: '0 auto' }}>
                    複数のワードを入力する際はスペース（半角・全角どちらでも可）で分けてください。<br/>
                    <Typography sx={{ fontWeight: 'bold' }} component="span">OR検索</Typography>：（複数のワード検索時）いずれかの検索ワードにヒットする検索結果を表示<br/>
                    <Typography sx={{ fontWeight: 'bold' }} component="span">AND検索</Typography>：（複数のワード検索時）すべての検索ワードにヒットする検索結果を表示
                </Typography>
            </Card>
            
            <div style={style}>
                <FormControl>
                    <RadioGroup row onChange={(event) => handleSearchType(event)} defaultValue="OR">
                        <FormControlLabel value="OR" control={<Radio />} label="OR検索" />
                        <FormControlLabel value="AND" control={<Radio />} label="AND検索" />
                    </RadioGroup>
                </FormControl>
            </div>
            
            <SearchBox setFreeword={props.setFreeword} />
        </React.Fragment>
    );
};

export default Form;