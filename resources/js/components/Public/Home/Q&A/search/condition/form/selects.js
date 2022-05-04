import React from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const styleBox = { width: '175px' };
const styleFormControl = { width: '100%' };
const styleText = { paddingTop: 2 };


/**
 * カリキュラム番号の選択肢
 */
const selects = (props) => {
    
    const handleCurriculumNumber = (event) => {
        props.setCurriculumNumber(event.target.value);
    };

    const MenuItems = props.curriculumNumbers.map(curriculumNumber => {
        return (
            <MenuItem value={curriculumNumber} key={curriculumNumber}>{curriculumNumber}</MenuItem>
        );
    });
    
    return (
        <Box sx={styleBox}>
            <FormControl sx={styleFormControl}>
                <TextField
                    label="カリキュラム番号"
                    id="demo-simple-select"
                    select
                    error={props.curriculumNumberValidationError}
                    helperText={props.curriculumNumberValidationMessage}
                    onChange={event => handleCurriculumNumber(event)}
                    style={styleText}
                >
                    {MenuItems}
                </TextField>
            </FormControl>
        </Box>
    );
};

export default selects;