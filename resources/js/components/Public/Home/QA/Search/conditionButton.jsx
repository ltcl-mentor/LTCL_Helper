import React from "react";
import { SearchPurpleButton, SearchGrayButton } from "@/Styles/Public/Home/QA/Search/searchArea";

/**
 * 絞り込み検索ボタン
 */
const conditionButton = ({ searchValue, setSearchValue }) => {
    const button = searchValue == 0 ?
        <SearchGrayButton
            onClick={() => setSearchValue(1)}
            variant="contained"
        >
            絞り込み検索
        </SearchGrayButton>
    :
        <SearchPurpleButton
            onClick={() => setSearchValue(1)}
            variant="contained"
        >
            絞り込み検索
        </SearchPurpleButton>

    return (
        <React.Fragment>
            {button}
        </React.Fragment>
    );
};

export default conditionButton;
