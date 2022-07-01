import React from "react";
import { Inertia } from "@inertiajs/inertia";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import HistoryIcon from "@mui/icons-material/History";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from "@mui/icons-material/Search";

/**
 * ユーザーメニュー
 */
const menuItem = ({ menu }) => {
    let menuDetail = { onClick: '', icon: '', text: '' };
    switch (menu) {
        case "myPage": // マイページ
            menuDetail.onClick = () => Inertia.get('/my_page');
            menuDetail.icon = <AccountCircleIcon />;
            menuDetail.text = "マイページ";
            break;
        case "admin-myPage": // 管理者マイページ
            menuDetail.onClick = () => Inertia.get('/Admin_my_page');
            menuDetail.icon = <AccountCircleIcon />;
            menuDetail.text = "マイページ";
            break;
        case "history": // 質問閲覧履歴
            menuDetail.onClick = () => Inertia.get('history');
            menuDetail.icon = <HistoryIcon />;
            menuDetail.text = "質問閲覧履歴";
            break;
        case "search": // 検索画面
            menuDetail.onClick = () => Inertia.get('search');
            menuDetail.icon = <SearchIcon />;
            menuDetail.text = "検索する";
            break;
        case "question": // 質問投稿画面
            menuDetail.onClick = () => Inertia.get('question.create');
            menuDetail.icon = <AddIcon />
            menuDetail.text = "質問する";
            break;
        case "logout": // ログアウト
            menuDetail.onClick = () => Inertia.post('logout');
            menuDetail.icon = <LogoutIcon />
            menuDetail.text = "ログアウト";
            break;
    }

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
