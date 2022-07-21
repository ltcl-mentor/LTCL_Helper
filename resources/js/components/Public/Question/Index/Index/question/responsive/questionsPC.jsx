import React from 'react';
import PaginationPart from "@/Components/Shared/paginationPart";
import QuestionsList from "@/Components/Public/Question/Index/Index/question/questionsList";
import Selector from '../selector';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { Pagination } from "@/Styles/Mentor/Home/QA/ForMentorContent";

/**
 * カリキュラムの質問一覧（PC版）
 */
const questionsPC = ({ user, questions, handleStatus, handlePageClick }) => {
    const list = QuestionsList({ questions, user });
    const { emptyMessage, questionList, pagination } = PaginationPart({ list, questions, handlePageClick });

    return (
        <Box>
            <Box display="flex" justifyContent="space-between">
                <List>{questionList}</List>
                {user.is_admin && <Selector handleStatus={handleStatus} />}
            </Box>
            <Pagination>{pagination}</Pagination>
            {emptyMessage}
        </Box>
    )
}

export default questionsPC;
