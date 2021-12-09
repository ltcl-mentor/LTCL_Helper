import React, {useState, useEffect} from 'react';
import axios from "axios";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function Picture(props) {
    let images = [];
    
    // 画像アップロード
    // 画像が選択された際に実行
    const imageSelected = () => {
        const data = new FormData();
        
        data.append('image', document.querySelector('input[type="file"]').files[0]);
        const headers = { "content-type": "multipart/form-data" };
        axios
            .post("/questions/image/store", data, {headers})
            .then(response => {
                if (response.status === 200) {
                    // 画像のURLをresponseから取得 
                    images.push(response.data);
                }
            }).catch(error => {
                console.log(error);
            });
    };
    
    console.log(images);
    
    return (
        <Box sx={{ textAlign: "center", marginTop: 3 }}>
            <label htmlFor="contained-button-file">
                <input accept="image/*" id="contained-button-file" type="file" onChange={ imageSelected } hidden />
                <Button variant="contained" component="span">
                    画像アップロード
                </Button>
            </label>
            { images.forEach((image_path, image_number) => {
                return (<a href={ image_path }>画像{ image_number }</a>);
            }) }
        </Box>
    );
}

export default Picture;