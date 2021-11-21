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

function Condition() {
    const [category, setCategory] = useState('');
    const [topic, setTopic] = useState('');
    const [curriculum_number, setCurriculumNumber] = useState('');
    const [keyword, setKeyword] = useState('');
    const [isSearchButtonClicked, setIsSearchButtonClicked] = useState(false);
    const categories = ['カリキュラム', '成果物'];
    const topics = [
        // カリキュラムのトピック
        'AWS', 'HTML', 'CSS', 'JavaScript', 'サーバー', 'PHP', 'Laravel', 'データベース', 'Git&GitHub',
        // 成果物のトピック
        'マイグレーション', 'リレーション', 'Laravel拡張', '画像処理', 'Heroku環境', 'API', 'デザイン'
    ];
    const [activeStep, setActiveStep] = useState(0);
    const steps = [
        "カテゴリーを選択する",
        "トピックを選択する", 
        "さらに絞り込む（任意）",
    ];
    const [topicIsCanceling, setTopicIsCanceling] = useState(false);
    const [addtionalFormsIsCanceling, setAdditionalFormsIsCanceling] = useState(false);
    
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setIsSearchButtonClicked(false);
    };
    
    const handleReset = () => {
        setActiveStep(0);
    };
    
    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <div>
                        <Category 
                            setCategory={ setCategory }
                        />
                        
                        { category !== '' && (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={ handleNext }
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
                                        onClick={ handleNext }
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
                                    { steps.map((label, index) => (
                                        <Step key={ label }>
                                            <StepLabel>{ label }</StepLabel>
                                            <StepContent>
                                                <Typography>{ getStepContent(index) }</Typography>
                                            </StepContent>
                                        </Step>
                                    ))}
                                </Stepper>
                                
                                { activeStep === steps.length && (
                                    <Box sx={{ marginTop: 4 }}>
                                        <Grid container spacing={2}>
                                            <Grid item>
                                                <Button
                                                    variant="outlined"
                                                    onClick={ handleBack }
                                                    color="secondary"
                                                >
                                                    戻る
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
                                )}
                                
                                { activeStep === steps.length && (
                                    <SearchButton
                                        category={ category }
                                        topic={ topic }
                                        curriculum_number={ curriculum_number }
                                        keyword={ keyword }
                                        setIsSearchButtonClicked={ setIsSearchButtonClicked }
                                    />
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
