import React, { useState } from "react";
import HeaderMenu from "./userIcon/headerMenu";
import MenuItem from './userIcon/menuItem';
import UserButton from "./userIcon/userButton";

/**
 * ユーザアイコン
 */
const userIcon = ({ user, isWide }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    return (
        <div>
            <UserButton user={user} setAnchorEl={setAnchorEl} />
            <HeaderMenu
                user={user}
                isWide={isWide}
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
            />
        </div>
    );
};

export default userIcon;
