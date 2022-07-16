import React from 'react';
import { useResult } from '@/Logics/Public/Home/QA/Search/freeword/result/result';
import QuestionsList from '../../questionsList';
import PaginationPart from '@/Components/Shared/paginationPart';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import { PaginationArea, SearchResult } from '@/Styles/Public/Home/QA/Search/freeword/freeword';

/**
 * フリーワード検索の検索結果表示
 */
const result = ({ searchType, freeword }) => {
    const [{questions, currentPage}, handlePageClick] = useResult({ searchType, freeword });
    const list = QuestionsList({ questions });
    const { emptyMessage, questionList, pagination } = PaginationPart({ list, questions, handlePageClick, currentPage });

    return (
        <SearchResult>
            <Box>
                <List>{questionList}</List>
            </Box>
            <PaginationArea container>
                <Grid item>{pagination}</Grid>
            </PaginationArea>
            {emptyMessage}
        </SearchResult>
    );
};

export default result;
