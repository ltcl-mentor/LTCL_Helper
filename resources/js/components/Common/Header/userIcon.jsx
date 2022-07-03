import React, { useState } from "react";
import MenuItem from '@/Components/Common/Header/menuItem';
import Button from "@mui/material/Button";
import Menu from "@material-ui/core/Menu";
import { Username } from "@/Styles/Common/Header";
import { useIconContent } from "@/Logics/Common/Header/userIcon";

/**
 * ユーザアイコン
 */
const userIcon = ({ user, isWide }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { responsive, menuItem } = useIconContent({ isWide, user });

    return (
        <div>
            <Button
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={e => setAnchorEl(e.currentTarget)}
                color="inherit"
            >
                <Username>{user.name}</Username>
            </Button>

            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                <div>
                    {responsive}
                    {menuItem}
                    <MenuItem menu="logout" />
                </div>
            </Menu>
        </div>
    );
};

export default userIcon;
