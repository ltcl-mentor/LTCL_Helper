import React from 'react';
import { useQA } from "@/Logics/Home/QA/QA";
import { topics } from '@/Components/shared';
import { ActionArea, GridItem, StyleGrid, TopicBody, TopicCard, TopicContent, TopicTitle } from '@/Styles/Public/Home/QA/Index/indexContent';

/**
 * 質問・記事群
 */
const indexContent = ({ indexValue }) => {
    const [{ index }, { toTopic }] = useQA();
    const content = indexValue == 0 ? index.curriculum : index.project;

    return (
        <StyleGrid value={indexValue} container>
            {content.map((topic, index) => {
                index = indexValue == 0 ? index : index+14;

                return(
                    <GridItem value={indexValue} item key={topic.topic}>
                        <TopicCard>
                            <ActionArea onClick={() => toTopic(topic.topic)}>
                                <TopicTitle index={index}>{topics[index]}</TopicTitle>
                                <TopicBody>
                                    <TopicContent>質問 {topic.questions}件</TopicContent>
                                    <TopicContent>記事 {topic.documents}件</TopicContent>
                                </TopicBody>
                            </ActionArea>
                        </TopicCard>
                    </GridItem>
                );
            })}
        </StyleGrid>
    );
};

export default indexContent;
