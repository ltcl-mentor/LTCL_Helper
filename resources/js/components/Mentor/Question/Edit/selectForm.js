import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "../../../Shared/Breadcrumbs";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import CurriculumNumber from "./Curriculum-number/curriculum-number";
import QuestionForm from "../../../Public/Question/Create/Create/question-form/questionForm";
import QuestionConfirm from "../../../Public/Question/Create/Create/confirm";
import ConfirmButton from "../../../Atom/Button/ConfirmButton";
import PurpleButton from "../../../Atom/Button/PurpleButton";
import WhiteButton from "../../../Atom/Button/WhiteButton";
import TopicForm from "./topicForm";
import Box from "@mui/material/Box";
import {
    styleCategoryTitle,
    styleEditSubTitle,
    styleEditTitle
} from "../../../Atom/Typography/TypographyStyle";
import { styleReturnQuestionBox } from "../../../Atom/Box/BoxStyle";

const styleSpan = {
    fontWeight: "normal",
    color: "#771AF8",
    marginLeft: "20px",
    fontSize: 18
};

const selectForm = () => {
    const { id } = useParams();
    const history = useHistory();
    const [clickCount, setClickCount] = useState(0);
    const [old_data, setOldData] = useState([]);
    const [category, setCategory] = useState(0);
    const [topic, setTopic] = useState(0);
    const [activeStep, setActiveStep] = useState(0);
    const [curriculum_number, setCurriculumNumber] = useState("");
    const [
        curriculumNumberValidationError,
        setCurriculumNumberValidationError
    ] = useState(0);
    const [
        curriculumNumberValidationMessage,
        setCurriculumNumberValidationMessage
    ] = useState("");
    const [remarks, setRemarks] = useState("");
    const [question, setQuestion] = useState("");
    const [title, setTitle] = useState("");
    const [questionValidationError, setQuestionValidationError] = useState({
        title: false,
        search: false,
        content: false
    });
    const [questionValidationMessage, setQuestionValidationMessage] = useState({
        titleErrorMessage: "",
        searchErrorMessage: "",
        contentErrorMessage: ""
    });
    const [images, setImages] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const topics = [
        // カリキュラムのトピック
        "AWS",
        "HTML",
        "CSS",
        "JavaScript",
        "サーバー",
        "PHP",
        "Laravel",
        "データベース",
        "Git&GitHub",
        "マイグレーション",
        "リレーション",
        "認証・認可機能(カリキュラム)",
        "API(カリキュラム)",
        "その他(カリキュラム)",
        // 成果物のトピック
        "認証・認可機能(成果物)",
        "API(成果物)",
        "画像処理",
        "Heroku環境",
        "デザイン",
        "その他(成果物)"
    ];

    let curriculum;
    let project;
    if (category == 0) {
        curriculum = (
            <PurpleButton onClick={() => setCategory(0)}>
                カリキュラム
            </PurpleButton>
        );
        project = (
            <WhiteButton onClick={() => setCategory(1)}>成果物</WhiteButton>
        );
    } else {
        curriculum = (
            <WhiteButton onClick={() => setCategory(0)}>
                カリキュラム
            </WhiteButton>
        );
        project = (
            <PurpleButton onClick={() => setCategory(1)}>成果物</PurpleButton>
        );
    }

    useEffect(() => {
        // 該当質問取得
        axios
            .get(`/react/question/${id}`)
            .then(response => {
                setOldData(response.data);
                setCategory(response.data.category);
                setTopic(response.data.topic);
                setCurriculumNumber(response.data.curriculum_number);
                setTitle(response.data.title);
                setRemarks(response.data.remarks);
                setQuestion(response.data.question);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleSubmit = () => {
        // 重複保存防止のために保存ボタンのクリック数をカウント
        // クリック数が0回の場合のみ保存実行
        if (clickCount == 0) {
            setClickCount(1);

            axios
                .post(`/questions/${id}/update`, {
                    category: category,
                    topic: topic,
                    curriculum_number: curriculum_number,
                    title: title,
                    remarks: remarks,
                    question: question,
                    images: images
                })
                .then(response => {
                    if (response.status === 200) {
                        history.push(`/questions/${response.data.id}`, {
                            question: "edited"
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                    setClickCount(0);
                });
        } else {
            return false;
        }
    };
    const validateCurriculumNumber = () => {
        // カリキュラム番号のバリデーション;
        let validationMessage = "カリキュラム番号を選択してください";
        // カリキュラム番号が選択されているか
        if (!curriculum_number) {
            setCurriculumNumberValidationError(true);
            setCurriculumNumberValidationMessage(validationMessage);
            return false;
        } else {
            return true;
        }
    };

    // 質問内容のバリデーション
    const validateQuestions = () => {
        let validateKey = {
            title: false,
            search: false,
            content: false
        };
        let validateMessage = {
            titleErrorMessage: "",
            searchErrorMessage: "",
            contentErrorMessage: ""
        };
        if (title.trim().length === 0) {
            validateKey.title = true;
            validateMessage.titleErrorMessage =
                "質問タイトルを入力してください";
        }
        if (remarks.trim().length === 0) {
            validateKey.search = true;
            validateMessage.searchErrorMessage = "調べたことを入力してください";
        }
        if (question.trim().length === 0) {
            validateKey.content = true;
            validateMessage.contentErrorMessage = "質問内容を入力してください";
        }
        setQuestionValidationError(validateKey);
        setQuestionValidationMessage(validateMessage);

        if (
            validateKey.title == false &&
            validateKey.search == false &&
            validateKey.content == false
        ) {
            return true;
        } else {
            return false;
        }
    };

    // 確認ボタンを押した際にテキストフィールドのバリデーションを行う
    const handleConfirmPage = () => {
        const curriculum_number_error_check = validateCurriculumNumber();
        const question_form_error_check = validateQuestions();
        if (
            curriculum_number_error_check === true &&
            question_form_error_check === true
        ) {
            setShowConfirm(true);
        }
    };

    // 入力ページへ戻るための関数
    const backInputPage = () => {
        setShowConfirm(false);
    };

    const handleBackTopPage = () => {
        history.push("/mentor/top");
    };

    return (
        <Box>
            <Breadcrumbs page="mentor_question_edit" id={id} />
            <Typography variant="h5" component="div" sx={styleEditTitle}>
                質問編集画面
            </Typography>
            {showConfirm ? (
                <QuestionConfirm
                    category={category}
                    topic={topic}
                    curriculum_number={curriculum_number}
                    title={title}
                    remarks={remarks}
                    question={question}
                    images={images}
                    handleConfirmPage={backInputPage}
                    handleSubmit={handleSubmit}
                />
            ) : (
                <Box>
                    <Grid
                        container
                        sx={{
                            justifyContent: "space-between"
                        }}
                    >
                        <Grid item xs={7}>
                            <Typography sx={styleCategoryTitle}>
                                カテゴリー
                                <span style={styleSpan}>
                                    どちらか1つを選択してください
                                </span>
                            </Typography>
                        </Grid>
                    </Grid>
                    {/* カテゴリー選択欄 */}
                    <Stack
                        direction="row"
                        sx={{
                            width: "40%",
                            m: "15px 0"
                        }}
                    >
                        {curriculum}
                        {project}
                    </Stack>
                    <Typography sx={styleEditSubTitle}>
                        トピック
                        <span style={styleSpan}>
                            以下の選択肢から1つを選択してください
                        </span>
                    </Typography>
                    <TopicForm
                        category={category}
                        topic={topic}
                        setTopic={setTopic}
                        setCurriculumNumber={setCurriculumNumber}
                        topics={topics}
                    />
                    <Typography sx={styleEditSubTitle}>
                        カリキュラム番号
                        <span style={styleSpan}>
                            以下の選択肢から1つを選択してください
                        </span>
                    </Typography>
                    <CurriculumNumber
                        category={category}
                        topic={topic}
                        setCurriculumNumber={setCurriculumNumber}
                        curriculum_number={curriculum_number}
                        old_topic={old_data.topic}
                        old_curriculum_number={old_data.curriculum_number}
                        curriculumNumberValidationError={
                            curriculumNumberValidationError
                        }
                        curriculumNumberValidationMessage={
                            curriculumNumberValidationMessage
                        }
                    />
                    <QuestionForm
                        question={question}
                        setQuestion={setQuestion}
                        title={title}
                        setTitle={setTitle}
                        remarks={remarks}
                        setRemarks={setRemarks}
                        question_validation_error={questionValidationError}
                        questionValidationMessage={questionValidationMessage}
                        activeStep={activeStep}
                        images={images}
                        setImages={setImages}
                    />
                    <Box
                        sx={{
                            textAlign: "center"
                        }}
                    >
                        <ConfirmButton onClick={handleConfirmPage}>
                            確認する
                        </ConfirmButton>
                    </Box>
                    <Box sx={styleReturnQuestionBox}>
                        <Button
                            variant="text"
                            onClick={handleBackTopPage}
                            style={{
                                color: "black",
                                minWidth: 150,
                                maxWidth: 200,
                                marginBottom: 5
                            }}
                        >
                            メンターTopに戻る
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default selectForm;
