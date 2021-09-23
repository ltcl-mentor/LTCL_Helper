import React, {useState, useEffect} from 'react';
import axios from "axios";

function Picture(props) {
    const [images, setImages] = useState([]);
    const question_id = document.getElementById('Edit').getAttribute('question_id');
    
    useEffect(() => {
        axios
            .get(`/react/images/${ question_id }`)
            .then(response => {
                setImages(response.data);
            }).catch(error => {
                console.log(error);
            });
    },[]);
    
    const list = images.map((image) => {
        return (
            <label>
                <input type="checkbox" name="delete_id[]" value={ image.id }/>
                <a href={ image.image_path } data-lightbox="group"><img src={image.image_path} className="image"/></a>
            </label>
        );
    });
    
    return (
        <div className="content">
            <h2 className="title">画像のアップロードと削除（複数選択可）</h2>
            <h3>現在登録されている画像</h3>
            <p>登録を解除する場合はチェックを入れてください。</p>
            { list }
            
            <h3>新たに登録する画像</h3>
            <input type="file" name="image[]" multiple/>
        </div>
    );
}

export default Picture;