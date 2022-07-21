import React from "react";
import { CardText, CardArea, StyleCard } from "@/Styles/Mentor/Home/QA/ForMentorContent";

/**
 * トピックカード
 */
const card = ({ topic }) => {
    return (
        <CardArea>
            <StyleCard>
                <CardText>{topic}</CardText>
            </StyleCard>
        </CardArea>
    );
};

export default card;
