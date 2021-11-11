import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

function Comment(props) {
    
    return (
        <Card>
            <Typography variant="h5" component="div" sx={{ marginTop: 3, marginLeft: 2}} >
                コメント
            </Typography>
            
            <Typography variant="h6" component="div" sx={{ margin: 1, marginLeft: 3, marginBottom: 1}} >
                { props.comment }
            </Typography>
        </Card>
    );
}

export default Comment;