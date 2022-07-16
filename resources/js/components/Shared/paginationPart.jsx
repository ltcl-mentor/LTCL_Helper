import React from 'react';
import Pagination from '@mui/material/Pagination';
import { Empty } from '@/Styles/Public/Home/QA/Search/freeword/freeword';

/**
 * ペジネーション
 */
const paginationPart = ({ list, questions, handlePageClick, currentPage = 1 }) => {
    let emptyMessage;
    let questionList;
    let pagination;

    if (list.filter(v=>v).length === 0) {
        // 検索結果がない場合に出力するメッセージ
        emptyMessage = <Empty>該当する質問がありません。</Empty>;
    } else {
        // 検索結果一覧情報を1ページ10件に分割
        questionList = list.slice((currentPage - 1)*10, currentPage*10);

        // ペジネーションの部分
        pagination = (
            <Pagination
                count={ questions.lastPage }
                page={ questions.currentPage }
                onChange={ handlePageClick }
                display="block"
            />
        );
    }

    return { emptyMessage, questionList, pagination };
};

export default paginationPart;
