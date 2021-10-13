import React from 'react';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';

function Question(props) {
    let image;
    if (props.count === 0) {
        image = ('');
    } else {
        image = (
            <div>
                <h2 className="columns">参考画像</h2>
                { props.images.map((image) => {
                    return <a href={ image.image_path } data-lightbox="group"><img src={ image.image_path } className="image"/></a>;
                })}
            </div>
        );
    }
    
    return (
        <Card className="QA_card">
            <div className="Avatar-wrap">
                <Avatar alt="Remy Sharp" src="/images/pose_english_shrug_man.png" className="Avatar_catch"/>
                <div className="Avatar-detail-wrap">
                    <div className="Avatar_name">受講生</div>
                    <span className="Avatar_date" >{ props.updated_at }</span>
                </div>
            </div>
            <p className="QA_textblock">{ props.question }</p>
            { image }
        </Card>
    );
}

export default Question;