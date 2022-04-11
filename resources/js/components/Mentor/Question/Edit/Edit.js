import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import SaveIcon from "@material-ui/icons/Save";
import Typography from "@material-ui/core/Typography";
import Box from "@mui/material/Box";
import Card from "@material-ui/core/Card";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import Breadcrumbs from "../../../Breadcrumbs";
import Category from "./categoryForm";
import TopicForm from "./topicForm";
import CurriculumNumber from "./Curriculum-number/curriculum-number";
import QuestionForm from "../../../Public/Question/Create/Create/question-form/questionForm";
import Confirm from "../../../Public/Question/Create/Create/confirm";
import SelectForm from "./selectForm";

/**
 * 質問編集のメインコンポーネント
 */
const Edit = () => {
    const [screen_width, setScreenWidth] = useState(window.innerWidth);

    return (
        <React.Fragment>
            <Box
                sx={{
                    width: screen_width >= 800 ? "90%" : "96%",
                    marginLeft: screen_width >= 800 ? "5%" : "2%",
                    marginRight: screen_width >= 800 ? "5%" : "2%"
                }}
            >
                <SelectForm />
            </Box>
        </React.Fragment>
    );
};

// function Edit() {
//     const { id } = useParams();
//     const history = useHistory();
//     const [screen_width, setScreenWidth] = useState(window.innerWidth);
//     const [clickCount, setClickCount] = useState(0);
//     const [images, setImages] = useState([]);
//     const steps = ['基本情報の入力', '質問の入力', '確認'];
//     const [activeStep, setActiveStep] = useState(0);
//     const [old_data, setOldData] = useState([]);
//     const [category, setCategory] = useState(0);
//     const [topic, setTopic] = useState(0);
//     const [curriculum_number, setCurriculumNumber] = useState('');
//     const [curriculum_number_validation_error, setCurriculumNumberValidationError] = useState(0);
//     const [title, setTitle] = useState('');
//     const [remarks, setRemarks] = useState('');
//     const [question, setQuestion] = useState('');
//     const [question_validation_error, setQuestionValidationError] = useState(0);
//     const curriculum_numbers = [
//         [
//             ['1-1-1'],
//             ['2-1-1'],
//             ['2-1-2'],
//             ['2-1-3'],
//             ['3-1-1'],
//             ['4-1-1', '4-1-2', '4-1-3', '4-1-4'],
//             ['5-1-1', '8-1-1', '8-2-1', '8-3-1', '8-4-1', '8-5-1', '8-6-1'],
//             ['6-1-1', '6-2-1'],
//             ['7-1-1'],
//             ['9-1-1'],
//             ['9-2-1'],
//             ['9-3-1'],
//             ['9-4-1'],
//             ['その他'],
//         ],
//         [
//             ['成果物'],
//             ['その他']
//         ]
//     ];

//     // 画面幅を随時取得
//     window.addEventListener('resize', function() {
//         setScreenWidth(window.innerWidth);
//     });

//     // 画面描画時に実行
//     useEffect(() => {
//         // 該当質問取得
//         axios
//             .get(`/react/question/${ id }`)
//             .then(response => {
//                 setOldData(response.data);
//                 setCategory(response.data.category);
//                 setTopic(response.data.topic);
//                 setCurriculumNumber(response.data.curriculum_number);
//                 setTitle(response.data.title);
//                 setRemarks(response.data.remarks);
//                 setQuestion(response.data.question);
//             }).catch(error => {
//                 console.log(error);
//             });
//     }, []);

//     let load_count;
//     // カリキュラム番号の初期値が変更されたcategory、topicと対応していなくても
//     // 更新ができてしまうのでその対策
//     useEffect(() => {
//         if (load_count > 0) {
//             setCurriculumNumber('');
//         }
//         load_count += 1;
//     }, [category, topic]);

//     // ステッパーを次に進める
//     // ステップごとにバリデーションも実行
//     const handleNext = (step) => {
//         if (step === 0) {
//             // カリキュラム番号のバリデーション
//             // カリキュラム番号が選択されているか
//             if (!(curriculum_number)) {
//                 setCurriculumNumberValidationError(1);
//                 return false;
//             }

//             // カテゴリーとトピックに対して適切なカリキュラム番号が選択されているか
//             if (category === 0) {
//                 if (!(curriculum_numbers[0][Number(topic)].includes(curriculum_number))) {
//                     setCurriculumNumberValidationError(1);
//                     return false;
//                 }
//             } else if (category === 1) {
//                 // 以下変更箇所
//                 if (topic === 19) {
//                     if (!(curriculum_numbers[1][1].includes(curriculum_number))) {
//                         setCurriculumNumberValidationError(1);
//                         return false;
//                     }
//                 } else {
//                     if (!(curriculum_numbers[1][0].includes(curriculum_number))) {
//                         setCurriculumNumberValidationError(1);
//                         return false;
//                     }
//                 }
//             }
//         } else if (step === 1) {
//             // タイトルのバリデーション
//             if (title.trim().length === 0) {
//                 setQuestionValidationError(1);
//                 return false;
//             }

//             // 調べたことのバリデーション
//             if (remarks.trim().length === 0) {
//                 setQuestionValidationError(1);
//                 return false;
//             }

//             // 質問とコメントのバリデーション
//             if (question.trim().length === 0) {
//                 setQuestionValidationError(1);
//                 return false;
//             }
//         }
//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     };

//     // ステッパーを前に戻す
//     const handleBack = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     };

//     // ステッパーをリセット
//     const handleReset = () => {
//         setCategory(old_data.category);
//         setTopic(old_data.topic);
//         setCurriculumNumber(old_data.curriculum_number);
//         setTitle(old_data.title);
//         setRemarks(old_data.remarks);
//         setQuestion(old_data.question);
//         setActiveStep(0);
//     };

//     // 保存処理
//     const handleSubmit = () => {
//         // 重複保存防止のために保存ボタンのクリック数をカウント
//         // クリック数が0回の場合のみ保存実行
//         if (clickCount==0) {
//             setClickCount(1);

//             axios
//                 .post(`/questions/${ id }/update`, {
//                     category: category,
//                     topic: topic,
//                     curriculum_number: curriculum_number,
//                     title: title,
//                     remarks: remarks,
//                     question: question,
//                     images: images,
//                 })
//                 .then(response => {
//                     if (response.status === 200) {
//                         history.push(`/questions/${ response.data.id }`, { question: "edited" });
//                     }
//                 }).catch(error => {
//                     console.log(error);
//                     setClickCount(0);
//                 });
//         } else {
//             return false;
//         }
//     };

//     // ステッパーの内容
//     const getStepContent = (step) => {
//         switch (step) {
//             case 0:
//                 return (
//                     <React.Fragment>
//                         <Typography
//                             variant="h5"
//                             component="div"
//                             sx={{
//                                 marginTop: 4,
//                                 marginLeft: 2,
//                             }}
//                         >
//                             1. カテゴリーの選択
//                         </Typography>

//                         <Typography
//                             component="div"
//                             sx={{
//                                 marginTop: 2,
//                                 marginLeft: 4,
//                             }}
//                         >
//                             <Category
//                                 category={ category }
//                                 old_category={ old_data.category }
//                                 setCategory={ setCategory }
//                             />
//                         </Typography>

//                         <Typography
//                             variant="h5"
//                             component="div"
//                             sx={{
//                                 marginTop: 4,
//                                 marginLeft: 2,
//                             }}
//                         >
//                             2. トピックの選択
//                         </Typography>

//                         <Typography
//                             component="div"
//                             sx={{
//                                 marginTop: 2,
//                                 marginLeft: 4,
//                             }}
//                         >
//                             <TopicForm
//                                 category={ category }
//                                 topic={ topic }
//                                 setTopic={ setTopic }
//                                 old_topic={ old_data.topic }
//                             />
//                         </Typography>

//                         <Typography
//                             variant="h5"
//                             component="div"
//                             sx={{
//                                 marginTop: 4,
//                                 marginLeft: 2,
//                             }}
//                         >
//                             3. 該当カリキュラム番号の選択
//                         </Typography>

//                         <CurriculumNumber
//                             category={ category }
//                             topic={ topic }
//                             setCurriculumNumber={ setCurriculumNumber }
//                             curriculum_number={ curriculum_number }
//                             old_topic={ old_data.topic }
//                             old_curriculum_number={ old_data.curriculum_number }
//                             curriculum_number_validation_error={ curriculum_number_validation_error }
//                             curriculum_numbers={ curriculum_numbers }
//                         />
//                     </React.Fragment>
//                 );

//             case 1:
//                 return (
//                     <React.Fragment>
//                         <QuestionForm
//                             question={ question }
//                             setQuestion={ setQuestion }
//                             title={ title }
//                             setTitle={ setTitle }
//                             remarks={ remarks }
//                             setRemarks={ setRemarks }
//                             question_validation_error={ question_validation_error }
//                             activeStep={ activeStep }
//                             images={ images }
//                             setImages={ setImages }
//                         />
//                     </React.Fragment>
//                 );

//             case 2:
//                 return (
//                     <React.Fragment>
//                         <Confirm
//                             category={ category }
//                             topic={ topic }
//                             curriculum_number={ curriculum_number }
//                             title={ title }
//                             remarks={ remarks }
//                             question={ question }
//                         />
//                     </React.Fragment>
//                 );

//             default:
//                 return 'Unknown step';
//         }
//     };

//     return (
//         <div className="container">
//             <Breadcrumbs page="mentor_question_edit" id={ id }/>

//             <Box
//                 sx={{
//                     width: screen_width >= 800 ? "80%" : "96%",
//                     marginLeft: screen_width >= 800 ? "10%" : "2%",
//                 }}
//             >
//                 <Card sx={{ marginBottom: 2, padding: 2 }}>
//                     <Stepper activeStep={ activeStep } sx={{ marginTop: 3 }}>
//                         { steps.map((step, step_number) => {
//                             return (
//                                 <Step key={ step_number }>
//                                     <StepLabel>{step}</StepLabel>
//                                 </Step>
//                             );
//                         })}
//                     </Stepper>

//                     { activeStep === steps.length - 1 ? (
//                         <React.Fragment>
//                             <Typography sx={{ mt: 2, mb: 1 }}>
//                                 { getStepContent(activeStep) }

//                                 <Typography
//                                     align="center"
//                                     component="div"
//                                     sx={{
//                                         marginTop: 4,
//                                         marginBottom: 3,
//                                     }}
//                                 >
//                                     <Button onClick={ handleSubmit } variant="contained" endIcon={<SaveIcon />}>
//                                         更新する
//                                     </Button>
//                                 </Typography>
//                             </Typography>

//                             <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//                                 <Button
//                                     color="inherit"
//                                     disabled={ activeStep === 0 }
//                                     onClick={ handleBack }
//                                     sx={{ mr: 1 }}
//                                 >
//                                     戻る
//                                 </Button>

//                                 <Box sx={{ flex: '1 1 auto' }} />

//                                 <Button onClick={handleReset}>最初から</Button>
//                             </Box>
//                         </React.Fragment>
//                     ) : (
//                         <React.Fragment>
//                             <Typography sx={{ mt: 2, mb: 1 }}>{ getStepContent(activeStep) }</Typography>

//                             <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//                                 <Button
//                                     color="inherit"
//                                     disabled={ activeStep === 0 }
//                                     onClick={ handleBack }
//                                     sx={{ mr: 1 }}
//                                 >
//                                     戻る
//                                 </Button>

//                                 <Box sx={{ flex: '1 1 auto' }} />

//                                 <Button onClick={ () => handleNext(activeStep) }>
//                                     { activeStep === steps.length - 1 ? '入力完了' : '次へ' }
//                                 </Button>
//                             </Box>
//                         </React.Fragment>
//                     )}
//                 </Card>
//             </Box>
//         </div>
//     );
// }

export default Edit;
