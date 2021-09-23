import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormLabel from '@material-ui/core/FormLabel';

function Selects(props) {
    
    const handleCurriculumNumber = (event) => {
        props.setCurriculumNumber(event.target.value);
    };

    const MenuItems = props.curriculum_numbers.map((curriculum_number) => {
        return (
            <MenuItem value={ curriculum_number }>{ curriculum_number }</MenuItem>
        );
    });
    
    return (
        <div className="curriculum_number_box">
            <FormControl>
                <FormLabel component="legend">カリキュラム番号</FormLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={(event) => { handleCurriculumNumber(event) }}
                >
                    { MenuItems }
                </Select>
            </FormControl>
        </div>
    );
}

export default Selects;