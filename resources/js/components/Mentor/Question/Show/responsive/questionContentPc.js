import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@mui/material/Box";
import Avatar from "@material-ui/core/Avatar";
import SelectStatus from "../../../../Atom/Select/SelectStatus";
import {
    stylePcQuestionTitle,
    stylePcTitle,
    stylePcQuestionRemarks
} from "../../../../Atom/Typography/TypographyStyle";
import {
    styleAvatarBox,
    styleParentQuestionBox,
    styleQuestionInfoBox,
    styleQuestionTitleBox,
    styleSelectStatusBox
} from "../../../../Atom/Box/BoxStyle";

const questionContentPc = props => {
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
        <Box sx={styleParentQuestionBox}>
            <Box sx={styleQuestionInfoBox}>
                <Box sx={styleAvatarBox}>
                    <Avatar
                        alt="Student"
                        src="/images/pose_english_shrug_man.png"
                        sx={{ marginRight: 2 }}
                    />

                    <Typography variant="h7" component="div">
                        受講生 &nbsp; {props.updated_at}
                    </Typography>
                </Box>

                <Typography variant="h7" component="div">
                    {categories[props.category]}&nbsp; /&nbsp;
                    {topics[props.topic]}
                    &nbsp; /&nbsp;
                    {props.curriculum_number}&nbsp;
                </Typography>
            </Box>

            <Box sx={styleQuestionTitleBox}>
                <Typography
                    variant="h4"
                    component="div"
                    sx={stylePcQuestionTitle}
                >
                    {props.title}
                </Typography>
                <Box sx={styleSelectStatusBox}>
                    <SelectStatus
                        id={props.id}
                        status={props.status}
                        setStatus={props.setStatus}
                        responseStatus={props.responseStatus}
                    />
                </Box>
            </Box>

            <Typography variant="h6" component="div" sx={stylePcTitle}>
                調べたこと
            </Typography>
            <Typography
                variant="h5"
                component="div"
                sx={stylePcQuestionRemarks}
            >
                {props.remarks}
            </Typography>
            <Typography variant="h6" component="div" sx={stylePcTitle}>
                試したこと、分からないこと
            </Typography>
            <Typography
                variant="h5"
                component="div"
                sx={stylePcQuestionRemarks}
            >
                {props.question}
            </Typography>
        </Box>
    );
};

export default questionContentPc;
