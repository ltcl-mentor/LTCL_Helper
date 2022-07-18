import React from "react";
import Button from "@mui/material/Button";
import { Username } from "@/Styles/Shared/Header/Header";

/**
 * userIconのユーザー名
 */
const userButton = ({ user, setAnchorEl }) => {
    return (
        <Button
            size="large"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={e => setAnchorEl(e.currentTarget)}
            color="inherit"
        >
            <Username>{user.name}</Username>
        </Button>
    );
};

export default userButton;
