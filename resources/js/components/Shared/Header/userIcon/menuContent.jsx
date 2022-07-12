import React from "react";
import MenuItem from './menuItem';

/**
 * ヘッダーのメニューコンテンツ
 */
const menuContent = ({ user, isWide }) => {
    const menuItem = user.is_admin ?
        <MenuItem menu="admin-myPage" />
    :
        <>
            <MenuItem menu="myPage" />
            <MenuItem menu="history" />
        </>

    return (
        <React.Fragment>
            {!isWide &&
                <React.Fragment>
                    <MenuItem menu="search" />
                    <MenuItem menu="question" />
                </React.Fragment>
            }
            {menuItem}
            <MenuItem menu="logout" />
        </React.Fragment>
    );
};

export default menuContent;
