import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function Document(props) {
    let documents;
    if (props.documents.filter(v=>v).length === 0) {
        documents = (<div className="empty_message">関連する記事はありません。</div>);
    } else {
        documents = props.documents.map((document) => {
            return (
                <div>
                    <CardActionArea>
                        <a href={ document.link }>
                            <Card className="document">
                                <img className="document_img" src="/images/NotePM_Logo_Vertical.png"/>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2" align="center">
                                        { document.title }
                                    </Typography>
                                </CardContent>
                            </Card>
                        </a>
                    </CardActionArea>
                </div>
            );
        });
    }
    
    return (
        <div className="documents">
            { documents }
        </div>
    );
}

export default Document;