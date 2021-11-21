import React,{useState} from 'react';
import Button from '@mui/material/Button';
import SaveIcon from '@material-ui/icons/Save';
import Box from '@mui/material/Box';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

import Breadcrumbs from '../../../Breadcrumbs';
import Target from './target';
import Title from './title';
import URL from './link';

function Create() {
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
            <Breadcrumbs page="mentor_document_create"/>
            
            <Box sx={{ width: "70%", marginLeft: "15%" }}>
                <form action="/documents/store" method="post" id="create">
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

export default Create;
