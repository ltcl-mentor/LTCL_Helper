import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "../../../Breadcrumbs";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Topic from "../../../Public/Home/Q&A/search/condition/form/topicForm";
import CurriculumNumber from "./Curriculum-number/curriculum-number";

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

const selectForm = () => {
    const { id } = useParams();
    const [old_data, setOldData] = useState([]);
    const [category, setCategory] = useState(0);
    const [topic, setTopic] = useState(0);
    const [curriculum_number, setCurriculumNumber] = useState("");
    const [
        curriculum_number_validation_error,
        setCurriculumNumberValidationError
    ] = useState(0);
    const [remarks, setRemarks] = useState("");
    const [question, setQuestion] = useState("");
    const [title, setTitle] = useState("");
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
        </div>
    );
};

export default selectForm;
