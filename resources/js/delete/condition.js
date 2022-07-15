import React, { useState, useEffect, useCallback } from "react";

import Typography from "@material-ui/core/Typography";
import Stack from "@mui/material/Stack";

import Topic from "../Components/Public/Home/QA/Search/condition/form/topicForm";
import CurriculumNumber from "../Components/Public/Home/QA/Search/condition/form/curriculumNumber";
import { CategoryPC } from "../Components/Public/Home/QA/Search/condition/form/contentPC";
import { KeywordPC } from "../Components/Public/Home/QA/Search/condition/form/contentPC";
import { CategoryMobile } from "../Components/Public/Home/QA/Search/condition/form/contentMobile";
import { KeywordMobile } from "../Components/Public/Home/QA/Search/condition/form/contentMobile";
import Result from "../Components/Public/Home/QA/Search/condition/result/result";
import PurpleButton from "../Components/Atom/Button/PurpleButton";
import WhiteButton from "../Components/Atom/Button/WhiteButton";

// 各パーツのスタイル設定
const styleButtonWidth = { width: "135px" };
const styleMarginPC = { margin: "25px 30px 10px" };
const styleMarginMobile = { margin: "13px 15px 5px" };
const styleHeading = {
    fontWeight: "bold",
    fontSize: 20,
    mt: 6
};
const styleWarningPC = {
    fontWeight: "normal",
    color: "#771AF8",
    ml: "20px",
    fontSize: 18
};
const styleWarningMobile = {
    fontWeight: "normal",
    color: "#771AF8",
    fontSize: 16
};
const styleCategory = {
    width: "100%",
    m: 0
};
export const styleHeadingCategory = {
    fontWeight: "bold",
    fontSize: 20
};
export const styleChoiceCategory = {
    fontWeight: "normal",
    color: "#771AF8"
};
export const styleReset = {
    fontSize: 18,
    textDecoration: "underline",
    cursor: "pointer",
    "&:hover": {
        opacity: 0.7
    }
};
export const styleSearchButton = {
    ml: "auto",
    color: "#771AF8",
    border: "2px solid #771AF8",
    fontWeight: "bold",
    fontSize: 20,
    display: "block",
    "&:hover": {
        backgroundColor: "#771AF8",
        color: "white",
        border: "2px solid #771AF8"
    }
};

/**
 * 絞り込み検索
 */
const condition = props => {
    const [category, setCategory] = useState(0);
    const [topic, setTopic] = useState(0);
    const [curriculumNumber, setCurriculumNumber] = useState("");
    const [keyword, setKeyword] = useState("");
    const [isSearchButtonClicked, setIsSearchButtonClicked] = useState(false);
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

    let curriculum;
    let project;
    if (category == 0) {
        curriculum = (
            <PurpleButton onClick={() => setCategory(0)} sx={styleButtonWidth}>
                カリキュラム
            </PurpleButton>
        );
        project = (
            <WhiteButton onClick={() => setCategory(1)} sx={styleButtonWidth}>
                成果物
            </WhiteButton>
        );
    } else {
        curriculum = (
            <WhiteButton onClick={() => setCategory(0)} sx={styleButtonWidth}>
                カリキュラム
            </WhiteButton>
        );
        project = (
            <PurpleButton onClick={() => setCategory(1)} sx={styleButtonWidth}>
                成果物
            </PurpleButton>
        );
    }

    // 検索リセット
    const handleCanceling = useCallback(() => {
        setCategory(0);
        setTopic(0);
        setCurriculumNumber("");
        setKeyword("");
    });

    useEffect(() => {
        setIsSearchButtonClicked(false);
    }, [category, topic, curriculumNumber, keyword]);

    let categoryPart;
    let keywordPart;
    if (props.isWide) {
        categoryPart = <CategoryPC handleCanceling={handleCanceling} />;
        keywordPart = (
            <KeywordPC
                setKeyword={setKeyword}
                topic={topic}
                category={category}
                isSearchButtonClicked={isSearchButtonClicked}
                setIsSearchButtonClicked={setIsSearchButtonClicked}
            />
        );
    } else {
        categoryPart = <CategoryMobile handleCanceling={handleCanceling} />;
        keywordPart = (
            <KeywordMobile
                setKeyword={setKeyword}
                topic={topic}
                category={category}
                isSearchButtonClicked={isSearchButtonClicked}
                setIsSearchButtonClicked={setIsSearchButtonClicked}
            />
        );
    }

    return (
        <div style={props.isWide ? styleMarginPC : styleMarginMobile}>
            {/* カテゴリー選択欄 */}
            {categoryPart}
            <Stack direction="row" sx={styleCategory}>
                {curriculum}
                {project}
            </Stack>

            {/* トピック */}
            <Typography sx={styleHeading}>
                2. トピック
                {props.isWide && (
                    <Typography sx={styleWarningPC} component="span">
                        以下から1つを選択してください
                    </Typography>
                )}
            </Typography>
            {!props.isWide && (
                <Typography sx={styleWarningMobile} component="span">
                    以下から1つを選択してください
                </Typography>
            )}
            <Topic
                category={category}
                topic={topic}
                setTopic={setTopic}
                topics={topics}
            />

            {/* カリキュラム番号 */}
            <Typography sx={styleHeading}>
                3. カリキュラム番号
                {props.isWide && (
                    <Typography sx={styleWarningPC} component="span">
                        ※ 任意です
                    </Typography>
                )}
            </Typography>
            {!props.isWide && (
                <Typography sx={styleWarningMobile} component="span">
                    ※ 任意です
                </Typography>
            )}
            <CurriculumNumber
                category={category}
                topic={topic}
                setCurriculumNumber={setCurriculumNumber}
            />

            {/* カリキュラム番号 */}
            <Typography sx={styleHeading}>
                4. キーワード入力
                {props.isWide && (
                    <Typography sx={styleWarningPC} component="span">
                        ※ 任意です
                    </Typography>
                )}
            </Typography>
            {!props.isWide && (
                <Typography sx={styleWarningMobile} component="span">
                    ※ 任意です
                </Typography>
            )}

            {keywordPart}

            {/* 検索結果 */}
            {isSearchButtonClicked && (
                <Result
                    category={category}
                    topic={topic}
                    categories={categories}
                    topics={topics}
                    curriculum_number={curriculumNumber}
                    keyword={keyword}
                />
            )}
        </div>
    );
};

export default condition;
