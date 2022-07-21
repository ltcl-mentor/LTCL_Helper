import React from "react";
import Header from '@/Components/Shared/Header/Header';
import PublicQuestionIndex from "@/Components/Public/Question/Index/Index/Index";

/**
 * 質問一覧(メンター用)ページ
 */
const ForMentor = ({ auth, id }) => {
    return (
        <Header auth={auth}>
            <PublicQuestionIndex auth={auth} topic={id} />
        </Header>
    );
};

export default ForMentor;
