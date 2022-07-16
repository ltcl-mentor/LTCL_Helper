import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import Button from "@mui/material/Button";
import ListItemText from '@mui/material/ListItemText';
import { QuestionText, QuestionTitle, StatusButton, PrivateButton, Question } from "@/Styles/Mentor/Home/QA/ForMentorContent";

/**
 * 検索結果表示に必要な共通コンポーネント
 */
const questionsList = ({ questions }) => {
    const list = questions.eventList.map(question => {
        const check = question.check ?
            <Button variant="outlined" color="success">公開中</Button>
        :
            <PrivateButton variant="outlined">非公開</PrivateButton>

        let status;
        switch (question.status) {
            case 0:
                status = <StatusButton variant="contained">未対応</StatusButton>; break;
            case 1:
                status = <StatusButton variant="outlined" color="success">対応中</StatusButton>; break;
            case 2:
                status = <StatusButton variant="outlined" color="inherit">解決済</StatusButton>; break;
            case 3:
                status = <StatusButton variant="contained" color="error">要対応</StatusButton>; break;
        }

        const title = question.title.length > 31 ? question.title.substring(0, 30) + "..." : question.title;

        return (
            <div key={question.id}>
                <Link href={route('question.show', question.id)}>
                    <Question button>
                        <ListItemText
                            primary={
                                <QuestionText>
                                    <div>
                                        {check}
                                        {status}
                                    </div>
                                    <QuestionTitle>{title}</QuestionTitle>
                                </QuestionText>
                            }
                        />
                    </Question>
                </Link>
            </div>
        );
    });

    return list;
};

export default questionsList;
