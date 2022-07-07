import React from "react";
import { Inertia } from "@inertiajs/inertia";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";

// menuItemのロジック
export const useMenuItem = (menu) => {
    const operation = {
        "myPage": { onClick: () => Inertia.get('/my_page'), icon: <AccountCircleIcon />, text: "マイページ" },
        "admin-myPage": { onClick: () => Inertia.get('/Admin_my_page'), icon: <AccountCircleIcon />, text: "マイページ" },
        "history": { onClick: () => Inertia.get('history'), icon: <HistoryIcon />, text: "質問閲覧履歴" },
        "search" : { onClick: () => Inertia.get('search'), icon: <SearchIcon />, text: "検索する" },
        "question": { onClick: () => Inertia.get('question.create'), icon: <AddIcon />, text: "質問する" },
        "logout": { onClick: () => Inertia.post('logout'), icon: <LogoutIcon />, text: "ログアウト" },
    };

    return operation[menu];
};
