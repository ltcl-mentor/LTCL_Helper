import React, {useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ToggleButton from '@mui/material/ToggleButton';
import CodeIcon from '@mui/icons-material/Code';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

import Picture from './picture';
import Preview from './preview';

function QuestionForm(props) {
    const [value, setValue] = useState(0);
    const [selectionRange, setSelectionRange] = useState(() => [0, 0]);
    
    // textareaの特定位置にカーソルを持っていきたいときに実行
    // setSelectionRangeに連動
    useEffect(() => {
        // textareaを入力状態に
        document.getElementById('question').focus();
        // カーソルを移動
        document.getElementById('question').setSelectionRange(selectionRange[0], selectionRange[1]);
    },[selectionRange]);
    
    // コードブロッック
    const handleCode = () => {
        // カーソル位置取得
        let selection_start = document.getElementById('question').selectionStart;
        let selection_end = document.getElementById('question').selectionEnd;
        
        // 文字列の選択がされていなかった場合
        if (selection_start === selection_end) {
            // 文章の末尾に記号挿入
            props.setQuestion(props.question + "\n```\n \n```\n\n");
            
            // カーソル位置を```の間に
            setSelectionRange([selection_end + 6, selection_end + 6]);
        
        // 文字列の選択がされていた場合
        } else {
            // 選択部分の直前
            let selection_before = props.question.substr(0, selection_start);
            // 選択部分
            let selection = props.question.substr(selection_start, selection_end);
            // 選択部分の直後
            let selection_after = props.question.substr(selection_end);
            
            // 選択部分の前後に記号挿入
            props.setQuestion(selection_before + "\n```\n" + selection + "\n```\n" + selection_after);
            
            // カーソル位置をコードブロックの後ろに
            setSelectionRange([selection_end + 10, selection_end + 10]);
        }
    };
    
    const handleList = () => {
        
    };
    
    const handleQuestion = (event) => {
        props.setQuestion(event.target.value);
    };
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    let tab_content;
    if (value === 0) {
        tab_content = (
            <React.Fragment>
                <Box sx={{ textAlign: "center", marginBottom: 1 }}>
                    <ToggleButton value="bold" aria-label="code_block" onClick={ handleCode }>
                        <CodeIcon />
                    </ToggleButton>
                    <ToggleButton value="italic" aria-label="list">
                        <FormatListBulletedIcon />
                    </ToggleButton>
                        {/*<ToggleButton value="underlined" aria-label="number_list">
                            <FormatListNumberedIcon />
                        </ToggleButton>*/}
                </Box>
                
                <TextareaAutosize
                    placeholder="質問内容を入力"
                    minRows={15}
                    value={ props.question }
                    onChange={ (event) => handleQuestion(event) }
                    style={{ 
                        width: "80%",
                        marginLeft: "10%",
                        paddingTop:2,
                    }}
                    id="question"
                />
            </React.Fragment>
        );
    } else {
        tab_content = (<Preview question={ props.question } />);
    }
    
    return (
        <div>
            <Typography
                variant="h5"
                component="div"
                sx={{
                    marginTop: 4,
                    marginLeft: 2,
                }}
            >
                4. 質問内容を入力
            </Typography>
            
            { props.question_validation_error === 1 && <p className="errorMassage">質問内容の入力は必須です。</p> }
            
            <Picture/>
            
            <Box sx={{ marginTop: 4 }}>
                <Tabs value={ value } onChange={ handleChange } aria-label="basic tabs example" centered>
                    <Tab label="入力" />
                    <Tab label="プレビュー" />
                </Tabs>
                
                <Box sx={{ marginTop: 2 }}>
                    { tab_content }
                </Box>
            </Box>
        </div>
    );
}

export default QuestionForm;