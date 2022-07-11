import React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { StyleChip, StyleFormControl } from "@/Styles/Public/Home/Top/Information/create";

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

// 入学月が変わった場合の変更箇所
const targets = [
    "全員",
    "1月前期生", "1月後期生",
    "2月前期生", "2月後期生",
    "3月前期生", "3月後期生",
    "4月前期生", "4月後期生",
    "5月前期生", "5月後期生",
    "6月前期生", "6月後期生",
    "7月前期生", "7月後期生",
    "8月前期生", "8月後期生",
    "9月前期生", "9月後期生",
    "10月前期生", "10月後期生",
    "11月前期生", "11月後期生",
    "12月前期生", "12月後期生"
];

const getStyles = (name, personName, theme) => {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium
    };
};

/**
 * お知らせの対象者選択
 */
const SelectTarget = ({ input, validation, handleTarget }) => {
    const theme = useTheme();

    return (
        <div>
            <StyleFormControl>
                <Select
                    error={validation.target.error}
                    helperText={validation.target.message}
                    multiple
                    value={input.target}
                    onChange={handleTarget}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" /> }
                    renderValue={selected => (
                        <StyleChip>
                            {selected.map(value => (
                                <Chip key={value} label={value} />
                            ))}
                        </StyleChip>
                    )}
                    MenuProps={MenuProps}
                >
                    {targets.map(tar => (
                        <MenuItem
                            key={tar}
                            value={tar}
                            style={getStyles(tar, input.target, theme)}
                        >
                            {tar}
                        </MenuItem>
                    ))}
                </Select>
            </StyleFormControl>
        </div>
    );
};

export default SelectTarget;
