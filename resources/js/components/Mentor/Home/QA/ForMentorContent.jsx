import React from "react";
import BackQA from "./backQA";
import Breadcrumbs from "@/Components/Shared/breadcrumbs";
import Card from "./card";
import Questions from "./questions";
import { StyleDiv } from "@/Styles/Mentor/Home/QA/ForMentorContent";

/**
 * 質問一覧(メンター用)ページ
 */
const ForMentorContent = () => {
    return (
        <StyleDiv>
            <Breadcrumbs page="public_question_index" />

            <Card />
            <Questions />
            <BackQA />
        </StyleDiv>
    );
};

export default ForMentorContent;