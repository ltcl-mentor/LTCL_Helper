import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@mui/material/Chip';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

/*
 * 関連記事の一覧
 */
function Document(props) {
    let documents;
    // 関連質問がなかった場合
    if (props.documents.filter(v=>v).length === 0) {
        documents = (<div className="empty_message">関連する記事はありません。</div>);
        
    // 関連質問があった場合
    } else {
        documents = props.documents.map((document) => {
            return (
                <Grid item >
                    <CardActionArea sx={{ width: "300px", height: "280px"}}>
                        <a href={ document.link } target="_blank">
                            <Card sx={{ width: "300px", height: "280px"}}>
                                <CardMedia
                                    component="img"
                                    height="100"
                                    image="/images/NotePM_Logo_Vertical.png"
                                />
                                <CardContent>
                                    { document.beginner ? <Chip variant="outlined" color="success" label="初心者向け" /> : "" }
                                    { document.amature ? <Chip variant="outlined" color="primary" label="中級者向け" /> : "" }
                                    { document.master ? <Chip variant="outlined" color="secondary" label="上級者向け" /> : "" }
                                    { document.all ? <Chip variant="outlined" color="error" label="全員向け" /> : "" }
                                    <Typography gutterBottom variant="h6" component="div" align="center">
                                        { document.title }
                                    </Typography>
                                </CardContent>
                            </Card>
                        </a>
                    </CardActionArea>
                </Grid>
            );
        });
    }
    
    return (
        <Box sx={{marginTop:2, marginBottom: 3}}>
            <Grid container spacing={2} sx={{ flexGrow: 1 }} justifyContent="center" >
                { documents }
            </Grid>
        </Box>
    );
}

export default Document;