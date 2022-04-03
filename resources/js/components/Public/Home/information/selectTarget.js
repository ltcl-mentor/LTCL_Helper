import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';

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
    width: "80%",
    marginLeft: "10%",
};

// 入学月が変わった場合の変更箇所
const targets = [
    '全員', 
    '1月前期生', '1月後期生', 
    '2月前期生', '2月後期生', 
    '3月前期生', '3月後期生', 
    '4月前期生', '4月後期生', 
    '5月前期生', '5月後期生', 
    '6月前期生', '6月後期生',
    '7月前期生', '7月後期生', 
    '8月前期生', '8月後期生', 
    '9月前期生', '9月後期生', 
    '10月前期生', '10月後期生', 
    '11月前期生', '11月後期生', 
    '12月前期生', '12月後期生'
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

/**
 * お知らせの対象者選択
 */
function SelectTarget(props) {
    const theme = useTheme();

    const handleChange = (event) => {
        if (event.target.value.length === 0) {
            props.setValidationError({...props.validationError, target: true});
            props.setValidationMessage({...props.validationMessage, target:"対象を選択してください"})
        } else {
            props.setValidationError({...props.validationError, target: false});
            props.setValidationMessage({...props.validationMessage, target:""})
        }
        const { target: { value } } = event;
        props.setTarget(typeof value === 'string' ? value.split(',') : value);
    };

    return (
        <div>
            <FormControl sx={style}>
                <TextField
                    label='対象'
                    id="demo-multiple-chip"
                    select
                    error={ props.validationError.target }
                    helperText={ props.validationMessage }
                    multiple
                    value={props.target}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                 >
                    {targets.map(tar => (
                        <MenuItem
                            key={tar}
                            value={tar}
                            style={getStyles(tar, props.target, theme)}
                        >
                            {tar}
                        </MenuItem>
                    ))}
                </TextField>
            </FormControl>
        </div>
    );
}

export default SelectTarget;