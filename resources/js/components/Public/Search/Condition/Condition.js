import React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Grid from '@mui/material/Grid';

import Breadcrumbs from '../../../Breadcrumbs';
import Category from './Search/Forms/categoryForm';
import Topic from './Search/Forms/topicForm';
import Addition from './Search/Forms/additionalForms/additionalForms';
import Parameter from './Search/Forms/parameters';
import SearchButton from './Search/searchButton';
import Result from './Result/result';

/**
 * 絞り込み検索のメインコンポーネント
 */
function Condition() {
    const [category, setCategory] = useState(0);
    const [topic, setTopic] = useState('');
    const [curriculum_number, setCurriculumNumber] = useState('');
    const [keyword, setKeyword] = useState('');
    const [isSearchButtonClicked, setIsSearchButtonClicked] = useState(false);
    const categories = ['カリキュラム', '成果物'];
    const topics = [
        // カリキュラムのトピック
        'AWS', 'HTML', 'CSS', 'JavaScript', 'サーバー', 'PHP', 'Laravel', 'データベース', 'Git&GitHub', 'マイグレーション', 'リレーション','認証・認可機能(カリキュラム)','API(カリキュラム)',
        // 成果物のトピック
        '認証・認可機能(成果物)', 'API(成果物)', '画像処理', 'Heroku環境', 'デザイン'
    ];
    const [activeStep, setActiveStep] = useState(0);
    const steps = [
        'カテゴリーを選択する',
        'トピックを選択する', 
        'さらに絞り込む（任意）',
    ];
    const [topicIsCanceling, setTopicIsCanceling] = useState(false);
    const [addtionalFormsIsCanceling, setAdditionalFormsIsCanceling] = useState(false);
    
    // ステッパーを次に進める
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    
    // ステッパーを前に戻す
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        // 一旦検索結果を隠すためにfalseに変更
        setIsSearchButtonClicked(false);
    };
    
    // ステッパーをリセット
    const handleReset = () => {
        setActiveStep(0);
        setCategory(0);
        setTopic('');
        setCurriculumNumber('');
        setKeyword('');
    };
    
    // ステッパーの内容
    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <div>
                        <Category 
                            category={ category }
                            setCategory={ setCategory }
                        />
                        
                        { category !== '' && (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={ () => { handleNext(), setTopicIsCanceling(false) } }
                            >
                                Next
                            </Button>
                        )}
                    </div>
                );
                
            case 1:
                return (
                    <div>
                        <Topic 
                            category={ category }
                            topic={ topic }
                            setTopic={ setTopic }
                            topics={ topics }
                            isCanceling={ topicIsCanceling }
                            setIsCanceling={ setTopicIsCanceling }
                        />
                        
                        <Grid container spacing={2}>
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    onClick={ () => { handleBack(), setTopic(''), setTopicIsCanceling(true) } }
                                    color="secondary"
                                >
                                    Back
                                </Button>
                            </Grid>
                        
                            <Grid item>
                                { topic !== '' && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={ () => { handleNext(), setAdditionalFormsIsCanceling(false) } }
                                    >
                                        Next
                                    </Button>
                                )}
                            </Grid>
                        </Grid>
                    </div>
                );
                
            case 2:
                return (
                    <div>
                        <p>※条件の追加が不要な場合はNextを押してください</p>
                        
                        <Addition 
                            category={ category }
                            topic={ topic }
                            setCurriculumNumber={ setCurriculumNumber }
                            setKeyword={ setKeyword }
                            isCanceling={ addtionalFormsIsCanceling }
                            setIsCanceling={ setAdditionalFormsIsCanceling }
                        />
                        
                        <Grid container spacing={2}>
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    onClick={ () => { handleBack(), setCurriculumNumber(''), setKeyword(''), setAdditionalFormsIsCanceling(true) } }
                                    color="secondary"
                                >
                                    Back
                                </Button>
                            </Grid>
                        
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={ handleNext }
                                >
                                    Next
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                );
                
            default:
                return 'Unknown step';
        }
    };
    
    return (
        <div className="container">
            <Breadcrumbs page="condition"/>
            
            <Box>
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
                
            <Result
                isSearchButtonClicked={ isSearchButtonClicked }
                category={ category }
                topic={ topic }
                categories={ categories }
                topics={ topics }
                curriculum_number={ curriculum_number }
                keyword={ keyword }
            />
            
        </div>
    );
}

export default Condition;
