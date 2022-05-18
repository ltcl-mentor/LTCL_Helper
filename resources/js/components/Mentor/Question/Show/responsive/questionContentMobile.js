import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@mui/material/Box";
import Avatar from "@material-ui/core/Avatar";
import SelectStatus from "../../../../Atom/Select/SelectStatus";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import {
    styleMobileQuestionRemarks,
    styleMobileQuestionTitle,
    styleMobileTitle
} from "../../../../Atom/Typography/TypographyStyle";

const questionContentMobile = props => {
    const categories = ["カリキュラム", "成果物"];
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

    return (
        <Box sx={{ width: "90%", marginX: "5%" }}>
            <Box
                sx={{
                    textAlign: "center",
                    mb: 6
                }}
            >
                <SelectStatus
                    id={props.id}
                    status={props.status}
                    setStatus={props.setStatus}
                    responseStatus={props.responseStatus}
                />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                        alt="Student"
                        src="/images/pose_english_shrug_man.png"
                        sx={{
                            marginRight: 2
                        }}
                    />

                    <Typography variant="h7" component="div">
                        受講生 &nbsp; {props.updated_at}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 2
                    }}
                >
                    <Box>
                        <Typography variant="h7" component="div">
                            {categories[props.category]}&nbsp; /&nbsp;
                            {topics[props.topic]}
                            &nbsp; /&nbsp;
                            {props.curriculum_number}&nbsp;
                        </Typography>
                    </Box>
                    <Box>
                        <Link to={`/questions/` + props.id + `/edit`}>
                            <Button
                                variant="text"
                                sx={{ color: "#771AF8", fontSize: 15 }}
                            >
                                編集
                            </Button>
                        </Link>
                        /
                        <Button
                            variant="text"
                            sx={{ color: "#771AF8", fontSize: 15 }}
                            onClick={props.deleteConfirm}
                        >
                            削除
                        </Button>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ display: "fex", position: "relative" }}>
                <Typography
                    variant="h4"
                    component="div"
                    sx={styleMobileQuestionTitle}
                >
                    {props.title}
                </Typography>
            </Box>

            <Typography variant="h6" component="div" sx={styleMobileTitle}>
                調べたこと
            </Typography>
            <Typography
                variant="h5"
                component="div"
                sx={styleMobileQuestionRemarks}
            >
                {props.remarks}
            </Typography>
            <Typography variant="h6" component="div" sx={styleMobileTitle}>
                試したこと、分からないこと
            </Typography>
            <Typography
                variant="h5"
                component="div"
                sx={styleMobileQuestionRemarks}
            >
                {props.question}
            </Typography>
        </Box>
    );
};

export default questionContentMobile;
