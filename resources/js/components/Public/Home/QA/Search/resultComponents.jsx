import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Pagination from '@mui/material/Pagination';
import { Empty } from '@/Styles/Public/Home/QA/Search/freeword/freeword';

/**
 * 検索結果表示に必要な共通コンポーネント
 */
const resultComponents = ({ questions }) => {
    let emptyMessage;
    let questionList;
    let pagination;

    // 検索結果の質問一覧情報
    const list = questions.eventList.map((question) => {
        return (
            <div>
                <Divider light />
                <Link href={route('question.show', question.id)} target="_blank">
                    <ListItem button>
                        <ListItemText primary={question.title} />
                    </ListItem>
                </Link>
                <Divider />
            </div>
        );
    });

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

export default resultComponents;
