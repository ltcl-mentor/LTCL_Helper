import React from 'react';
import { useResult } from '@/Logics/Home/QA/Search/freeword/result/result';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import { PaginationArea, SearchResult } from '@/Styles/Public/Home/QA/Search/freeword/freeword';
import ResultComponents from '../../resultComponents';

/**
 * フリーワード検索の検索結果表示
 */
const result = ({ searchType, freeword }) => {
    const [{questions, currentPage}, handlePageClick] = useResult({ searchType, freeword });
    const { emptyMessage, questionList, pagination } = ResultComponents({ questions });

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
