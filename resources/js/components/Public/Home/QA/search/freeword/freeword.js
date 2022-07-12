import React, { useState } from 'react';

import Typography from '@material-ui/core/Typography';
import Card from '@mui/material/Card';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import Result from './result/result';
import SearchBox from './searchBox/searchBox';

// 各パーツのスタイル設定
const styleSearchRadio = {
    width: '220px',
    margin: '0 auto',
};
const styleExplanationArea = {
    width: "90%",
    margin: "5% auto",
    backgroundColor: "#ECE9E9",
};
const styleExplanation = {
    maxWidth: '565px',
    width: '80%',
    m: '0 auto'
};


/**
 * フリーワード検索
 */
const freeword = (props) => {
    const [searchType, setSearchType] = useState('OR');
    const [freeword, setFreeword] = useState('');
    
    const handleSearchType = (event) => {
        setSearchType(event.target.value);
    };
    
    return (
        <React.Fragment>
            {/* 検索フォーム */}
            <Card sx={styleExplanationArea}>
                <Typography align="left" variant="h7" component="div" sx={styleExplanation}>
                    複数のワードを入力する際はスペース（半角・全角どちらでも可）で分けてください。<br/>
                    <Typography fontWeight="bold" component="span">OR検索</Typography>：（複数のワード検索時）いずれかの検索ワードにヒットする検索結果を表示<br/>
                    <Typography fontWeight="bold" component="span">AND検索</Typography>：（複数のワード検索時）すべての検索ワードにヒットする検索結果を表示
                </Typography>
            </Card>
            
            <div style={styleSearchRadio}>
                <FormControl>
                    <RadioGroup row onChange={(event) => handleSearchType(event)} defaultValue="OR">
                        <FormControlLabel value="OR" control={<Radio />} label="OR検索" />
                        <FormControlLabel value="AND" control={<Radio />} label="AND検索" />
                    </RadioGroup>
                </FormControl>
            </div>
            
            <SearchBox setFreeword={setFreeword} isWide={props.isWide} />
            
            
            {/* 検索結果 */}
            {/* 先頭が空白の時(/)に全データを持ってきてしまうため条件に追加 */}
            {(freeword.length > 0 && freeword != "/") &&
                <Result 
                    searchType={ searchType }
                    freeword={ freeword }
                />
            }
        </React.Fragment>
    );
};

export default freeword;