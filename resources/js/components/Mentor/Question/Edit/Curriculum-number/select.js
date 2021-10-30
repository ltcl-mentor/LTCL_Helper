import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormLabel from '@material-ui/core/FormLabel';

function Selects(props) {
    const handleCurriculumNumber = (event) => {
        props.setCurriculumNumber(event.target.value);
    };

    const MenuItems = props.items.map((item) => {
        return (
            <MenuItem value={ item }>{ item }</MenuItem>
        );
    });
    
    return (
        <div className="curriculum_number_box">
            <FormControl>
                <FormLabel component="legend">カリキュラム番号</FormLabel>
                <Select
                    value={ props.curriculum_number }
                    onChange={ (event) => handleCurriculumNumber(event) }
                    displayEmpty
                >
                    { MenuItems }
                </Select>
            </FormControl>
        </div>
    );
}

export default Selects;