import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormLabel from '@material-ui/core/FormLabel';
import Box from '@mui/material/Box';
import Typography from '@material-ui/core/Typography';

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
            <FormControl  sx={{ width:'50%'}}>
            { props.curriculum_number_validation_error === 1 && <Typography className="errorMassage" sx={{color:'red', marginBottom: 2, textAlign:'start'}}>カリキュラム番号を選択してください。</Typography> }
            <Box sx={{display: 'flex'}}>
                <FormLabel component='legend' sx={{paddingTop:'3%', textAlign:'start'}}>カリキュラム番号</FormLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label=""
                    sx={{width: "100%"}}
                    onChange={ (event) => handleCurriculumNumber(event) }
                >
                    { MenuItems }
                </Select>
                </Box>
            </FormControl>
        </Box>
    );
}

export default Selects;