import React from "react";
import { SearchPurpleButton, SearchGrayButton } from "@/Styles/Public/Home/QA/Search/searchArea";

/**
 * フリーワード検索ボタン
 */
const freewordButton = ({ searchValue, setSearchValue }) => {
    const button = searchValue == 0 ?
        <SearchPurpleButton
            onClick={() => setSearchValue(0)}
            variant="contained"
        >
            フリーワード検索
        </SearchPurpleButton>
    :
        <SearchGrayButton
            onClick={() => setSearchValue(0)}
            variant="contained"
        >
            フリーワード検索
        </SearchGrayButton>

    return (
        <React.Fragment>
            {button}
        </React.Fragment>
    );
};

export default freewordButton;
