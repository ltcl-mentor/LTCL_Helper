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

const styleSpan = {
    fontWeight: 'normal',
    color: '#771AF8', 
    marginLeft: '20px',
    fontSize: 18,
};

const PurpleButton = styled(Button)(({ theme }) => ({
    color: 'white',
    fontSize: 18,
    width: '50%',
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
    width: '50%',
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
const Condition = () => {
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
    // const [topicIsCanceling, setTopicIsCanceling] = useState(false);
    // const [addtionalFormsIsCanceling, setAdditionalFormsIsCanceling] = useState(false);
    // const [isCanceling, setIsCanceling] = useState(false);
    
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
    
    // // ステッパーの内容
    // const getStepContent = (step) => {
    //     switch (step) {
    //         case 0:
    //             return (
    //                 <div>
    //                     <Category 
    //                         category={ category }
    //                         setCategory={ setCategory }
    //                     />
                        
    //                     { category !== '' && (
    //                         <Button
    //                             variant="contained"
    //                             color="primary"
    //                             onClick={ () => { handleNext(), setTopicIsCanceling(false) } }
    //                         >
    //                             Next
    //                         </Button>
    //                     )}
    //                 </div>
    //             );
                
    //         case 1:
    //             return (
    //                 <div>
    //                     <Topic 
    //                         category={ category }
    //                         topic={ topic }
    //                         setTopic={ setTopic }
    //                         topics={ topics }
    //                         isCanceling={ topicIsCanceling }
    //                         setIsCanceling={ setTopicIsCanceling }
    //                     />
                        
    //                     <Grid container spacing={2}>
    //                         <Grid item>
    //                             <Button
    //                                 variant="outlined"
    //                                 onClick={ () => { handleBack(), setTopic(''), setTopicIsCanceling(true) } }
    //                                 color="secondary"
    //                             >
    //                                 Back
    //                             </Button>
    //                         </Grid>
                        
    //                         <Grid item>
    //                             { topic !== '' && (
    //                                 <Button
    //                                     variant="contained"
    //                                     color="primary"
    //                                     onClick={ () => { handleNext(), setAdditionalFormsIsCanceling(false) } }
    //                                 >
    //                                     Next
    //                                 </Button>
    //                             )}
    //                         </Grid>
    //                     </Grid>
    //                 </div>
    //             );
                
    //         case 2:
    //             return (
    //                 <div>
    //                     <p>※条件の追加が不要な場合はNextを押してください</p>
                        
    //                     <Addition 
    //                         category={ category }
    //                         topic={ topic }
    //                         setCurriculumNumber={ setCurriculumNumber }
    //                         setKeyword={ setKeyword }
    //                         isCanceling={ addtionalFormsIsCanceling }
    //                         setIsCanceling={ setAdditionalFormsIsCanceling }
    //                     />
                        
    //                     <Grid container spacing={2}>
    //                         <Grid item>
    //                             <Button
    //                                 variant="outlined"
    //                                 onClick={ () => { handleBack(), setCurriculumNumber(''), setKeyword(''), setAdditionalFormsIsCanceling(true) } }
    //                                 color="secondary"
    //                             >
    //                                 Back
    //                             </Button>
    //                         </Grid>
                        
    //                         <Grid item>
    //                             <Button
    //                                 variant="contained"
    //                                 color="primary"
    //                                 onClick={ handleNext }
    //                             >
    //                                 Next
    //                             </Button>
    //                         </Grid>
    //                     </Grid>
    //                 </div>
    //             );
                
    //         default:
    //             return 'Unknown step';
    //     }
    // };
    
    return (
        <div className="condition">
        
            {/* カテゴリー */}
            <Grid container sx={{ justifyContent: 'space-between' }}>
                <Grid item xs={7}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>
                        1. カテゴリー
                        <span style={styleSpan}>どちらか1つを選択してください</span>
                    </Typography>
                </Grid>
                
                {/* 検索リセット */}
                <Grid item xs={3}>
                    <Typography onClick={() => handleCanceling()} sx={{ fontSize: 18, textDecoration: 'underline', cursor: 'pointer', '&:hover': { opacity: 0.7 } }}>
                        検索条件をリセット
                    </Typography>
                </Grid>
            </Grid>
            
            {/* カテゴリー選択欄 */}
            <Stack direction="row" sx={{ width: '40%', m: '15px 0' }}>
                {curriculum}
                {project}
            </Stack>
            
            
            {/* トピック */}
            <Typography sx={{ fontWeight: 'bold', fontSize: 20, mt: 6 }}>
                2. トピック
                <span style={styleSpan}>以下の選択肢から1つを選択してください</span>
            </Typography>
            <Topic 
                category={ category }
                topic={ topic }
                setTopic={ setTopic }
                topics={ topics }
            />
            
            
            {/* カリキュラム番号 */}
            <Typography sx={{ fontWeight: 'bold', fontSize: 20, mt: 4 }}>
                3. カリキュラム番号
                <span style={styleSpan}>※ 任意です</span>
            </Typography>
            <CurriculumNumber 
                category={ category }
                topic={ topic }
                setCurriculumNumber={ setCurriculumNumber }
            />
            
            
            {/* カリキュラム番号 */}
            <Typography sx={{ fontWeight: 'bold', fontSize: 20, mt: 6 }}>
                4. キーワード入力
                <span style={styleSpan}>※ 任意です</span>
            </Typography>
            <Grid container sx={{ justifyContent: 'space-between' }}>
            
                {/* キーワード入力欄 */}
                <Grid item xs={7}>
                    <Keyword
                        setKeyword={ setKeyword }
                        isCanceling={ false }
                    />
                </Grid>
                
                {/* カテゴリー選択欄 */}
                <Grid item xs={3}>
                    {((((topic === 0) || (topic >= 1 && topic <= 13)) && category === 0) || (topic >= 14 && category === 1)) &&
                    <Button 
                        sx={{ 
                            height: '56px', 
                            mt: 1, 
                            ml: 4, 
                            width: '112px', 
                            color: '#771AF8', 
                            border: '2px solid #771AF8',
                            fontWeight: 'bold',
                            fontSize: 20,
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
            
            {/* 検索結果 */}
            {isSearchButtonClicked &&
                <Result
                    // isSearchButtonClicked={ isSearchButtonClicked }
                    category={ category }
                    topic={ topic }
                    categories={ categories }
                    topics={ topics }
                    curriculum_number={ curriculum_number }
                    keyword={ keyword }
                />
            }
            {/*<Box>
                <Card>
                    <Grid container spacing={5} justifyContent="center">
                        <Grid item sx={{ marginTop: 4 }}>
                            <Parameter
                                category={ category }
                                topic={ topic }
                                categories={ categories }
                                topics={ topics }
                                curriculum_number={ curriculum_number }
                                keyword={ keyword }
                            />
                        </Grid>
                        
                        <Grid item sx={{ marginBottom: 4, marginTop: 4 }}>
                            <Box sx={{ width: "400px", maxWidth: "400px" }}>
                                <Stepper activeStep={ activeStep }  orientation="vertical">
                                    { steps.map((step, step_number) => (
                                        <Step key={ step_number }>
                                            <StepLabel>{ step }</StepLabel>
                                            <StepContent>
                                                <Typography>{ getStepContent(step_number) }</Typography>
                                            </StepContent>
                                        </Step>
                                    ))}
                                </Stepper>
                                
                                { activeStep === steps.length && (
                                    <React.Fragment>
                                        <Box sx={{ marginTop: 4 }}>
                                            <Grid container spacing={2}>
                                                <Grid item>
                                                    <Button
                                                        variant="outlined"
                                                        onClick={ handleBack }
                                                        color="secondary"
                                                    >
                                                        Back
                                                    </Button>
                                                </Grid>
                                            
                                                <Grid item>
                                                    <Button
                                                        variant="contained"
                                                        onClick={ handleReset }
                                                        color="primary"
                                                    >
                                                        検索条件をリセット
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <SearchButton
                                            category={ category }
                                            topic={ topic }
                                            curriculum_number={ curriculum_number }
                                            keyword={ keyword }
                                            setIsSearchButtonClicked={ setIsSearchButtonClicked }
                                        />
                                    </React.Fragment>
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                </Card>
            </Box>
           */}
        </div>
    );
};

export default Condition;