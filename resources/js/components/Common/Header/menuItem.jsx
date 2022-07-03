import React from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from '@mui/material/MenuItem';
import { useMenuItem } from "@/Logics/Common/Header/menuItem";

/**
 * ユーザーメニュー
 */
const menuItem = ({ menu }) => {
    const menuDetail = useMenuItem(menu);
    return (
        <MenuItem onClick={menuDetail.onClick}>
            <ListItemIcon>
                {menuDetail.icon}
            </ListItemIcon>
            {menuDetail.text}
        </MenuItem>
    );
};

export default menuItem;
