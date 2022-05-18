import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {
    styleMobileQuestionRemarks,
    styleMobileQuestionTitle,
    styleMobileTitle
} from "../../../../Atom/Typography/TypographyStyle";
import {
    styleAvatarBox,
    styleParentQuestionBox,
    styleQuestionTitleBox
} from "../../../../Atom/Box/BoxStyle";

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
        <Box sx={styleParentQuestionBox}>
            <Box>
                <Box sx={styleAvatarBox}>
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
