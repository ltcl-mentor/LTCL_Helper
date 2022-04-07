import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import axios from "axios";
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import CardMedia from '@mui/material/CardMedia';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@mui/material/Button';

function Portfolio(props) {
    
    const [keyword, setKeyword] = useState('');
    const [beginner, setBeginner] = useState(false);
    const [amature, setAmature] = useState(false);
    const [master, setMaster] = useState(false);
    const [all ,setAll] = useState(false);
    const [documents , setDocuments] = useState([]); 
    
    let documentsList;
    // 関連質問がなかった場合
    if (props.documents.filter(v=>v).length === 0) {
        documentsList = (<div className="empty_message">関連する記事はありません。</div>);
        
    // 関連質問があった場合
    } else {
        documentsList = documents.map((document) => {
            return (
                <Grid item key={document.title}>
                    <CardActionArea sx={{ width: "300px", height: "280px"}}>
                        <a href={ document.link } target="_blank">
                            <Card sx={{ width: "300px", height: "280px"}}>
                                <CardActionArea sx={{display:'flex', justifyContent: 'center'}}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="/images/NotePM_Logo_Vertical.png"
                                    sx={{width:'140px'}}
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
                    </CardActionArea>
                </Grid>
            );
        });
    }
    
    // 対象者の指定が変更された場合に実行
    useEffect(() => {
        var keyword_documents = [];
        // キーワードが未入力の場合
        if (keyword.trim().length === 0) {
            keyword_documents = props.documents;
        } else {
            default_documents.map((doc) => {
                doc.title.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 && keyword_documents.push(doc);
            });
        }
        
        var target_documents = [];
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
            setDocuments(target_documents);
        } else {
            setDocuments(keyword_documents);
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
        
        <Grid container spacing={2} sx={{ flexGrow: 1, marginBottom: 3 , marginTop: 3}} justifyContent="center">
            <Grid item sx={{ width: "100%" }}>
                <Paper
                    component="form"
                    sx={{
                        p: '2px 4px',
                        display: 'flex',
                        alignItems: 'center',
                        width: "40%",
                        minWidth: "350px",
                        margin: "0 auto", }}
                >
                    <Input
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="キーワードを入力してください。"
                        onChange={ (event) => handleKeyword(event) }
                        onKeyDown={ (event) => {
                            if (event.key === 'Enter')
                            event.preventDefault();
                        }}
                    />
                    <IconButton sx={{ p: '10px' }}>
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </Grid>
            <Grid item >
                <Button
                    variant={ beginner ? "contained" : "outlined" }
                    color="success"
                    onClick={ () => handleSelect("beginner") }
                >
                    初級者向け
                </Button>
            </Grid>
            <Grid item >
                <Button
                    variant={ amature ? "contained" : "outlined" }
                    color="info"
                    onClick={ () => handleSelect("amature") }
                >
                    中級者向け
                </Button>
            </Grid>
            <Grid item >
                <Button
                    variant={ master ? "contained" : "outlined" }
                    color="secondary"
                    onClick={ () => handleSelect("master") }
                >
                    上級者向け
                </Button>
            </Grid>
            <Grid item >
                <Button
                    variant={ all ? "contained" : "outlined" }
                    color="error"
                    onClick={ () => handleSelect("all") }
                >
                    全員向け
                </Button>
            </Grid>
        </Grid>
        <Box sx={{marginTop:2, marginBottom: 3}}>
            <Grid container spacing={2} sx={{ flexGrow: 1 }} justifyContent="center" >
                { documentsList }
            </Grid>
        </Box>
        </div>
    );
}

export default Portfolio;
