import React, { useState, useEffect } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FormLabel from "@material-ui/core/FormLabel";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

/**
 * カリキュラム番号の選択肢
 */

const Selects = props => {
    const handleCurriculumNumber = event => {
        props.setCurriculumNumber(event.target.value);
    };

    console.log(props.curriculum_number);
    const MenuItems = props.items.map(item => {
        return (
            <MenuItem value={item} key={item}>
                {item}
            </MenuItem>
        );
    });
    console.log(props.old_curriculum_number);
    return (
        <Box className="curriculum_number_box">
            <FormControl sx={{ width: "50%" }}>
                <TextField
                    value={props.curriculum_number}
                    error={props.curriculumNumberValidationError}
                    helperText={props.curriculumNumberValidationMessage}
                    onChange={event => handleCurriculumNumber(event)}
                    style={{
                        width: "70%",
                        paddingTop: 2
                    }}
                    select
                >
                    {props.old_curriculum_number === props.curriculum_number ? (
                        <MenuItem value={props.curriculum_number}>
                            {props.old_curriculum_number}
                        </MenuItem>
                    ) : null}

                    {MenuItems}
                </TextField>
            </FormControl>
        </Box>
    );
};
// function Selects(props) {
//     const handleCurriculumNumber = (event) => {
//         if (event.target.value === "") {
//             props.setCurriculumNumber(props.old_curriculum_number);
//         } else {
//             props.setCurriculumNumber(event.target.value);
//         }
//     };

//     const MenuItems = props.items.map((item) => {
//         return (
//             <MenuItem value={ item }>{ item }</MenuItem>
//         );
//     });

//     return (
//         <div className="curriculum_number_box">
//             { props.curriculum_number_validation_error ?
//                 <FormControl error>
//                     <FormLabel component="legend">カリキュラム番号</FormLabel>
//                     <Select
//                         value={ props.curriculum_number }
//                         onChange={ (event) => handleCurriculumNumber(event) }
//                         displayEmpty
//                     >
//                         { props.topic === props.old_topic &&
//                             <MenuItem value="">{ props.old_curriculum_number }</MenuItem>
//                         }

//                         { MenuItems }
//                     </Select>
//                 </FormControl>
//             :
//                 <FormControl>
//                     <FormLabel component="legend">カリキュラム番号</FormLabel>
//                     <Select
//                         value={ props.curriculum_number }
//                         onChange={ (event) => handleCurriculumNumber(event) }
//                         displayEmpty
//                     >
//                         { props.topic === props.old_topic &&
//                             <MenuItem value={ props.old_curriculum_number }>{ props.old_curriculum_number }</MenuItem>
//                         }

//                         { MenuItems }
//                     </Select>
//                 </FormControl>
//             }
//         </div>
//     );
// }

export default Selects;
