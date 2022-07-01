import React, { useState } from "react";

import MenuItem from '@/components/Common/menuItem';
import Button from "@mui/material/Button";
import Menu from "@material-ui/core/Menu";

/**
 * ユーザアイコン
 */
const userIcon = ({ user, isWide }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    let responsive;
    if (!isWide) {
        responsive = (
            <React.Fragment>
                <MenuItem menu="search" />
                <MenuItem menu="question" />
            </React.Fragment>
        );
    }

    let menuItem;
    if (user.is_admin) {
        menuItem = (
            <div>
                <MenuItem menu="admin-myPage" />
                {responsive}
                <MenuItem menu="logout" />
            </div>
        );
    } else {
        menuItem = (
            <div>
                <MenuItem menu="myPage" />
                <MenuItem menu="history" />
                {responsive}
                <MenuItem menu="logout" />
            </div>
        );
    }

    return (
        <div>
            <Button
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={e => setAnchorEl(e.currentTarget)}
                color="inherit"
            >
                <span className="text-xl align-middle">{user.name}</span>
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
                {menuItem}
            </Menu>
        </div>
    );
};

export default userIcon;
