import React from 'react';
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import CreateIcon from '@material-ui/icons/Create';
import ListIcon from '@material-ui/icons/List';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import DescriptionIcon from '@material-ui/icons/Description';
import PersonAddAltIcon from '@material-ui/icons/PersonAddAlt';
import PersonAddIcon from '@material-ui/icons/PersonAddAlt1';

function Top() {
    return (
        <div class="container">
            <h1 class="mentor_question_title">質問</h1>
            <div class="mentor_btns">
                <Link to="/questions/index">
                    <Button variant="contained" color="info" startIcon={ <ListIcon /> }>一覧</Button>
                </Link>
                
                <Link to="/questions/create">
                    <Button variant="contained" color="info" startIcon={ <CreateIcon /> }>新規登録</Button>
                </Link>
            
            </div>
        
            <h1 class="mentor_document_title">関連記事</h1>
            <div class="mentor_btns">
                <Link to="/documents/index">
                    <Button variant="contained" color="success" startIcon={ <ListIcon /> }>一覧</Button>
                </Link>
                
                <Link to="/documents/create">
                    <Button variant="contained" color="success" startIcon={ <CreateIcon /> }>新規登録</Button>
                </Link>
            
            </div>
        
            <h1 class="mentor_document_title">記事と質問の紐付け</h1>
            <div class="mentor_btns">
                <Link to="/links/question/index">
                    <Button variant="contained" color="secondary" startIcon={ <QuestionAnswerIcon /> }>質問から紐付け</Button>
                </Link>
                
                <Link to="/links/document/index">
                    <Button variant="contained" color="secondary" startIcon={ <DescriptionIcon /> }>記事から紐付け</Button>
                </Link>
                
            </div>
        
            <h1 class="mentor_list_title">名簿</h1>
            <div class="mentor_btns">
                <a href="/users/index"><Button variant="contained" color="error" startIcon={ <ListIcon /> }>一覧</Button></a>
                <a href="/users/admin/register"><Button variant="contained" color="error" startIcon={ <PersonAddIcon /> }>管理者の登録</Button></a>
                <a href="/users/public/register"><Button variant="contained" color="error" startIcon={ <PersonAddAltIcon /> }>受講生の登録</Button></a>
            </div>
        </div>
    );
}

export default Top;