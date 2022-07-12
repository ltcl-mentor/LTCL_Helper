import React from 'react';

import Card from '@mui/material/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@mui/material/Grid';
import { CardActionArea } from '@mui/material';

// 各パーツのスタイル設定
const styleGrid = { justifyContent: 'center' };


/**
 * 成果物
 */
const portfolio = (props) => {
    let width = { width: '33%' };
    if (props.screenWidth < 540) {
        width = { width: '50%' };
    }

    return (
        <Grid container sx={styleGrid}>
            {props.project.map((topic, index) => {
                return(
                    <Grid item sx={width} key={topic.topic}>
                        <Card sx={props.styleCard}>
                            <CardActionArea onClick={() => props.toTopic(topic.topic)} sx={props.styleCardActionArea}>
                                <Typography align="center" gutterBottom variant="h6" component="div">
                                    {props.topics[index+14]}
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

export default portfolio;
