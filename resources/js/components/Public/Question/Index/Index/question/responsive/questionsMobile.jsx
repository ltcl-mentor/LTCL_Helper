import React from 'react';
import PaginationPart from "@/Components/Shared/paginationPart";
import QuestionsList from "@/Components/Public/Question/Index/Index/question/questionsList";
import Selector from '../selector';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { Pagination } from "@/Styles/Mentor/Home/QA/ForMentorContent";
import { StyleDiv } from '@/Styles/Public/Question/Index/Index/Index';

/**
 * カリキュラムの質問一覧（モバイル版）
 */
const questionsMobile = ({ user, questions, handleStatus, handlePageClick }) => {
    const list = QuestionsList({ questions, user });
    const { emptyMessage, questionList, pagination } = PaginationPart({ list, questions, handlePageClick });

    return (
        <Box>
            <StyleDiv>
                {user.is_admin && <Selector handleStatus={handleStatus} />}
            </StyleDiv>
            <List>{questionList}</List>
            <Pagination>{pagination}</Pagination>
            {emptyMessage}
        </Box>
    )
}

export default questionsMobile;
