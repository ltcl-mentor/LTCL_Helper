import React from "react";
import MenuItem from '@/Components/Common/Header/menuItem';

// ユーザーアイコンのロジック
export const useIconContent = ({ isWide, user }) => {
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
        menuItem = <MenuItem menu="admin-myPage" />;
    } else {
        menuItem = (
            <>
                <MenuItem menu="myPage" />
                <MenuItem menu="history" />
            </>
        );
    }

    return { responsive, menuItem };
};
