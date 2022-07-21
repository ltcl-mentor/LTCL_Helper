import React from 'react';
import { useArticle } from '@/Logics/Public/Question/Index/Index/document/article';
import Pagination from '@mui/material/Pagination';
import Buttons from '../buttons';
import Document from '../document';
import SearchBox from '@/Components/Public/Home/QA/Search/freeword/searchBox/contentMobile';
import { Search } from '@/Styles/Public/Question/Index/Index/Index';
import { Pagination as PaginatePos } from "@/Styles/Mentor/Home/QA/ForMentorContent";
import { Empty } from '@/Styles/Public/Home/QA/Search/freeword/freeword';

/**
 * 記事一覧（モバイル版）
 */
const articleMobile = ({ category, documentIndex }) => {
    const [{ documents, rank }, { handlePageClick, handleKeyword, handleSelect }] = useArticle({ category, documentIndex });

    let documentsList;
    let emptyMessage;
    let pagination;
    // 関連質問がなかった場合
    if (documentIndex.eventList.filter(v=>v).length === 0) {
        emptyMessage = <Empty>関連する記事がありません。</Empty>;

    // 関連質問があった場合
    } else {
        // ペジネーションの部分
        pagination = (
            <Pagination
                count={documents.lastPage}
                page={documents.currentPage}
                onChange={handlePageClick}
                display="block"
            />
        );
        documentsList = documents.eventList.map((document, index) => {
            return <Document key={`${index}-${document.title}`} document={document} />;
        });
    }

    return (
        <React.Fragment>
            <Search>
                <SearchBox handle={handleKeyword} />
            </Search>
            <Buttons rank={rank} handleSelect={handleSelect} />
            {documentsList}
            {emptyMessage}
            <PaginatePos>{pagination}</PaginatePos>
        </React.Fragment>
    );
}

export default articleMobile;
