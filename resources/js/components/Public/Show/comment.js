import React from 'react';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';

function Comment(props) {
    
    return (
        <Card className="QA_card">
            <div className="Avatar-wrap">
                <Avatar alt="Remy Sharp" src="/images/images.jpg" className="Avatar_catch" />
                <div className="Avatar-detail-wrap">
                    <div className="Avatar_name">メンター</div>
                </div>
            </div>
            <p className="QA_textblock">{ props.comment }</p>
        </Card>
    );
}

export default Comment;