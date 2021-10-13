import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

function Questions(props) {
    const related_question = props.relatedQuestions.map((question) => {
        return (
            <div className="related_question_itme">
                <ListItem button>
                    <a href={ `/show/` + question.id } target="_blank" className="related_question">
                        <ListItemText
                            primary={ question.question.length > 50 ? question.question.substr(0, 49) + '...' : question.question }
                        />
                    </a>
                </ListItem>
            </div>
        );
    });
    
    return (
        <List subheader={ <h2 /> } className="demolist">
            <ListSubheader align="center" className="related_title" >関連質問</ListSubheader>
            { related_question }
        </List>
    );
}

export default Questions;