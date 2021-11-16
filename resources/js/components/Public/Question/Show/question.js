import React from 'react';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
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
                    return <a href={ image.image_path } data-lightbox="group"><img src={ image.image_path } className="image"/></a>;
                })}
            </div>
        );
    }
    
    return (
        <Card sx={{ marginBottom: 2 }}>
            <Avatar 
                alt="Student"
                src="/images/pose_english_shrug_man.png"
                sx={{
                    marginTop: 3,
                    marginLeft: 3,
                    float: "left",
                }}
            />

            <Typography
                variant="h7"
                component="span"
                sx={{
                    marginTop: 4,
                    marginLeft: 2,
                    float: "left",
                }}
            >
                受講生　　{ props.updated_at }
            </Typography>
            
            <Typography
                variant="h6"
                component="div"
                sx={{
                    paddingTop: 2,
                    marginLeft: 4,
                    marginBottom: 2,
                    marginRight: 2,
                    clear: "left",
                }}
            >
                { props.question }
            </Typography>
            
            { image }
        </Card>
    );
}

export default Question;