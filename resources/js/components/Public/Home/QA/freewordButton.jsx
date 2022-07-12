import React from "react";
import { PurpleButton, GrayButton } from "@/Styles/Shared/Button";

/**
 * フリーワード検索ボタン
 */
const freewordButton = ({ searchValue, setSearchValue }) => {
    const button = searchValue == 0 ?
        <PurpleButton
            onClick={() => setSearchValue(0)}
            variant="contained"
        >
            フリーワード検索
        </PurpleButton>
    :
        <GrayButton
            onClick={() => setSearchValue(0)}
            variant="contained"
        >
            フリーワード検索
        </GrayButton>

    return (
        <React.Fragment>
            {button}
        </React.Fragment>
    );
};

export default freewordButton;
