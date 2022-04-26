import React, { useState, useEffect, useCallback } from 'react';

import { styled } from '@mui/material/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import Topic from './form/topicForm';
import CurriculumNumber from './form/curriculum-number';
import Keyword from './form/keyword';
import Result from './result/result';

const PurpleButton = styled(Button)(({ theme }) => ({
    color: 'white',
    fontSize: 18,
    width: '135px',
    boxShadow: 'none',
    backgroundColor: '#771AF8',
    border: '1px solid black',
    fontWeight: 'bold',
    '&:hover': {
        backgroundColor: '#6633CC',
        boxShadow: 'none',
        color: 'white',
    },
}));

const WhiteButton = styled(Button)(({ theme }) => ({
    color: 'black',
    fontSize: 18,
    width: '135px',
    boxShadow: 'none',
    backgroundColor: 'white',
    border: '1px solid black',
    '&:hover': {
        backgroundColor: '#EEEEEE',
        boxShadow: 'none',
        color: 'black'
    },
}));


/**
 * 絞り込み検索
 */
const Condition = (props) => {
    const [category, setCategory] = useState(0);
    const [topic, setTopic] = useState(0);
    const [curriculum_number, setCurriculumNumber] = useState('');
    const [keyword, setKeyword] = useState('');
    const [isSearchButtonClicked, setIsSearchButtonClicked] = useState(false);
    const categories = ['カリキュラム', '成果物'];
    const topics = [
        // カリキュラムのトピック
        'AWS', 'HTML', 'CSS', 'JavaScript', 'サーバー', 'PHP', 'Laravel', 'データベース', 'Git&GitHub', 'マイグレーション', 'リレーション', '認証・認可機能(カリキュラム)', 'API(カリキュラム)', 'その他(カリキュラム)',
        // 成果物のトピック
        '認証・認可機能(成果物)', 'API(成果物)', '画像処理', 'Heroku環境', 'デザイン', 'その他(成果物)'
    ];
    
    let curriculum;
    let project;
    if (category == 0) {
        curriculum = <PurpleButton onClick={() => setCategory(0)}>カリキュラム</PurpleButton>;
        project = <WhiteButton onClick={() => setCategory(1)}>成果物</WhiteButton>;
    } else {
        curriculum = <WhiteButton onClick={() => setCategory(0)}>カリキュラム</WhiteButton>;
        project = <PurpleButton onClick={() => setCategory(1)}>成果物</PurpleButton>;
    }
    
    // 検索リセット
    const handleCanceling = useCallback(() => {
        setCategory(0);
        setTopic(0);
        setCurriculumNumber('');
        setKeyword('');
    });
    
    useEffect(() => {
        setIsSearchButtonClicked(false);
    }, [category, topic, curriculum_number, keyword]);
    
    let categoryPart;
    let keywordPart;
    if (props.isWide) {
        categoryPart = (
            <React.Fragment>
                <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>
                    1. カテゴリー
                    <Typography sx={{ fontWeight: 'normal', color: '#771AF8', marginLeft: '20px', fontSize: 18 }} component="span">どちらか1つを選択してください</Typography>
                </Typography>
                <Typography align="right" onClick={() => handleCanceling()} sx={{ fontSize: 18, textDecoration: 'underline', cursor: 'pointer', '&:hover': { opacity: 0.7 } }}>
                    検索条件をリセット
                </Typography>
            </React.Fragment>
        );
        
        keywordPart = (
            <Grid container sx={{ justifyContent: 'space-between' }}>
            
                {/* キーワード入力欄 */}
                <Grid item sx={{ width: '70%' }}>
                    <Keyword
                        setKeyword={ setKeyword }
                        isCanceling={ false }
                    />
                </Grid>
                
                {/* カテゴリー選択欄 */}
                <Grid item sx={{ width: '30%' }}>
                    {((((topic === 0) || (topic >= 1 && topic <= 13)) && category === 0) || (topic >= 14 && category === 1)) &&
                    <Button 
                        sx={{ 
                            height: '56px', 
                            mt: 1, 
                            ml: 'auto', 
                            width: '112px', 
                            color: '#771AF8', 
                            border: '2px solid #771AF8',
                            fontWeight: 'bold',
                            fontSize: 20,
                            display: 'block',
                            '&:hover': { 
                                backgroundColor: '#771AF8',
                                color: 'white',
                                border: '2px solid #771AF8', 
                            }
                        }} 
                        onClick={() => setIsSearchButtonClicked(true)} 
                        variant="outlined"
                        disabled={isSearchButtonClicked}
                    >
                        検索
                    </Button>
                    }
                </Grid>
            </Grid>    
        );
    } else {
        categoryPart = (
            <React.Fragment>
                <Typography align="right" onClick={() => handleCanceling()} sx={{ fontSize: 18, textDecoration: 'underline', cursor: 'pointer', '&:hover': { opacity: 0.7 } }}>
                    検索条件をリセット
                </Typography>
                <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>
                    1. カテゴリー
                </Typography>
                <Typography sx={{ fontWeight: 'normal', color: '#771AF8', fontSize: 16 }} component="div">どちらか1つを選択してください</Typography>
            </React.Fragment>
        );
        
        keywordPart = (
            <React.Fragment>
                <Keyword
                    setKeyword={ setKeyword }
                    isCanceling={ false }
                />
                
                {((((topic === 0) || (topic >= 1 && topic <= 13)) && category === 0) || (topic >= 14 && category === 1)) &&
                <Button 
                    sx={{
                        ml: 'auto',
                        mb: '25px',
                        width: '100px', 
                        color: '#771AF8', 
                        border: '2px solid #771AF8',
                        fontWeight: 'bold',
                        fontSize: 20,
                        display: 'block',
                        '&:hover': { 
                            backgroundColor: '#771AF8',
                            color: 'white',
                            border: '2px solid #771AF8', 
                        }
                    }} 
                    onClick={() => setIsSearchButtonClicked(true)} 
                    variant="outlined"
                    disabled={isSearchButtonClicked}
                >
                    検索
                </Button>
                }
            </React.Fragment>
        );
    }
    
    return (
        <div style={{ margin: props.isWide ? '25px 30px 10px' : '13px 15px 5px' }}>
        
            {/* カテゴリー選択欄 */}
            {categoryPart}
            <Stack direction="row" sx={{ width: '100%', m: 0 }}>
                {curriculum}
                {project}
            </Stack>
            
            
            {/* トピック */}
            <Typography sx={{ fontWeight: 'bold', fontSize: 20, mt: 6 }}>
                2. トピック
                {props.isWide && <Typography sx={{ fontWeight: 'normal', color: '#771AF8', marginLeft: '20px', fontSize: 18 }} component="span">以下から1つを選択してください</Typography>}
            </Typography>
            {!props.isWide && <Typography sx={{ fontWeight: 'normal', color: '#771AF8', fontSize: 16 }} component="span">以下から1つを選択してください</Typography>}
            <Topic 
                category={ category }
                topic={ topic }
                setTopic={ setTopic }
                topics={ topics }
            />
            
            
            {/* カリキュラム番号 */}
            <Typography sx={{ fontWeight: 'bold', fontSize: 20, mt: 4 }}>
                3. カリキュラム番号
                {props.isWide && <Typography sx={{ fontWeight: 'normal', color: '#771AF8', marginLeft: '20px', fontSize: 18 }} component="span">※ 任意です</Typography>}
            </Typography>
            {!props.isWide && <Typography sx={{ fontWeight: 'normal', color: '#771AF8', fontSize: 16 }} component="span">※ 任意です</Typography>}
            <CurriculumNumber 
                category={ category }
                topic={ topic }
                setCurriculumNumber={ setCurriculumNumber }
            />
            
            
            {/* カリキュラム番号 */}
            <Typography sx={{ fontWeight: 'bold', fontSize: 20, mt: 6 }}>
                4. キーワード入力
                {props.isWide && <Typography sx={{ fontWeight: 'normal', color: '#771AF8', marginLeft: '20px', fontSize: 18 }} component="span">※ 任意です</Typography>}
            </Typography>
            {!props.isWide && <Typography sx={{ fontWeight: 'normal', color: '#771AF8', fontSize: 16 }} component="span">※ 任意です</Typography>}
            
            {keywordPart}
            
            {/* 検索結果 */}
            {isSearchButtonClicked &&
                <Result
                    category={ category }
                    topic={ topic }
                    categories={ categories }
                    topics={ topics }
                    curriculum_number={ curriculum_number }
                    keyword={ keyword }
                />
            }
        </div>
    );
};

export default Condition;