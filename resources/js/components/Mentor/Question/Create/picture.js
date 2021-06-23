import React from 'react';
import ReactDOM from 'react-dom';

class Picture extends React.Component{
    constructor(props){
        super(props);
        this.state={
            
        };
    }
    
    render(){
        return (
            <div className="content">
                <h2 className="title">画像のアップロード（複数選択可）</h2>
                <input type="file" name="image[]" multiple/>
            </div>
        );
    }
}

export default Picture;