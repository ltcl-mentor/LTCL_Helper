import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@mui/material/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import Publish from './Publish/publish';
import Parameters from './parameters';
import Question from './question';
import Comment from './comment';
import Documents from '../../../Public/Question/Show/documents';

function Show() {
    const { id } = useParams();
    const [question, setQuestion] = useState([]);
    const [images, setImages] = useState([]);
    const [documents, setDocuments] = useState([]);
    const categories = ['カリキュラム', '成果物'];
    const topics = ['AWS', 'HTML', 'CSS', 'JavaScript', 'サーバー', 'PHP', 'Laravel', 'DB', 'Git&GitHub', 'マイグレーション', 'リレーション', 'Laravel拡張', '画像処理', 'Heroku環境', 'API', 'デザイン'];
    const csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;

    useEffect(() => {
        axios
            .get(`/react/question/${ id }`)
            .then(response => {
                setQuestion(response.data);
            }).catch(error => {
                console.log(error);
            });
            
        axios
            .get(`/react/images/${ id }`)
            .then(response => {
                setImages(response.data);
            }).catch(error => {
                console.log(error);
            });
            
        axios
            .get(`/react/related/documents/${ id }`)
            .then(response => {
                setDocuments(response.data);
            }).catch(error => {
                console.log(error);
            });
    }, []);
    
    const deleteConfirm = () => {
        if (confirm('データが削除されます。\nよろしいですか？')) {
            document.getElementById('delete').submit();
        } else {
            window.alert('キャンセルしました');
            return false;
        }
    };
    
    return (
        <div className="container">
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" to="/">
                    HOME
                </Link>
                
                <Link underline="hover" to="/mentor/top">
                    メンタートップ
                </Link>
                
                <Link underline="hover" to="/questions/index">
                    質問一覧
                </Link>
                
                <Typography color="text.primary">
                    質問詳細
                </Typography>
            </Breadcrumbs>
            
            <Typography component="div" align="center" sx={{ marginTop: 4 }} >
                <Publish
                    question_id={ id }
                    csrf_token={ csrf_token }
                    question={ question }
                    images={ images }
                    documents={ documents }
                    category={ categories[question.category] }
                    topic={ topics[question.topic] }
                />
            </Typography>
            
            <Typography component="div" align="center" sx={{ marginTop: 1 }} >
                <Link to={ `/questions/` + id + `/edit` }>
                    <Button variant="contained" color="info" startIcon={ <EditIcon /> }>編集する</Button>
                </Link>
            </Typography>
            
            <Typography component="div" align="center" sx={{ marginTop: 1, marginBottom: 2 }} >
                <form action={ `/questions/` + id + `/delete` } method="post" id="delete">
                    <input type="hidden" name="_token" value={ csrf_token }/>
                    <Button variant="contained" color="error" onClick={ deleteConfirm } startIcon={ <DeleteIcon /> }>削除する</Button>
                </form>
            </Typography>
    
            <Parameters
                category={ categories[question.category] }
                topic={ topics[question.topic] }
                curriculum_number={ question.curriculum_number }
                user_id={ question.user_id }
                check={ question.check }
            />
            
            <Question 
                count={ images.filter(v=>v).length }
                images={ images }
                question={ question.question }
            />
            
            <Comment 
                comment={ question.comment }
            />
    
            <Typography
                variant="h4"
                component="div"
                align="center"
                sx={{
                    marginTop: 4,
                    marginBottom: 2,
                }}
            >
                関連記事
            </Typography>
            
            <Typography component="div" align="center" sx={{ marginTop: 1, marginBottom: 2}} >
                <Link to={ `/links/question/` + question.id }>
                    <Button variant="contained" color="info" onClick={ deleteConfirm } startIcon={ <EditIcon /> }>編集する</Button>
                </Link>
            </Typography>
                
            <Documents 
                documents={ documents }
            />
        </div>
    );
}

export default Show;

