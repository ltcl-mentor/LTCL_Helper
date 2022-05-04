import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import useMedia from 'use-media';
import BreakingPoint from '../../../BreakingPoint';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link } from "react-router-dom";

import Curriculum from './index/curriculum';
import Portfolio from './index/portfolio';
import Freeword from './search/freeword/freeword';
import Condition from './search/condition/condition';
import PurpleButton from '../../../Atom/Button/PurpleButton';
import { LoginUser } from '../../../Route';

// 各パーツのスタイル設定
const GrayButton = styled(Button)(({ theme }) => ({
    color: '#ADA9A9',
    fontSize: 18,
    fontWeight: 'bold',
    width: '50%',
    height: 60,
    boxShadow: 'none',
    backgroundColor: '#ECE9E9',
    lineHeight: '100%',
    '&:hover': {
        backgroundColor: '#DDDDDD',
        boxShadow: 'none',
    },
}));
const styleButtonHeight = {
    height: 60,
    lineHeight: '100%',
    borderRadius: 0
};
const styleDiv = {
    marginTop: 2,
    marginBottom: 2
};
const styleCard = {
    width: '160px',
    height: '90%',
    m: "auto",
    p: 0,
    position: "relative",
    cursor: "pointer",
    "&:before": {
        content: '""',
        pt: "100%",
        display: "block"
    }
};
const styleCardActionArea = {
    position: "absolute",
    top: 0,
    left: 0,
    p: "10px",
    m: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
};
const styleQuestionResolve = {
    marginTop: 3,
    fontWeight: 'bold',
    display: 'block'
};
const styleQuestions = {
    width: '80%',
    m: '16px auto 0',
    p: 0
};
const styleContent = {
    width: '90%',
    margin: '32px auto 0'
};
const styleHeading = {
    color: '#771AF8',
    fontWeight: 'bold',
    fontSize: 24
};
const styleCards = {
    width: '100%',
    mt: 1.5
};
const styleBox = {
    borderBottom: 1,
    borderColor: 'white',
    mb: 3
};
const styleTab = {
    fontSize: 20,
    fontWeight: 'bold'
};

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
    const isWide = useMedia({ minWidth: `${BreakingPoint}px` });
    const [achievement, setAchievment] = useState(0);
    const [searchValue, setSearchValue] = useState(0);
    const [indexValue, setIndexValue] = useState(0);
    const [curriculum, setCurriculum] = useState([]);
    const [project, setProject] = useState([]);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
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
    const toTopic = useCallback(topic_number => {
        history.push(`/topic/${topic_number}`);
    });
    
    // windowの幅が変化した際に随時取得
    window.addEventListener('resize', function() {
        setScreenWidth(window.innerWidth);
    });
    
    // PC版の時にはボタンの文字サイズを大きくする
    let styleButton;
    if (isWide) {
        styleButton = [styleButtonHeight, { fontSize: 24 }];
    } else {
        styleButton = styleButtonHeight;
    }

    // 検索ボタン
    let freewordButton;
    let conditionButton;
    let search;
    if (searchValue == 0) {
        freewordButton = <PurpleButton onClick={() => setSearchValue(0)} variant="contained" sx={styleButton}>フリーワード検索</PurpleButton>;
        conditionButton = <GrayButton onClick={() => setSearchValue(1)} variant="contained" sx={styleButton}>絞り込み検索</GrayButton>;
        search = <Freeword isWide={isWide} />;
    } else {
        freewordButton = <GrayButton onClick={() => setSearchValue(0)} variant="contained" sx={styleButton}>フリーワード検索</GrayButton>;
        conditionButton = <PurpleButton onClick={() => setSearchValue(1)} variant="contained" sx={styleButton}>絞り込み検索</PurpleButton>;
        search = <Condition isWide={isWide} />;
    }

    let component;
    if (indexValue == 0) {
        component = (
            <Curriculum
                curriculum={curriculum}
                screenWidth={screenWidth}
                topics={topics}
                toTopic={toTopic}
                styleDiv={styleDiv}
                styleCard={styleCard}
                styleCardActionArea={styleCardActionArea}
            />
        );
    } else {
        component = (
            <Portfolio
                project={project}
                screenWidth={screenWidth}
                topics={topics}
                toTopic={toTopic}
                styleDiv={styleDiv}
                styleCard={styleCard}
                styleCardActionArea={styleCardActionArea}
            />
        );
    }
    
    // 質問解決率（メンターのみ）
    let admin;
    if (user.is_admin == 'staff') {
        admin = (
            <Box textAlign="center">
                <Typography
                    variant="h5"
                    component={Link}
                    to="/questions/mentor"
                    align="center"
                    sx={styleQuestionResolve}
                >
                    現在の質問解決率：<font color="purple" >{achievement}</font>%
                </Typography>
            </Box>
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
            {admin}

            {/* 検索部分 */}
            <Card variant="outlined" sx={styleQuestions}>

                {/* 検索タブ */}
                <Stack direction="row">
                    {freewordButton}
                    {conditionButton}
                </Stack>

                {/* 検索内容 */}
                {search}
            </Card>

            {/* 質問・記事一覧 */}
            <div style={styleContent}>
                <Typography component="div" sx={styleHeading}>
                    質問・記事一覧
                </Typography>
                <Box sx={styleCards}>
                    <Box sx={styleBox}>
                        <Tabs
                            value={indexValue}
                            onChange={handleChange}
                            textColor="secondary"
                            indicatorColor="secondary"
                        >
                            <Tab label="カリキュラム" {...a11yProps(0)} sx={styleTab} />
                            <Tab label="成果物" {...a11yProps(1)} sx={styleTab} />
                        </Tabs>
                    </Box>
                    {component}
                </Box>
            </div>
        </React.Fragment>
    );
};

export default QA;