import React, {useState, useEffect} from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormLabel from '@material-ui/core/FormLabel';

/**
 * カリキュラム番号の選択肢
 */
function Selects(props) {
    const handleCurriculumNumber = (event) => {
        if (event.target.value === "") {
            props.setCurriculumNumber(props.old_curriculum_number);
        } else {
            props.setCurriculumNumber(event.target.value);
        }
    };

    const MenuItems = props.items.map((item) => {
        return (
            <MenuItem value={ item }>{ item }</MenuItem>
        );
    });
    
    return (
        <div className="curriculum_number_box">
            { props.curriculum_number_validation_error ?
                <FormControl error>
                    <FormLabel component="legend">カリキュラム番号</FormLabel>
                    <Select
                        value={ props.curriculum_number }
                        onChange={ (event) => handleCurriculumNumber(event) }
                        displayEmpty
                    >
                        { props.topic === props.old_topic && 
                            <MenuItem value="">{ props.old_curriculum_number }</MenuItem>
                        }
                        
                        { MenuItems }
                    </Select>
                </FormControl>
            :
                <FormControl>
                    <FormLabel component="legend">カリキュラム番号</FormLabel>
                    <Select
                        value={ props.curriculum_number }
                        onChange={ (event) => handleCurriculumNumber(event) }
                        displayEmpty
                    >
                        { props.topic === props.old_topic && 
                            <MenuItem value={ props.old_curriculum_number }>{ props.old_curriculum_number }</MenuItem>
                        }
                        
                        { MenuItems }
                    </Select>
                </FormControl>
            }
        </div>
    );
}

export default Selects;