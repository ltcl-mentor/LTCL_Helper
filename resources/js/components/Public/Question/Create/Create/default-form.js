import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import Topic from "../../../Home/Q&A/search/condition/form/topicForm";
import CurriculumNumber from "../../../Home/Q&A/search/condition/form/curriculum-number";
import QuestionForm from "./question-form/questionForm";
import QuestionConfirm from "./confirm";

const styleSpan = {
    fontWeight: "normal",
    color: "#771AF8",
    marginLeft: "20px",
    fontSize: 18
};

const PurpleButton = styled(Button)(({ theme }) => ({
    color: "white",
    fontSize: 18,
    width: "50%",
    boxShadow: "none",
    backgroundColor: "#771AF8",
    border: "1px solid black",
    fontWeight: "bold",
    "&:hover": {
        backgroundColor: "#6633CC",
        boxShadow: "none",
        color: "white"
    }
}));

const WhiteButton = styled(Button)(({ theme }) => ({
    color: "black",
    fontSize: 18,
    width: "50%",
    boxShadow: "none",
    backgroundColor: "white",
    border: "1px solid black",
    "&:hover": {
        backgroundColor: "#EEEEEE",
        boxShadow: "none",
        color: "black"
    }
}));

const ConfirmButton = styled(Button)(({ theme }) => ({
    variant: "outlined",
    color: "#771af8",
    border: "2px solid #771af8",
    fontWeight: "bold",
    minWidth: 150,
    maxWidth: 200,
    marginBottom: 5,
    fontSize: 15,
    "&:hover": {
        backgroundColor: "#771AF8",
        color: "white"
    }
}));

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
        title: "",
        serach: "",
        content: ""
    });
    const [questionValidationMessage, setQuestionValidationMessage] = useState({
        titleErrorMessage: "",
        serachErrorMessage: "",
        contentErrorMessage: ""
    });
    const [title, setTitle] = useState("");
    const [remarks, setRemarks] = useState("");
    const [activeStep, setActiveStep] = useState(0);
    const [images, setImages] = useState([]);

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

    const handleConfirmPage = () => {
        setShowConfirm(!showConfirm);
    };

    useEffect(() => {
        setIsSearchButtonClicked(false);
    }, [category, topic, curriculum_number, keyword]);

    return (
        <div>
            {showConfirm ? (
                <QuestionConfirm
                    category={category}
                    topic={topic}
                    curriculum_number={curriculum_number}
                    title={title}
                    remarks={remarks}
                    question={question}
                    images={images}
                    handleConfirmPage={handleConfirmPage}
                    handleSubmit={handleSubmit}
                />
            ) : (
                <div className="condition">
                    <Typography
                        component="div"
                        sx={{
                            marginTop: 4,
                            marginLeft: 2
                        }}
                    >
                        Top / 質問投稿画面
                    </Typography>
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
                    {/* トピック */}
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
                    {/* カリキュラム番号 */}
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
                            Topに戻る
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DefaultForm;
