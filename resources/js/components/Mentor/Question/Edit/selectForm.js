import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "../../../Breadcrumbs";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Topic from "../../../Public/Home/Q&A/search/condition/form/topicForm";
import CurriculumNumber from "./Curriculum-number/curriculum-number";
import QuestionForm from "../../../Public/Question/Create/Create/question-form/questionForm";
import QuestionConfirm from "../../../Public/Question/Create/Create/confirm";
import ConfirmButton from "../../../Atom/Button/ConfirmButton";
import PurpleButton from "../../../Atom/Button/PurpleButton";
import WhiteButton from "../../../Atom/Button/WhiteButton";

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
        curriculum_number_validation_error,
        setCurriculumNumberValidationError
    ] = useState(0);
    const [remarks, setRemarks] = useState("");
    const [question, setQuestion] = useState("");
    const [title, setTitle] = useState("テスト");
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
        <div>
            <Breadcrumbs page="mentor_question_edit" id={id} />
            <Typography
                variant="h5"
                component="div"
                sx={{
                    marginTop: 4,
                    marginBottom: 10,
                    fontSize: 30,
                    color: "#771af8",
                    fontWeight: "bold"
                }}
            >
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
                <div>
                    <Grid
                        container
                        sx={{
                            justifyContent: "space-between"
                        }}
                    >
                        <Grid item xs={7}>
                            <Typography
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: 20
                                }}
                            >
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
                    <Typography
                        sx={{
                            fontWeight: "bold",
                            fontSize: 20,
                            mt: 6
                        }}
                    >
                        トピック
                        <span style={styleSpan}>
                            以下の選択肢から1つを選択してください
                        </span>
                    </Typography>
                    <Topic
                        category={category}
                        topic={topic}
                        setTopic={setTopic}
                        topics={topics}
                    />
                    <Typography
                        sx={{
                            fontWeight: "bold",
                            fontSize: 20,
                            mt: 4
                        }}
                    >
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
                        curriculum_number_validation_error={
                            curriculum_number_validation_error
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
                    <div
                        style={{
                            textAlign: "center"
                        }}
                    >
                        <ConfirmButton onClick={handleConfirmPage}>
                            確認する
                        </ConfirmButton>
                    </div>
                    <div
                        style={{
                            textAlign: "center",
                            marginTop: 5,
                            marginBottom: 30
                        }}
                    >
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
                    </div>
                </div>
            )}
        </div>
    );
};

export default selectForm;
