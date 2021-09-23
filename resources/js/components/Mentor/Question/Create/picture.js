import React from 'react';

function Picture(props) {
    
    return (
        <div className="content">
            <h2 className="title">画像のアップロード（複数選択可）</h2>
            <input type="file" name="image[]" multiple/>
        </div>
    );
}

export default Picture;