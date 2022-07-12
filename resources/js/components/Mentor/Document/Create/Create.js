import React,{useState} from 'react';
import axios from "axios";
import {useHistory} from 'react-router-dom';
import Button from '@mui/material/Button';
import SaveIcon from '@material-ui/icons/Save';
import Box from '@mui/material/Box';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

import Breadcrumbs from '../../../Shared/Breadcrumbs';
import Target from './target';
import Title from './title';
import URL from './link';

/**
 * 関連記事作成のメインコンポーネント
 */
function Create() {
    const history = useHistory();
    const [clickCount, setClickCount] = useState(0);
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

    const handleSubmit = () => {
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
        if (clickCount === 0) {
            setClickCount(1);

            axios
                .post("/documents/store", {
                    targets: targets,
                    title: title,
                    link: link,
                })
                .then(response => {
                    if (response.status === 200) {
                        history.push(`/documents/${ response.data.id }`, { document: "created" });
                    }
                }).catch(error => {
                    console.log(error);
                    setClickCount(0);
                });
        } else {
            return false;
        }
    };

    return (
        <div className="container">
            <Breadcrumbs page="mentor_document_create"/>

            <Box sx={{ width: "70%", marginLeft: "15%" }}>
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
                        <Button onClick={ handleSubmit } variant="contained" endIcon={<SaveIcon />}>
                            登録する
                        </Button>
                    </Typography>
                </Card>
            </Box>
        </div>
    );
}

export default Create;
