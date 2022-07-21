import React from 'react';
import useMedia from "use-media";
import { useIndex } from '@/Logics/Public/Question/Index/Index/Index';
import Box from '@mui/material/Box';
import ArticleMobile from './document/responsive/articleMobile';
import ArticlePC from './document/responsive/articlePC';
import BackQA from '@/Components/Mentor/Home/QA/backQA';
import Breadcrumbs from '@/Components/Shared/breadcrumbs';
import Card from './question/card';
import QuestionsPC from './question/responsive/questionsPC';
import QuestionsMobile from './question/responsive/questionsMobile';
import { topics } from '@/Components/Shared/shared';
import { a11yProps } from '@/Components/Shared/a11yProps';
import { StyleDiv, StyleBox } from '@/Styles/Public/Question/Index/Index/Index';
import { StyleTabArea, StyleTabs, StyleTab } from "@/Styles/Public/Home/QA/Index/indexQuestionArticle";
import BreakingPoint from '@/Styles/BreakingPoint';

/**
 * 質問一覧(公開)のメインコンポーネント
 */
const Index = ({ topic, auth }) => {
    const is880 = useMedia({ minWidth: `880px` });
    const isWide = useMedia({ minWidth: `${BreakingPoint}px` });
    const [{ value, questions, documents }, { handleStatus, handlePageClick, handleChange }] = useIndex({ topic, auth });

    const component = value === 0 && is880 ?
        <QuestionsPC user={auth.user} questions={questions} handleStatus={handleStatus} handlePageClick={handlePageClick} />
    : value === 0 ?
        <QuestionsMobile user={auth.user} questions={questions} handleStatus={handleStatus} handlePageClick={handlePageClick} />
    : value === 1 && isWide ?
        <ArticlePC category={topic} documentIndex={documents} />
    :
        <ArticleMobile category={topic} documentIndex={documents} />

    return (
        <StyleDiv>
            <Breadcrumbs page="public_question_index" />

            <Card topic={topics[topic]} />
            <Box display='flex' justifyContent='center'>
                <StyleBox>
                    <StyleTabArea>
                        <StyleTabs value={value} onChange={handleChange}>
                            <StyleTab label="質問" {...a11yProps(0)} />
                            <StyleTab label="関連記事" {...a11yProps(1)} />
                        </StyleTabs>
                    </StyleTabArea>
                    {component}
                    <BackQA />
                </StyleBox>
            </Box>
        </StyleDiv>
    );
}

export default Index;
