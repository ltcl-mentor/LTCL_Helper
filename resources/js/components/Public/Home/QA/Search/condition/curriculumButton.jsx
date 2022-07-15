import React from "react";
import { CustomPurpleButton, CustomWhiteButton } from "@/Styles/Public/Home/QA/Search/condition/condition";

/**
 * 絞り込み検索のカリキュラムボタン
 */
const curriculumButton = ({ category, handleCategory }) => {
    const button = category == 0 ?
        <CustomPurpleButton onClick={() => handleCategory(0)}>
            カリキュラム
        </CustomPurpleButton>
    :
        <CustomWhiteButton onClick={() => handleCategory(0)}>
            カリキュラム
        </CustomWhiteButton>

    return (
        <React.Fragment>
            {button}
        </React.Fragment>
    );
};

export default curriculumButton;
