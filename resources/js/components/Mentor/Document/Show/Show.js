import React, {useState, useEffect} from 'react';
import {Link, useParams, useLocation, useHistory} from 'react-router-dom';
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@mui/material/Button';

import Alert from '../../../Alert';
import Breadcrumbs from '../../../Breadcrumbs';
import Parameters from './parameters';
import Questions from './questions';

/**
 * 関連記事詳細(管理画面)のメインコンポーネント
 */
function Document() {
    const parameter = useLocation();
    const { id } = useParams();
    const history = useHistory();
    const [doc, setDoc] = useState([]);
    
    // 画面描画時に実行
    useEffect(() => {
        // 該当記事取得
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
            axios
                .post(`/documents/${ id }/delete`)
                .then(response => {
                    if (response.status === 200) {
                        history.push("/documents/index", { document: "deleted", number: 1 });
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
                type="document"
                status={ parameter.state && parameter.state.document }
                info={ parameter.state && parameter.state.number }
            />
            
            <Breadcrumbs page="mentor_document_show"/>
            
            <Typography align="center" variant="h6" component="div" sx={{ marginTop: 4 }}>
                <Link to={`/documents/` + id + `/edit`} className="editBtn">
                    <Button variant="contained" color="info" startIcon={ <EditIcon /> }>編集する</Button>
                </Link>
            </Typography>
            
            <Typography align="center" variant="h6" component="div" sx={{ marginTop: 1, marginBottom: 2 }}>
                <Button variant="contained" color="error" onClick={ deleteConfirm } startIcon={ <DeleteIcon /> }>削除する</Button>
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
                <Typography
                    variant="h4"
                    component="div"
                    align="center"
                    sx={{
                        marginTop: 4,
                        marginBottom: 2,
                    }}
                >
                    関連質問
                </Typography>
                
                <Typography component="div" align="center" sx={{ marginTop: 1, marginBottom: 2}} >
                    <Link to={ `/links/document/` + id }>
                        <Button variant="contained" color="info" startIcon={ <EditIcon /> }>編集する</Button>
                    </Link>
                </Typography>
                
                <Questions id={ id }/>
            </div>
        </div>
    );
}

export default Document;