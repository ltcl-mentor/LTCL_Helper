import React, {useState, useEffect} from 'react';
import axios from "axios";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Folder';

function Picture(props) {
    
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
                    props.setImages([...props.images, response.data]);
                }
            }).catch(error => {
                console.log(error);
            });
    };
    
    const insertImage = (image_path) => {
        props.setImage(image_path);
    };
    
    return (
        <Box sx={{ textAlign: "center", marginTop: 3 }}>
            <label htmlFor="contained-button-file">
                <input accept="image/*" id="contained-button-file" type="file" onChange={ imageSelected } hidden />
                <Button variant="contained" component="span">
                    画像アップロード
                </Button>
            </label>
            
            <Box sx={{ width: "90%", paddingLeft: "5%" }}>
                <List>
                    { props.images.map((image, index) => {
                            return (
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FolderIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    
                                    <ListItemText
                                        primary={ <a href={ image } target="_blank">参考画像{ index }</a> }
                                        secondary={ <p onClick={ () => insertImage(image) }>質問に挿入</p> }
                                    />
                                </ListItem>
                            );
                        })
                    }
                </List>
            </Box>
        </Box>
    );
}

export default Picture;