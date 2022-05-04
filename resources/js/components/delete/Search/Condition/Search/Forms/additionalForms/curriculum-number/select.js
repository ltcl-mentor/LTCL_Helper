import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormLabel from '@material-ui/core/FormLabel';
import Box from '@mui/material/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@mui/material/TextField';

/**
 * カリキュラム番号の選択肢
 */
function Selects(props) {
    
    const handleCurriculumNumber = (event) => {
        props.setCurriculumNumber(event.target.value);
    };

    const MenuItems = props.curriculum_numbers.map((curriculum_number) => {
        return (
            <MenuItem value={ curriculum_number } key={curriculum_number}>{ curriculum_number }</MenuItem>
        );
    });
    
    return (
        <Box className="curriculum_number_box">
            <FormControl  sx={{ width:'50%' }}>
                <TextField
                    label="カリキュラム番号"
                    id="demo-simple-select"
                    select
                    error={ props.curriculumNumberValidationError }
                    helperText={ props.curriculumNumberValidationMessage }
                    onChange={ (event) => handleCurriculumNumber(event) }
                    style={{ 
                        width: "70%",
                        paddingTop:2,
                    }}
                >
                    { MenuItems }
                </TextField>
            </FormControl>
        </Box>
    );
}

export default Selects;