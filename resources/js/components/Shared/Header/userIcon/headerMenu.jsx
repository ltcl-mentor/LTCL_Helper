import React from "react";
import Menu from "@mui/material/Menu";
import MenuContent from "./menuContent";

/**
 * userIconのメニュー
 */
const headerMenu = ({ user, isWide, anchorEl, setAnchorEl }) => {
    return (
        <Menu
            id="menu-appbar" anchorEl={anchorEl} keepMounted
            open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right"
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right"
            }}
        >
            <MenuContent user={user} isWide={isWide} />
        </Menu>
    );
};

export default headerMenu;
