import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Link, useParams, useLocation, useHistory} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@mui/material/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import Alert from '../../../Alert';
import Breadcrumbs from '../../../Breadcrumbs';
import Publish from './Publish/publish';
import Parameters from './parameters';
import Question from './question';
import Comment from './comment';
import Documents from '../../../Public/Question/Show/documents';

function Show() {
    const parameter = useLocation();
    const { id } = useParams();
    const history = useHistory();
    const [question, setQuestion] = useState([]);
    const [images, setImages] = useState([]);
    const [documents, setDocuments] = useState([]);
    const categories = ['カリキュラム', '成果物'];
    const topics = ['AWS', 'HTML', 'CSS', 'JavaScript', 'サーバー', 'PHP', 'Laravel', 'DB', 'Git&GitHub', 'マイグレーション', 'リレーション', 'Laravel拡張', '画像処理', 'Heroku環境', 'API', 'デザイン'];

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
            axios
                .post(`/questions/${ id }/delete`)
                .then(response => {
                    if (response.status === 200) {
                        history.push("/questions/index", { question: "deleted", number: 1 });
                    }
                }).catch(error => {
                    console.log(error);
                });
        } else {
            window.alert('キャンセルしました');
            return false;
        }
    };
    
    return (
        <div className="container">
            <Alert
                type="question"
                status={ parameter.state && parameter.state.question }
                info={ parameter.state && parameter.state.number }
            />
            
            <Breadcrumbs page="mentor_question_show"/>
            
            <Typography component="div" align="center" sx={{ marginTop: 4 }} >
                <Publish
                    question_id={ id }
                    question={ question }
                    setQuestion={ setQuestion } 
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
                <Button variant="contained" color="error" onClick={ deleteConfirm } startIcon={ <DeleteIcon /> }>削除する</Button>
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
                <Link to={ `/links/question/` + id }>
                    <Button variant="contained" color="info" startIcon={ <EditIcon /> }>編集する</Button>
                </Link>
            </Typography>
                
            <Documents 
                documents={ documents }
            />
        </div>
    );
}

export default Show;

