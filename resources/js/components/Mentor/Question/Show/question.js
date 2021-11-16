import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

function Question(props) {
    let image;
    if (props.count === 0) {
        image = ('');
    } else {
        image = (
            <div>
                <h2 className="columns">参考画像</h2>
                { props.images.map((image) => {
                    return <a href={image.image_path} data-lightbox="group"><img src={image.image_path} className="image"/></a>;
                })}
            </div>
        );
    }
    
    return (
        <Card sx={{ marginBottom: 2 }}>
            <Typography variant="h5" component="div" sx={{ marginTop: 3, marginLeft: 2}} >
                質問
            </Typography>
            
            <Typography variant="h6" component="div" sx={{ marginTop: 1, marginLeft: 3, marginBottom: 1, marginRight: 2}} >
                { props.question }
            </Typography>
            
            { image }
        </Card>
    );
}

export default Question;