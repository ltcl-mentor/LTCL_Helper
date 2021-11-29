import React from 'react';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

/*
 * コメント表示
 */
function Comment(props) {
    
    return (
        <Card sx={{ marginBottom: 2 }}>
            <Avatar 
                alt="Mentor"
                src="/images/images.jpg"
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
                メンター
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
                { props.comment }
            </Typography>
        </Card>
    );
}

export default Comment;