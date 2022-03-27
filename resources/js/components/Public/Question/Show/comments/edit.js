import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from "axios";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import TextForm from '../../Create/Create/question-form/original-text-form/originalTextForm';

/**
 * コメント編集
 */
function Edit(props) {
    const history = useHistory();
    const [clickCount, setClickCount] = useState(0);
    const [comment, setComment] = useState('');
    const [images, setImages] = useState([]);
    
    useEffect(() => {
        setComment(props.comment);
    }, []);
    
    // 更新処理
    const handleSubmit = () => {
        // 重複保存防止のために保存ボタンのクリック数をカウント
        // クリック数が0回の場合のみ保存実行
        if (clickCount === 0) {
            props.setCommentChanging(true);
            setClickCount(1);
            
            axios
                .post(`/comments/${ props.comment_id }/update`, {
                    comment: comment,
                    images: images,
                })
                .then(response => {
                    if (response.status === 200) {
                        props.setCommentChanging(false);
                        props.setEditId('');
                        setClickCount(0);
                        history.push("/questions/" + response.data.id, {comment: 'updated'});
                    }
                }).catch(error => {
                    console.log(error);
                });
        } else {
            return false;
        }
    };
    
    return (
        <Box sx={{ marginBottom: 2 }}>
            <TextForm
                text={ comment }
                setText={ setComment }
                images={ images }
                setImages={ setImages }
            />
            
            <Grid container spacing={2} justifyContent="center" >
                <Grid item>
                    <Button
                        variant="contained"
                        color="info"
                        onClick={ () => props.setEditId('') }
                    >
                        キャンセル
                    </Button>
                </Grid>
            
                <Grid item>
                    { comment.trim().length === 0 ?
                        <Button
                            variant="outlined"
                            color="info"
                        >
                            更新
                        </Button>
                    :
                        <Button
                            variant="contained"
                            color="info"
                            onClick={ handleSubmit }
                        >
                            更新
                        </Button>
                    }
                </Grid>
            </Grid>
        </Box>
    );
}

export default Edit;