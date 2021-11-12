import React, {useState} from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Typography from '@material-ui/core/Typography';
import Card from '@mui/material/Card';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function Form(props) {
    const handleFreeword = (event) => {
        // 入力に空白があれば"/"に置換
        props.setFreeword(event.target.value.replace(/\s+/g,'/'));
    };
    
    const handleSearchType = (event) => {
        props.setSearchType(event.target.value);
    };
    
    return (
        <div>
            <Card
                sx={{
                    width: "100%",
                    padding: "5%",
                    margin: "5% 0",
                    backgroundColor: "rgb(200,200,200)",
                }}
            >
                <Typography align="left" variant="h6" component="div" >
                    検索方法<br/>
                    ・下の入力欄に検索したいワードを入力してください。<br/>
                    ・複数のワードを入力する際は半角もしくは全角スペースで分けてください。<br/>
                    ・複数のワードで検索する場合に、いづれかの検索ワードにヒットするものを探す場合はOR検索を、全ての検索ワードにヒットする質問を検索したい場合はAND検索を選択してください。
                </Typography>
            </Card>
            
            <FormControl component="fieldset">
                <FormLabel component="legend">検索タイプ</FormLabel>
                <RadioGroup row aria-label="gender" name="searchType" onChange={ (event) => handleSearchType(event) } defaultValue="OR" >
                    <FormControlLabel value="OR" control={<Radio />} label="OR検索" />
                    <FormControlLabel value="AND" control={<Radio />} label="AND検索" />
                </RadioGroup>
            </FormControl>
            
            <TextareaAutosize
                aria-label="empty textarea"
                placeholder="検索ワードを入力してください。"
                style={{ width: "100%" }}
                onChange={ (event) => handleFreeword(event) }
            />
        </div>
    );
}

export default Form;