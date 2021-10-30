import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import Category from './Search/Forms/categoryForm';
import Topic from './Search/Forms/topicForm';
import Addition from './Search/Forms/additionalForms/additionalForms';
import SearchButton from './Search/searchButton';
import Result from './Result/result';
import Box from '@mui/material/Box';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function Condition() {
    const [category, setCategory] = useState('');
    const [topic, setTopic] = useState('');
    const [curriculum_number, setCurriculumNumber] = useState('');
    const [keyword, setKeyword] = useState('');
    const [isSearchButtonClicked, setIsSearchButtonClicked] = useState(false);
    const categories = ['カリキュラム', '成果物'];
    const topics = ['AWS', 'HTML', 'CSS', 'JavaScript', 'サーバー', 'PHP', 'Laravel', 'DB', 'Git&GitHub', '環境構築', '設計図', 'デプロイ', 'API'];
    const [activeStep, setActiveStep] = useState(0);
    const steps = [
        `カテゴリーを選択する  ${ activeStep >= 1 ? ` ___${categories[category]}` : '' }`,
        `トピックを選択する  ${ activeStep >= 2 ? ` ___${topics[topic]}` : '' }`, 
        `さらに絞り込む  ${ activeStep >= 3 ? (curriculum_number !== '' ? ` ___カリキュラム番号：${curriculum_number}` : ' ___カリキュラム番号：なし') : '' } ${ activeStep >= 3 ? (keyword !== '' ? `, キーワード：${keyword}` : ', キーワード：なし') : '' }`,
    ];
    
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
                            setTopic={ setTopic }
                            topics={ topics }
                        />
                        <Button
                            onClick={ handleBack }
                            color="secondary"
                        >
                            Back
                        </Button>
                        { topic !== '' && (
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
            case 2:
                return (
                    <div>
                        <div>※条件の追加が不要な場合はNextを押してください</div>
                        <Addition 
                            category={ category }
                            topic={ topic }
                            setCurriculumNumber={ setCurriculumNumber }
                            setKeyword={ setKeyword }
                        />
                        <Button
                            onClick={ handleBack }
                            color="secondary"
                        >
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={ handleNext }
                        >
                            Next
                        </Button>
                    </div>
                );
            default:
                return 'Unknown step';
        }
    };

    return (
        <div className="container">
            <div className="form_box">
                <Box
                    sx={{ 
                        maxWidth: "80%",
                        marginLeft: "10%",
                        paddingBottom: "5%"
                    }}
                >
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
                        <Box>
                            <Button
                                onClick={ handleBack }
                                color="secondary"
                            >
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                onClick={ handleReset }
                                color="primary"
                            >
                                Reset
                            </Button>
                        </Box>
                    )}
                </Box>
                { activeStep === steps.length && (
                    <SearchButton
                        category={ category }
                        topic={ topic }
                        curriculum_number={ curriculum_number }
                        keyword={ keyword }
                        setIsSearchButtonClicked={ setIsSearchButtonClicked }
                    />
                )}
            </div>

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

if (document.getElementById('search')) {
    ReactDOM.render(<Condition />, document.getElementById('search'));
}
