import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import {useParams} from 'react-router-dom';
import Button from '@mui/material/Button';
import SaveIcon from '@material-ui/icons/Save';
import Box from '@mui/material/Box';
import Card from '@material-ui/core/Card';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@material-ui/core/Typography';

import Target from '../Create/target';
import Title from '../Create/title';
import URL from '../Create/link';

function Edit() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [title_validation_error, setTitleValidationError] = useState(false);
    const [link, setLink] = useState('');
    const [link_validation_error, setLinkValidationError] = useState(false);
    const [targets, setTargets] = useState({
        beginner: true,
        amature: false,
        master: false,
        all: false,
     });
    const csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
    
    useEffect(() => {
        axios
            .get(`/react/document/${ id }`)
            .then(response => {
                setTitle(response.data.title);
                setLink(response.data.link);
                setTargets({
                    beginner: response.data.beginner,
                    amature: response.data.amature,
                    matser: response.data.matser,
                    all: response.data.all,
                });
            }).catch(error => {
                console.log(error);
            });
    }, []);
    
    let set = 0;
    const handleClick = () => {
        // タイトルのバリデーション
        if ( !(title.trim().length !== 0 && title.trim().length <= 50) ) {
            setTitleValidationError(true);
            return false;
        }
        
        // URLのバリデーション
        if ( !(link.trim().length !== 0) ) {
            setLinkValidationError(true);
        }
        
        // フォーム送信と重複保存の防止
        if (set === 0) {
            document.getElementById('create').submit();
            set=1;
        } else {
            return false;
        }
    };
    
    return (
        <div className="container">
            <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 4 }}>
                <Link underline="hover" to="/">
                    HOME
                </Link>
                
                <Link underline="hover" to="/mentor/top">
                    メンタートップ
                </Link>
                
                <Link underline="hover" to="/documents/index">
                    記事一覧
                </Link>
                
                <Link underline="hover" to={ `/documents/` + id }>
                    記事詳細
                </Link>
                
                <Typography color="text.primary">
                    記事編集
                </Typography>
            </Breadcrumbs>
            
            <Box sx={{ width: "70%", marginLeft: "15%" }}>
                <form action={ `/documents/` + id + `/update` } method="post" id="create">
                    <input type="hidden" value={ csrf_token } name="_token" />
                    
                    <Card sx={{ marginBottom: 2 }}>
                        
                        <Target
                            targets={ targets }
                            setTargets={ setTargets }
                        />
                        
                        <Title 
                            title={ title }
                            setTitle={ setTitle }
                            title_validation_error={ title_validation_error }
                        />
                        
                        <URL
                            link={ link }
                            setLink={ setLink }
                            link_validation_error={ link_validation_error }
                        />
                        
                        <Typography
                            align="center"
                            component="div"
                            sx={{
                                marginTop: 4,
                                marginBottom: 3,
                            }}
                        >
                            <Button onClick={ handleClick } variant="contained" endIcon={<SaveIcon />}>
                                登録する
                            </Button>
                        </Typography>
                    </Card>
                </form>
            </Box>
        </div>
    );
}

export default Edit;
