import React from 'react';
import {Link} from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

/**
 * 関連質問
 */
function Questions(props) {
    const related_question = props.related_questions.map((question) => {
        console.log(question.id);
        return (
            <ListItem button>
                <Link to={ '/public/questions/' + question.id } target="_blank" className="related_question">
                    <ListItemText
                        primary={ question.title }
                    />
                </Link>
            </ListItem>
        );
    });
    
    let no_related_questions;
    if (props.related_questions.length === 0) {
        no_related_questions = (
            <ListItem>
                <ListItemText
                    primary="関連する質問はありません。"
                />
            </ListItem>
        );
    }
    
    return (
        <List subheader={ <h2 /> } className="demolist" sx={{ width: "100%" }}>
            <ListSubheader align="center" className="related_title" >関連質問</ListSubheader>
            { related_question }
            { no_related_questions }
        </List>
    );
}

export default Questions;