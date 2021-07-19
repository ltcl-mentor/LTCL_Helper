import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import Category from './categoryForm';
import Topic from './topicForm';
import Addition from './additionalForms';
import SearchButton from './searchButton';
import Result from './result';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
}));

function Search() {
    const [category, setCategory] = useState('');
    const [topic, setTopic] = useState('');
    const [curriculum_number, setCurriculumnumber] = useState('');
    const [keyword, setKeyword] = useState('');
    const [isSearchButtonClicked, setIsSearchButtonClicked] = useState(false);
    const categories = ['カリキュラム', '成果物'];
    const topics = ['AWS', 'HTML', 'CSS', 'JavaScript', 'サーバー', 'PHP', 'Laravel', 'DB', 'Git&GitHub', '環境構築', '設計図', 'デプロイ', 'API'];
    const classes = useStyles();
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
                            categories={ categories }
                        />
                        { category !== '' && (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={ handleNext }
                                className={ classes.button }
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
                            className={ classes.button }
                        >
                            Back
                        </Button>
                        { topic !== '' && (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={ handleNext }
                                className={ classes.button }
                            >
                                Next
                            </Button>
                        )}
                    </div>
                );
            case 2:
                return (
                    <div>
                        <div>※条件の追加が不要な場合はSKIPを押してください</div>
                        <Addition 
                            category={ category }
                            topic={ topic }
                            setCurriculumnumber={ setCurriculumnumber }
                            setKeyword={ setKeyword }
                        />
                        <Button
                            onClick={ handleBack }
                            className={ classes.button }
                        >
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={ handleNext }
                            className={ classes.button }
                        >
                            Skip
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
                <div className={ classes.root }>
                    <Stepper activeStep={ activeStep }  orientation="vertical">
                        { steps.map((label, index) => (
                            <Step key={ label }>
                                <StepLabel>{ label }</StepLabel>
                                <StepContent>
                                    <Typography>{ getStepContent(index) }</Typography>
                                    <div className={ classes.actionsContainer }>
                                    </div>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                    
                    { activeStep === steps.length && (
                        <Paper square elevation={ 0 } className={ classes.resetContainer }>
                            <Button
                                onClick={ handleBack }
                                className={ classes.button }
                            >
                                Back
                            </Button>
                            <Button onClick={ handleReset } className={ classes.button }>
                                Reset
                            </Button>
                            <SearchButton
                                category={ category }
                                topic={ topic }
                                curriculum_number={ curriculum_number }
                                keyword={ keyword }
                                setIsSearchButtonClicked={ setIsSearchButtonClicked }
                            />
                        </Paper>
                    )}
                </div>
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

export default Search;

if (document.getElementById('search')) {
    ReactDOM.render(<Search />, document.getElementById('search'));
}
