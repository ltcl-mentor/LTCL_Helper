import React from "react";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { GridItem, Text, Selects, Form } from "@/Styles/Mentor/Home/Manage/User/userRegister/userRegister";

const today = new Date();
const thisYear = today.getFullYear();

/**
 * 年
 */
const year = ({ select, handleSelect }) => {
    return (
        <Form width="28" size="small">
            <Grid container>
                <GridItem grow="3" item>
                    <InputLabel id="demo-select-small">年</InputLabel>
                    <Selects
                        labelId="demo-select-small"
                        value={select.year}
                        label="年"
                        name="year"
                        onChange={event => handleSelect(event)}
                    >
                        <MenuItem value={thisYear - 1}>
                            {thisYear - 1}
                        </MenuItem>
                        <MenuItem value={thisYear}>
                            {thisYear}
                        </MenuItem>
                        <MenuItem value={thisYear + 1}>
                            {thisYear + 1}
                        </MenuItem>
                    </Selects>
                </GridItem>
                <GridItem grow="1" item>
                    <Text>年</Text>
                </GridItem>
            </Grid>
        </Form>
    );
};

export default year;
