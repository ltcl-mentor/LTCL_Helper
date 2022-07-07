import React from "react";
import MenuItem from '@/Components/Common/Header/menuItem';

// ユーザーアイコンのロジック
export const useIconContent = ({ isWide, user }) => {
    const responsive = !isWide &&
        <React.Fragment>
            <MenuItem menu="search" />
            <MenuItem menu="question" />
        </React.Fragment>;

    const menuItem = user.is_admin ?
        <MenuItem menu="admin-myPage" /> :
        <>
            <MenuItem menu="myPage" />
            <MenuItem menu="history" />
        </>

    return { responsive, menuItem };
};
