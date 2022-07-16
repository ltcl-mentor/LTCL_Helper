import React from "react";
import { useQA } from "@/Logics/Public/Home/QA/QA";
import { a11yProps } from "@/Components/Shared/a11yProps";
import IndexContent from "./indexContent";
import { Heading, StyleDiv, StyleTabArea, StyleTabs, StyleTab } from "@/Styles/Public/Home/QA/Index/indexQuestionArticle";

/**
 * Q&A画面の質問・記事一覧
 */
const indexQuestionArticle = () => {
    const [{ indexValue }, { handleChange }] = useQA();

    return (
        <StyleDiv>
            <Heading>質問・記事一覧</Heading>
            <StyleTabArea>
                <StyleTabs value={indexValue} onChange={handleChange}>
                    <StyleTab label="カリキュラム" {...a11yProps(0)} />
                    <StyleTab label="成果物" {...a11yProps(1)} />
                </StyleTabs>
                <IndexContent indexValue={indexValue} />
            </StyleTabArea>
        </StyleDiv>
    );
};

export default indexQuestionArticle;
