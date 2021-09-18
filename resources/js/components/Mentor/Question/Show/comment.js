import React from 'react';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';

function Comment(props) {
    
    return (
        <Card className="QA_card">
            <div className="Avatar-wrap">
                <div className="Avatar-detail-wrap">
                    <div className="Avatar_name">コメント</div>
                </div>
            </div>
            <p className="QA_textblock">{ props.comment }</p>
        </Card>
    );
}

export default Comment;