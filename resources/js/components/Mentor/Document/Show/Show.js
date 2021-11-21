import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from "axios";
import {useParams} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@mui/material/Button';

import Alert from '../../../Alert';
import Breadcrumbs from '../../../Breadcrumbs';
import Parameters from './parameters';
import Questions from './questions';

function Document() {
    const parameter = useLocation().search.substr(1).split('=');
    const { id } = useParams();
    const [doc, setDoc] = useState([]);
    const csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
    
    useEffect(() => {
        axios
            .get(`/react/document/${ id }`)
            .then(response => {
                setDoc(response.data);
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
            <Alert type={ parameter[0] } status={ parameter[1] }/>
            
            <Breadcrumbs page="mentor_document_show"/>
            
            <Typography align="center" variant="h6" component="div" sx={{ marginTop: 4 }}>
                <Link to={`/documents/` + id + `/edit`} className="editBtn">
                    <Button variant="contained" color="info" startIcon={ <EditIcon /> }>編集する</Button>
                </Link>
            </Typography>
            
            <Typography align="center" variant="h6" component="div" sx={{ marginTop: 1, marginBottom: 2 }}>
                <form action={`/documents/` + id + `/delete`} method="post" id="delete">
                    <input type="hidden" value={ csrf_token } name="_token" />
                    <Button variant="contained" color="error" onClick={ deleteConfirm } startIcon={ <DeleteIcon /> }>削除する</Button>
                </form>
            </Typography>
            
            <Parameters 
                title={ doc.title }
                targets={ [
                    doc.beginner ? "初心者" : false,
                    doc.amature ? "中級者" : false,
                    doc.master ? "上級者" : false,
                    doc.all ? "全員" : false,
                ] }
                link={ doc.link }
                author={ doc.user_id }
            />
        
            <div>
                <Typography align="center" variant="h4" component="div" sx={{ marginTop: "5%" }}>関連質問</Typography>
                <Typography align="center" variant="h6" component="div"><a href={ `/links/question/` }>編集する</a></Typography>
                <Questions id={ id }/>
            </div>
        </div>
    );
}

export default Document;