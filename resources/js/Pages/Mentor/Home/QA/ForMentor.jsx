import React from "react";
import Header from '@/Components/Shared/Header/Header';
import ForMentorContent from "@/Components/Mentor/Home/QA/ForMentorContent";

/**
 * 質問一覧(メンター用)ページ
 */
const ForMentor = ({ auth }) => {
    return (
        <Header auth={auth}>
            <ForMentorContent auth={auth} />
        </Header>
    );
};

export default ForMentor;
