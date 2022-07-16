import React from "react";
import { useMentorQuestion } from "@/Logics/Mentor/ForMentorContent";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { Questions, Pagination, StyleTab, TabArea } from "@/Styles/Mentor/Home/QA/ForMentorContent";

/**
 * 質問一覧
 */
const questions = () => {
    const { emptyMessage, questionList, pagination } = useMentorQuestion();
    return (
        <Questions>
            <TabArea>
                <Tabs value={0}>
                    <StyleTab label="質問" />
                </Tabs>
            </TabArea>
            <Box>
                <Box display="flex">
                    <List>{questionList}</List>
                </Box>
                <Pagination>{pagination}</Pagination>
                {emptyMessage}
            </Box>
        </Questions>
    );
};

export default questions;
