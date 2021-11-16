import React, {useState, useEffect} from 'react';
import axios from "axios";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

function Questions(props) {
    const [questions, setQuestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    
    useEffect(() => {
        axios
            .get(`/react/search/questions?category=${ props.category }&topic=${ props.topic }&curriculum_number=${ props.curriculum_number }&keyword=${ props.keyword }`)
            .then(response => {
                setQuestions(response.data);
            }).catch(error => {
                console.log(error);
            });
    }, []);
    
    const handlePageClick = (event, value) => {
        setCurrentPage(value);
    };
    
    const list = questions.map((question) => {
        return (
            <div>
                <Divider light />
                
                <ListItem button>
                    <a href={ '/questions/' + question.id + '/public' } className="question" key={ question.id } target="_blank">
                        <ListItemText
                            primary={ question.question }
                        />
                    </a>
                </ListItem>
                
                <Divider />
            </div>
        );
    });
    
    let emptyMessage;
    let questionList;
    let pagination;
    
    if (list.filter(v=>v).length === 0) {    //filterでlistに存在する空要素を排除し,その上で配列内の要素が何個あるかを判定。
        emptyMessage = ( <Typography align="center" variant="h6" component="div" >該当する質問がありません。</Typography> );
    } else {
        questionList = list.slice((currentPage - 1)*10, currentPage*10);
        pagination = (
            <Pagination
                count={ Math.floor(list.filter(v=>v).length/10) + 1 }
                page={ currentPage }
                onChange={ handlePageClick }
                sx={{ justifyContent: "center" }}
            />
        );
    }
    
    return (
        <Card sx={{ marginTop: 4, marginBottom:4 }}>
            <Typography
                variant="h7"
                component="div"
                sx={{
                    marginTop: 2,
                    marginLeft: 3,
                    marginBottom: 2,
                }}
            >
                カテゴリー：<font color="green">{ props.categories[props.category] }</font>、トピック：<font color="blue">{ props.topics[props.topic] }</font>の検索結果<font color="purple">{ list.filter(v=>v).length }</font>件
            </Typography>
            
            <Box sx={{ width: "90%", margin: "0 auto" }}>
                <List>
                    { questionList }
                </List>
            </Box>
            
            { pagination }
            
            { emptyMessage }
        </Card>
    );
}

export default Questions;
