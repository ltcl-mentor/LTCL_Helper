import React from "react";
import { CustomPurpleButton, CustomWhiteButton } from "@/Styles/Public/Home/QA/Search/condition/condition";

/**
 * 絞り込み検索の成果物ボタン
 */
const projectButton = ({ category, handleCategory }) => {
    const button = category == 0 ?
        <CustomWhiteButton onClick={() => handleCategory(1)}>
            成果物
        </CustomWhiteButton>
    :
        <CustomPurpleButton onClick={() => handleCategory(1)}>
            成果物
        </CustomPurpleButton>

    return (
        <React.Fragment>
            {button}
        </React.Fragment>
    );
};

export default projectButton;
