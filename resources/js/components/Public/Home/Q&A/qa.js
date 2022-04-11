import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { CardActionArea } from '@mui/material';

import Freeword from './search/freeword/freeword';
import Condition from './search/condition/condition';
import { LoginUser } from '../../../Route';

const PurpleButton = styled(Button)(({ theme }) => ({
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    width: '50%', 
    height: 60,
    boxShadow: 'none',
    backgroundColor: '#771AF8',
    borderRadius: '0',
    '&:hover': {
        backgroundColor: '#6633CC',
        boxShadow: 'none',
        color: 'white',
    },
}));

const GrayButton = styled(Button)(({ theme }) => ({
    color: '#ADA9A9',
    fontSize: 24,
    fontWeight: 'bold',
    width: '50%', 
    height: 60,
    boxShadow: 'none',
    backgroundColor: '#ECE9E9',
    borderRadius: '0',
    '&:hover': {
        backgroundColor: '#DDDDDD',
        boxShadow: 'none',
    },
}));

const a11yProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};


/**
 * Q&A画面
 */
const QA = (props) => {
    const history = useHistory();
    const user = useContext(LoginUser);
    const [achievement, setAchievment] = useState(0);
    const [searchValue, setSearchValue] = useState(0);
    const [indexValue, setIndexValue] = useState(0);
    const [curriculum, setCurriculum] = useState([]);
    const [project, setProject] = useState([]);
    const topics = [
        // カリキュラムのトピック
        'AWS', 'HTML', 'CSS', 'JavaScript', 'サーバー', 'PHP', 'Laravel', 'データベース', 'Git&GitHub', 'マイグレーション', 'リレーション', '認証機能', 'API', 'その他',
        // 成果物のトピック
        '認証機能', 'API', '画像処理', 'Heroku環境', 'デザイン', 'その他'
    ];
    
    // タブ切り替え用
    const handleChange = (event, newValue) => {
        setIndexValue(newValue);
    };
    
    // 個別質問ページ
    const toTopic = (topic_number) => {
        history.push(`/topic/${topic_number}`);
    };
    
    let freewordButton;
    let conditionButton;
    let search;
    if (searchValue == 0) {
        freewordButton = <PurpleButton onClick={() => setSearchValue(0)} variant="contained">フリーワード検索</PurpleButton>;
        conditionButton = <GrayButton onClick={() => setSearchValue(1)} variant="contained">絞り込み検索</GrayButton>;
        search = <Freeword />;
    } else {
        freewordButton = <GrayButton onClick={() => setSearchValue(0)} variant="contained">フリーワード検索</GrayButton>;
        conditionButton = <PurpleButton onClick={() => setSearchValue(1)} variant="contained">絞り込み検索</PurpleButton>;
        search = <Condition />;
    }
    
    let component;
    if (indexValue == 0) {
        component = (
            <Grid container>
                {curriculum.map((topic, index) => {
                    return(
                        <Grid item xs={2.4} sx={{ height: '150px' }} key={topic.topic}>
                            <Card sx={{ width: '160px', height: '90%', m: 'auto', cursor: 'pointer', p: 0 }}>
                                <CardActionArea onClick={() => toTopic(topic.topic)} sx={{ height: '100%' }}>
                                    <Typography align="center" gutterBottom variant={index == 9 ? "h7" : "h6"} component="div" sx={{ mt: index==9 && '7px' }}>
                                        {topics[index]}
                                    </Typography>
                                    <Typography component="div" align="center" variant="h7" sx={{ mt: 2 }}>
                                        質問 {topic.questions}件
                                    </Typography>
                                    <Typography component="div" align="center" variant="h7" sx={{ mb: 2 }}>
                                        記事 {topic.documents}件
                                    </Typography>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        );
    } else {
        component = (
            <Grid container sx={{ justifyContent: 'center' }}>
                {project.map((topic, index) => {
                    return(
                        <Grid item xs={(index == 1 || index == 4) ? 2.8 : 4} sx={{ height: '150px'}} key={topic.topic}>
                            <Card className={`card-${index}`} sx={{ width: '160px', height: '90%', cursor: 'pointer', p: 0 }}>
                                <CardActionArea onClick={() => toTopic(topic.topic)} sx={{ height: '100%' }}>
                                    <Typography align="center" gutterBottom variant="h6" component="div">
                                        {topics[index+14]}
                                    </Typography>
                                    <Typography component="div" align="center" variant="h7" sx={{ mt: 2 }}>
                                        質問 {topic.questions}件
                                    </Typography>
                                    <Typography component="div" align="center" variant="h7" sx={{ mb: 2 }}>
                                        記事 {topic.documents}件
                                    </Typography>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        );
    }
    
    useEffect(() => {
        axios
            .get("/react/index")
            .then(response => {
                setCurriculum(response.data.curriculum);
                setProject(response.data.project);
                setAchievment(response.data.achievement);
            }).catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <React.Fragment>
            {user.is_admin == 'staff' &&
                <Typography 
                    variant="h5"
                    component="div"
                    align="center"
                    sx={{
                        paddingTop: 3,
                        fontWeight: 'bold',
                    }}
                >
                    現在の質問解決率：<font color="purple">{ achievement }</font>%
                </Typography>
            }

            {/* 検索部分 */}
            <Card variant="outlined" sx={{ width: '70%', m: '16px auto 0', p: 0 }}>
        
                {/* 検索タブ */}
                <Stack direction="row">
                    {freewordButton}
                    {conditionButton}
                </Stack>
            
                {/* 検索内容 */}
                {search}
            </Card>
            
            {/* 質問・記事一覧 */}
            <div className="index">
                <Typography component="div" sx={{ color: '#771AF8', fontWeight: 'bold', fontSize: 24 }}>
                    質問・記事一覧
                </Typography>
                <Box sx={{ width: '100%', mt: 1.5 }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'white', mb: 3 }}>
                        <Tabs
                            value={indexValue}
                            onChange={handleChange}
                            textColor="secondary"
                            indicatorColor="secondary"
                        >
                            <Tab label="カリキュラム" {...a11yProps(0)} sx={{ fontSize: 20, fontWeight: 'bold' }} />
                            <Tab label="成果物" {...a11yProps(1)} sx={{ fontSize: 20, fontWeight: 'bold' }} />
                        </Tabs>
                    </Box>
                    {component}
                </Box>
            </div>
        </React.Fragment>
    );
};

export default QA;