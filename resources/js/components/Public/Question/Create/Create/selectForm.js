import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import CurriculumNumber from "../../../Home/Q&A/search/condition/form/curriculumNumber";
import QuestionForm from "./question-form/questionForm";
import QuestionConfirm from "./confirm";
import PurpleButton from "../../../../Atom/Button/PurpleButton";
import WhiteButton from "../../../../Atom/Button/WhiteButton";
import ConfirmButton from "../../../../Atom/Button/ConfirmButton";
import TopicForm from "./topicForm";
import Breadcrumb from "../../../../Common/Breadcrumbs";
import Box from "@material-ui/core/Box";
import BreadcrumbBox from "../../../../Atom/Box/BreadcrumbBox";
import {
    styleCategoryTitle,
    styleEditSubTitle,
    styleEditTitle
} from "../../../../Atom/Typography/TypographyStyle";
import { styleReturnTopButton } from "../../../../Atom/Button/ButtonStyle";
import { styleBackTopBox } from "../../../../Atom/Box/BoxStyle";

const styleSpan = {
    fontWeight: "normal",
    color: "#771AF8",
    marginLeft: "20px",
    fontSize: 18
};

/**
 * 絞り込み検索
 */
const DefaultForm = () => {
    const history = useHistory();
    const [clickCount, setClickCount] = useState(0);
    const [category, setCategory] = useState(0);
    const [topic, setTopic] = useState(0);
    const [curriculum_number, setCurriculumNumber] = useState("");
    const [keyword, setKeyword] = useState("");
    const [isSearchButtonClicked, setIsSearchButtonClicked] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [
        curriculumNumberValidationError,
        setCurriculumNumberValidationError
    ] = useState(false);
    const [
        curriculumNumberValidationMessage,
        setCurriculumNumberValidationMessage
    ] = useState("");
    const [question, setQuestion] = useState("");
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
    const [title, setTitle] = useState("");
    const [remarks, setRemarks] = useState("");
    const [activeStep, setActiveStep] = useState(0);
    const [images, setImages] = useState([]);

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

    const handleSubmit = () => {
        // 重複保存防止のために保存ボタンのクリック数をカウント
        // クリック数が0回の場合のみ保存実行
        if (clickCount === 0) {
            setClickCount(1);

            axios
                .post("/questions/store", {
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
                        if (response.data.is_admin === "staff") {
                            history.push(`/questions/${response.data.id}`, {
                                question: "created"
                            });
                        } else {
                            history.push(`/`, {
                                question: "created"
                            });
                        }
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

    const handleBackTopPage = () => {
        history.push("/");
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
        } else if (title.trim().length >= 51) {
            validateKey.title = true;
            validateMessage.titleErrorMessage =
                "５０文字以内で記入してください";
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

    const backInputPage = () => {
        setShowConfirm(false);
    };

    useEffect(() => {
        setIsSearchButtonClicked(false);
    }, [category, topic, curriculum_number, keyword]);

    return (
        <Box>
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
                    <BreadcrumbBox>
                        <Breadcrumb page="public_question_create" />
                    </BreadcrumbBox>
                    <Typography
                        variant="h5"
                        component="div"
                        sx={styleEditTitle}
                    >
                        質問投稿画面
                    </Typography>
                    {/* カテゴリー */}
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
                    {/* トピック */}
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
                    {/* カリキュラム番号 */}
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
                    <Box sx={styleBackTopBox}>
                        <Button
                            variant="text"
                            onClick={handleBackTopPage}
                            style={styleReturnTopButton}
                        >
                            Topに戻る
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default DefaultForm;
