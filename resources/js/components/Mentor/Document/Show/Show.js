import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import Parameters from './parameters';
import Questions from './questions';

function Document() {
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
            <Typography align="center" variant="h4" component="div" sx={{ marginTop: "5%" }}>記事詳細</Typography>
            <Typography align="center" variant="h6" component="div">
                <Link to={`/documents/` + id + `/edit`} className="editBtn">編集する</Link>
            </Typography>
            <form action={`/documents/` + id + `/delete`} method="post" id="delete">
                <input type="hidden" value={ csrf_token } name="_token" />
                
                <Typography align="center" variant="h6" component="div">
                    <p onClick={ deleteConfirm } >削除する</p>
                </Typography>
            </form>

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