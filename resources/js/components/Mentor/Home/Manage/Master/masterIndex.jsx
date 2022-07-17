import React from "react";
import { CardText, GridItem, StyleCard, StyleGrid, Heading } from "@/Styles/Mentor/Home/Manage/Manage";

/**
 * master機能一覧
 */
const masterIndex = ({ backupQuestion, backupStudent }) => {
    const contents = [
        { content: (
            <a style={{ color: "black" }} href={route('export')}>
                直近の質問を
                <br />
                CSV出力
            </a>
        )},
        { content: "質問一括登録", onClick: () => backupQuestion() },
        { content: '受講生\n一括登録', onClick: () => backupStudent() }
    ];

    return (
        <React.Fragment>
            <Heading>データ出力・一括登録</Heading>
            <StyleGrid container>
                {contents.map(content => {
                    return (
                        <GridItem item key={content.content}>
                            <StyleCard onClick={content.onClick}>
                                <CardText>
                                    {content.content}
                                </CardText>
                            </StyleCard>
                        </GridItem>
                    );
                })}
            </StyleGrid>
        </React.Fragment>
    );
};

export default masterIndex;
