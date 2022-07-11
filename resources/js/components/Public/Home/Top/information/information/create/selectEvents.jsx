import React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { StyleFormControl } from "@/Styles/Public/Home/Top/Information/create";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

/**
 * お知らせのイベント選択
 */
const SelectEvents = ({ event, events, handleEvent }) => {
    return (
        <StyleFormControl>
            <InputLabel id="demo-multiple-name-label">イベント</InputLabel>
            <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={event}
                onChange={handleEvent}
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
            >
                {events.map(event => (
                    <MenuItem key={event.name} value={event}>
                        {event.name}
                    </MenuItem>
                ))}
            </Select>
        </StyleFormControl>
    );
};

export default SelectEvents;
