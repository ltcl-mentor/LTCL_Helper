import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const style = {
    minWidth: "40%",
    marginLeft: "10%",
};

/**
 * お知らせのイベント選択
 */
const SelectEvents = (props) => {
    const handleChange = (event) => {
        const { target: { value } } = event;
        props.setEvent(typeof value === 'string' ? value.split(',') : value);
    };

    return (
            <FormControl sx={style}>
                <InputLabel id="demo-multiple-name-label">イベント</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    value={props.event}
                    onChange={handleChange}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                >
                    {props.events.map(event => (
                        <MenuItem
                            key={event.name}
                            value={event}
                        >
                            {event.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
    );
}

export default SelectEvents;