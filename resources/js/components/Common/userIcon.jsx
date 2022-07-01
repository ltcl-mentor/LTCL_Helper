import React, { useState } from "react";

import MenuItem from '@/components/Common/menuItem';
import Button from "@mui/material/Button";
import Menu from "@material-ui/core/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";

// 各パーツのスタイル設定
const styleMargin = { display: 'inline-block' };
const style = { color: "#771AF8" };

/**
 * ユーザアイコン
 */
const userIcon = ({ user, isWide }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    let responsive;
    if (!isWide) {
        responsive = (
            <React.Fragment>
                <MenuItem menu="search" setAnchorEl={setAnchorEl} />
                <MenuItem menu="question" setAnchorEl={setAnchorEl} />
            </React.Fragment>
        );
    }

    let menuItem;
    if (user.is_admin) {
        menuItem = (
            <div>
                <MenuItem menu="myPage" />
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
                sx={styleMargin}
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
