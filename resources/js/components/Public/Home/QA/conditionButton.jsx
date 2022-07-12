import React from "react";
import { PurpleButton, GrayButton } from "@/Styles/Shared/Button";

/**
 * 絞り込み検索ボタン
 */
const conditionButton = ({ searchValue, setSearchValue }) => {
    const button = searchValue == 0 ?
        <GrayButton
            onClick={() => setSearchValue(1)}
            variant="contained"
        >
            絞り込み検索
        </GrayButton>
    :
        <PurpleButton
            onClick={() => setSearchValue(1)}
            variant="contained"
        >
            絞り込み検索
        </PurpleButton>

    return (
        <React.Fragment>
            {button}
        </React.Fragment>
    );
};

export default conditionButton;
