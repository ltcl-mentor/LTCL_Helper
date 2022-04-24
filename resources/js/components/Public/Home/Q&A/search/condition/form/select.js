import React from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import FormLabel from '@material-ui/core/FormLabel';
import Box from '@mui/material/Box';
// import Typography from '@material-ui/core/Typography';
import TextField from '@mui/material/TextField';

/**
 * カリキュラム番号の選択肢
 */
const Selects = (props) => {
    
    const handleCurriculumNumber = (event) => {
        props.setCurriculumNumber(event.target.value);
    };

    const MenuItems = props.curriculum_numbers.map((curriculum_number) => {
        return (
            <MenuItem value={ curriculum_number } key={curriculum_number}>{ curriculum_number }</MenuItem>
        );
    });
    
    return (
        <Box sx={{ width: '175px' }}>
            <FormControl sx={{ width: '100%' }}>
                <TextField
                    label="カリキュラム番号"
                    id="demo-simple-select"
                    select
                    error={ props.curriculumNumberValidationError }
                    helperText={ props.curriculumNumberValidationMessage }
                    onChange={ (event) => handleCurriculumNumber(event) }
                    style={{
                        paddingTop:2,
                    }}
                >
                    { MenuItems }
                </TextField>
            </FormControl>
        </Box>
    );
};

export default Selects;