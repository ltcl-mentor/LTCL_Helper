import React, {useState, useEffect} from 'react';
import axios from "axios";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function Picture(props) {
    const [images, setImages] = useState([]);
    
    const imageSelected = () => {
        const data = new FormData();
        
        data.append('image', document.querySelector('input[type="file"]').files[0]);
        const headers = { "content-type": "multipart/form-data" };
        console.log(data);
        axios
            .post("/questions/image/store", data, {headers})
            .then(response => {
                    console.log(response);
                if (response.status === 200) {
                }
            }).catch(error => {
                console.log(error);
            });
    };
    
    return (
        <Box sx={{ textAlign: "center", marginTop: 3 }}>
            <label htmlFor="contained-button-file">
                <input accept="image/*" id="contained-button-file" type="file" onChange={ imageSelected } hidden />
                <Button variant="contained" component="span">
                    参考画像追加（複数選択可）
                </Button>
            </label>
        </Box>
    );
}

export default Picture;