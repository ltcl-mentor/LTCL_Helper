import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { topics } from '@/Components/shared';

/**
 * トピックの選択肢
 */
const topicForm = ({ select, handleTopic }) => {
    const curriculum = topics.slice(0, 13);
    const project = topics.slice(14, 19);

    const topicForm =
    select.category === 0 ?
        <React.Fragment>
            {curriculum.map((topic, index) => {
                return <FormControlLabel key={topic} value={index} control={<Radio />} label={topic} />
            })}
        </React.Fragment>
    :
        <React.Fragment>
            {project.map((topic, index) => {
                return <FormControlLabel key={topic} value={index+14} control={<Radio />} label={topic} />
            })}
        </React.Fragment>

    return (
        <React.Fragment>
            <FormControl component="fieldset">
                <RadioGroup
                    row
                    aria-label="topic"
                    name="topic"
                    value={select.topic}
                    onChange={handleTopic}
                >
                    {topicForm}
                </RadioGroup>
            </FormControl>
        </React.Fragment>
    );
};

export default topicForm;
