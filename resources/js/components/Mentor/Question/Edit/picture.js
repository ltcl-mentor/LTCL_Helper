import React, {useState, useEffect} from 'react';
import axios from "axios";
import Typography from '@material-ui/core/Typography';

function Picture(props) {
    const [images, setImages] = useState([]);
    
    useEffect(() => {
        axios
            .get(`/react/images/${ props.question_id }`)
            .then(response => {
                setImages(response.data);
            }).catch(error => {
                console.log(error);
            });
    }, []);
    
    const list = images.map((image) => {
        return (
            <label>
                <input type="checkbox" name="delete_id[]" value={ image.id }/>
                <a href={ image.image_path } data-lightbox="group">
                    <img src={ image.image_path } className="image"/>
                </a>
            </label>
        );
    });
    
    return (
        <div>
            { images.length !== 0 && 
                <Typography
                    variant="h5"
                    component="div"
                    sx={{
                        marginTop: 4,
                        marginLeft: 2,
                    }}
                >
                    4.5. 既存画像の削除
                </Typography>
            }
            
            { list }
        </div>
    );
}

export default Picture;