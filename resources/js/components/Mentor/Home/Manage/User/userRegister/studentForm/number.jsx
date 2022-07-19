import React from "react";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { GridItem, Text, Selects, Form } from "@/Styles/Mentor/Home/Manage/User/userRegister/userRegister";

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

/**
 * 人数
 */
const number = ({ select, handleSelect }) => {
    return (
        <Form width="34" size="small">
            <Grid container>
                <GridItem grow="3" item>
                    <InputLabel>名</InputLabel>
                    <Selects
                        value={select.number}
                        label="名"
                        name="number"
                        onChange={event => handleSelect(event)}
                    >
                        {months.map(mon => {
                            return <MenuItem key={mon} value={mon}>{mon}</MenuItem>
                        })}
                    </Selects>
                </GridItem>
                <GridItem grow="1" item>
                    <Text>名登録する</Text>
                </GridItem>
            </Grid>
        </Form>
    );
};

export default number;
