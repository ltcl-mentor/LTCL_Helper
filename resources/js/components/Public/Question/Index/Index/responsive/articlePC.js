import React, {useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import axios from "axios";
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import CardMedia from '@mui/material/CardMedia';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@mui/material/Paper';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import InputBase from '@mui/material/InputBase';
import useMedia from 'use-media';

const stylePaginate = { marginTop: 1, marginBottom: 2, display: 'flex', justifyContent: "center" };
const styleDocumentsListBox = { display: 'flex', flexGrow: 1, justifyContent: "center", mb: 2, width: "300px", height: "280px" };
const styleDocumentsListCard = { width: "300px", height: "280px"};
const styleDocumentsListMedia = {display:'flex', justifyContent: 'center'};
const styleDocumentsListMediaWidth = {width:'140px'};
const styleFlexGrow = { flexGrow: 1 };
const styleElement = { width: "300px", height: "280px", marginTop: 2 };
const styleContent = { flexGrow: 1, marginBottom: 3 , marginTop: 3};
const stylePaper = { p: "4px", display: "flex", alignItems: "center", width: "70%", ml: "auto"};
const styleInputBase = { ml: 1, flex: 1 };
const styleSearchIcon = { backgroundColor: '#771AF8', color: 'white', height: '100%', '&:hover': {backgroundColor: '#6633CC'} }
const styleFlexWrap = {display:'flex', flexWrap: 'wrap'};

function ArticlePC(props) {

    const [keyword, setKeyword] = useState('');
    const [beginner, setBeginner] = useState(false);
    const [amature, setAmature] = useState(false);
    const [master, setMaster] = useState(false);
    const [all ,setAll] = useState(false);
    const [documents , setDocuments] = useState({
        eventList: [],
        currentPage: 1,
        itemsCountPerPage: 1,
        totalItemsCount: 1,
        lastPage: 0,
    });
    const is1200 = useMedia({minWidth: '1200px'});
    const is767 = useMedia({minWidth: '767px'});

    const handlePageClick = (event, index) => {
        // 検索結果の質問取得
        axios
            .get(`/react/documents/related/paginate/${ props.category }?page=${index}`)
            .then(response => {
                setDocuments({
                    eventList: response.data.data,
                    itemsCountPerPage: response.data.per_page,
                    totalItemsCount: response.data.total,
                    currentPage: response.data.current_page,
                    lastPage: response.data.last_page,
                });
            }).catch(error => {
                console.log(error);
            });
    };

    let documentsList;
    let emptyMessage;
    let pagination;
    // 関連質問がなかった場合
    if (props.documents.eventList.filter(v=>v).length === 0) {
        emptyMessage = (<Box className="empty_message" display="flex" textAlign='center' justifyContent="center"><Typography>関連する記事はありません。</Typography></Box>);

    // 関連質問があった場合
    } else {
        // ペジネーションの部分
        pagination = (
            <Pagination
                count={ documents.lastPage }
                page={ documents.currentPage }
                onChange={ handlePageClick }
                sx={ stylePaginate }
            />
        );
        documentsList = documents.eventList.map((document) => {
            return (
                        <Box key={document.title} spacing={2} sx={styleDocumentsListBox} >
                            <a href={ document.link } target="_blank">
                                <Card sx={styleDocumentsListCard}>
                                    <CardActionArea sx={styleDocumentsListMedia}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image="/images/NotePM_Logo_Vertical.png"
                                            sx={styleDocumentsListMediaWidth}
                                        />
                                    </CardActionArea>
                                    <CardContent>
                                        { document.beginner ? <Chip variant="outlined" color="success" label="初心者向け" /> : "" }
                                        { document.amature ? <Chip variant="outlined" color="primary" label="中級者向け" /> : "" }
                                        { document.master ? <Chip variant="outlined" color="secondary" label="上級者向け" /> : "" }
                                        { document.all ? <Chip variant="outlined" color="error" label="全員向け" /> : "" }
                                        <Typography gutterBottom variant="h6" component="div" align="center">
                                            { document.title }
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </a>
                        </Box>
            );
        });

        let listNumber = documentsList.length;
        let element = (
            <Box key={document.title} spacing={2} sx={styleFlexGrow} justifyContent="center" display="flex" >
                <Box sx={styleElement}>
                </Box>
            </Box>
        )
        //要素を左寄せにしたいので、条件に合わせて空の要素を挿入
        if(is1200) {
            let remainder = listNumber % 3;
            if (remainder === 1) {
                documentsList.push(element);
                documentsList.push(element);
            } else if (remainder === 2) {
                documentsList.push(element);
            }
        } else if(is767) {
            let remainder = listNumber % 2;
            if(remainder) {
                documentsList.push(element);
            }
        }
    }


    // 対象者の指定が変更された場合に実行
    useEffect(() => {
        let keyword_documents = [];
        // キーワードが未入力の場合
        if (keyword.trim().length === 0) {
            keyword_documents = props.documents.eventList;
        } else {
            props.documents.eventList.map((doc) => {
                doc.title.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 && keyword_documents.push(doc);
            });
        }

        let target_documents = [];
        // 対象者のいづれかが選択されていた場合
        if (beginner || amature || master || all) {
            keyword_documents.map((doc) => {
                if (beginner) {
                    doc.beginner && target_documents.push(doc);
                }
                if (amature) {
                    if (target_documents.indexOf(doc) === -1) {
                        doc.amature && target_documents.push(doc);
                    }
                }
                if (master) {
                    if (target_documents.indexOf(doc) === -1) {
                        doc.matser && target_documents.push(doc);
                    }
                } else if (all) {
                    if (target_documents.indexOf(doc) === -1) {
                        doc.all && target_documents.push(doc);
                    }
                }
            });
            setDocuments({...props.documents, eventList: target_documents});
        } else {
            setDocuments({...props.documents, eventList: keyword_documents});
        }

    },[keyword, beginner, amature, master, all]);



    // キーワード入力
    const handleKeyword = (event) => {
        // 入力に空白があれば"/"に置換
        setKeyword(event.target.value);
    };

    // ボタンの表示切り替え
    const handleSelect = (whitch) => {
        switch (whitch) {
            case "beginner":
                beginner ? setBeginner(false) : setBeginner(true);
                break;

            case "amature":
                amature ? setAmature(false) : setAmature(true);
                break;

            case "master":
                master ? setMaster(false) : setMaster(true);
                break;

            case "all":
                all ? setAll(false) : setAll(true);
                break;
        }
    };


    return (
        <div>

        <Grid container spacing={2} sx={styleContent} justifyContent="center">
                <Grid item xs={9}>
                    <Paper
                        component="form"
                        sx={stylePaper}
                    >
                        <InputBase
                            sx={styleInputBase}
                            placeholder="検索ワードを入力してください"
                            inputProps={{ 'aria-label': 'search word' }}
                            onChange={ (event) => handleKeyword(event) }
                            onKeyDown={ (event) => {if (event.key === 'Enter') event.preventDefault(); }}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Button
                        variant="contained"
                        startIcon={<SearchIcon />}
                        sx={styleSearchIcon}
                    >
                    </Button>
                </Grid>
            <Grid item >
                <Button
                    variant={ beginner ? "contained" : "outlined" }
                    color="success"
                    onClick={ () => handleSelect("beginner") }
                    size = 'large'
                >
                    初級者向け
                </Button>
            </Grid>
            <Grid item >
                <Button
                    variant={ amature ? "contained" : "outlined" }
                    color="info"
                    onClick={ () => handleSelect("amature") }
                    size = 'large'
                >
                    中級者向け
                </Button>
            </Grid>
            <Grid item >
                <Button
                    variant={ master ? "contained" : "outlined" }
                    color="secondary"
                    onClick={ () => handleSelect("master") }
                    size = 'large'
                >
                    上級者向け
                </Button>
            </Grid>
            <Grid item >
                <Button
                    variant={ all ? "contained" : "outlined" }
                    color="error"
                    onClick={ () => handleSelect("all") }
                    size = 'large'
                >
                    全員向け　
                </Button>
            </Grid>
        </Grid>
            <Box sx={styleFlexWrap}>
                { documentsList }
            </Box>
            {emptyMessage}
            { pagination }
        </div>
    );
}

export default ArticlePC;
