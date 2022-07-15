import React from 'react';
import { useResult } from '@/Logics/Home/QA/Search/condition/result/result';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import { topics, categories } from '@/Components/shared';
import { PaginationArea } from '@/Styles/Public/Home/QA/Search/freeword/freeword';
import { ResultArea, ResultHeading, ResultQuestion } from '@/Styles/Public/Home/QA/Search/condition/condition';
import ResultComponents from '../../resultComponents';

/**
 * 絞り込み検索の検索結果表示
 */
const result = ({ select }) => {
    const [{questions, currentPage}, handlePageClick] = useResult({ select });
    const { emptyMessage, questionList, pagination } = ResultComponents({ questions });

    return (
        <ResultArea>
            <ResultHeading>
                カテゴリー：<font color="green">{categories[select.category]}</font>
                、トピック：<font color="blue">{topics[select.topic]}</font>の検索結果
            </ResultHeading>
            <ResultQuestion>
                <List>{questionList}</List>
            </ResultQuestion>
            <PaginationArea container>
                <Grid item>{pagination}</Grid>
            </PaginationArea>
            {emptyMessage}
        </ResultArea>
    );
};

export default result;
