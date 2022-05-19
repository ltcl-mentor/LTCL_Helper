import React from "react";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Typography from "@material-ui/core/Typography";
import { styleReferenceArticle } from "../../../Atom/Typography/TypographyStyle";

/**
 * 関連質問
 */
function Questions(props) {
    const related_question = props.related_questions.map(question => {
        return (
            <ListItem button key={question.title}>
                <Link
                    to={"/public/questions/" + question.id}
                    target="_blank"
                    sx={{ marginX: "5%" }}
                    className="related_question"
                >
                    <ListItemText
                        primary={question.title}
                        sx={{ color: "black" }}
                    />
                </Link>
            </ListItem>
        );
    });

    let no_related_questions;
    if (props.related_questions.length === 0) {
        no_related_questions = (
            <ListItem>
                <ListItemText primary="関連する質問はありません。" />
            </ListItem>
        );
    }

    return (
        <>
            <Typography variant="h6" component="div" sx={styleReferenceArticle}>
                関連質問
            </Typography>
            <List
                subheader={<h2 />}
                className="demolist"
                sx={{ width: "90%", marginLeft: "5%" }}
            >
                {related_question}
                {no_related_questions}
            </List>
        </>
    );
}

export default Questions;
