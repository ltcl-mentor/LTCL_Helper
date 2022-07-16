import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

/**
 * 検索結果表示に必要な共通コンポーネント
 */
const questionsList = ({ questions }) => {

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

    return list;
};

export default questionsList;
