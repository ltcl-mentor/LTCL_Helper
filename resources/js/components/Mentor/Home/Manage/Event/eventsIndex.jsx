import React from "react";
import { StyleGrid, GridItem, StyleCard, CardText, NoExist, Heading, AddLink } from "@/Styles/Mentor/Home/Manage/Manage";

/**
 * イベント一覧
 */
const eventsIndex = ({ events, clickEvent, handleOpen }) => {
    const eventComponent = events.length > 0 ?
        <StyleGrid container>
            {events.map(event => {
                return (
                    <GridItem item key={`id${event.id}-${event.name}`}>
                        <StyleCard onClick={() => clickEvent(event)}>
                            <CardText>{event.name}</CardText>
                        </StyleCard>
                    </GridItem>
                );
            })}
        </StyleGrid>
    :
        <NoExist>登録されているイベントはありません。</NoExist>

    return (
        <React.Fragment>
            <Heading>イベント一覧</Heading>
            <AddLink onClick={() => handleOpen("add_event")}>
                イベント追加
            </AddLink>
            { eventComponent }
        </React.Fragment>
    );
};

export default eventsIndex;
