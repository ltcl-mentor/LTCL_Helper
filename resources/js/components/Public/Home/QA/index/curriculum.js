import React from 'react';

import Card from '@mui/material/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@mui/material/Grid';
import { CardActionArea } from '@mui/material';


/**
 * カリキュラム一覧
 */
const curriculum = (props) => {
    let width;
    if (props.screenWidth >= 890) {
        width = { width: '20%' };
    } else if (props.screenWidth >= 710) {
        width = { width: '25%' };
    } else if (props.screenWidth >= 540) {
        width = { width: '33%' };
    } else {
        width = { width: '50%' };
    }
    
    return (
        <Grid container>
            {props.curriculum.map((topic, index) => {
                let heading;
                let marginTop;
                if (index == 9) { // マイグレーションの時だけ小さくする
                    heading = "h7";
                    marginTop = { mt: '7px' };
                } else {
                    heading = "h6";
                }
                
                return(
                    <Grid item sx={width} key={topic.topic}>
                        <Card sx={props.styleCard}>
                            <CardActionArea onClick={() => props.toTopic(topic.topic)} sx={props.styleCardActionArea}>
                                <Typography align="center" gutterBottom variant={heading} component="div" sx={marginTop}>
                                    {props.topics[index]}
                                </Typography>
                                <div style={props.styleDiv}>
                                    <Typography component="div" align="center" variant="h7">
                                        質問 {topic.questions}件
                                    </Typography>
                                    <Typography component="div" align="center" variant="h7">
                                        記事 {topic.documents}件
                                    </Typography>
                                </div>
                            </CardActionArea>
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default curriculum;