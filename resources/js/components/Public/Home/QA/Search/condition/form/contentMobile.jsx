import React from 'react';
import Keyword from './keyword';
import { Heading, WarningCategoryMobile, Reset, SearchButton } from "@/Styles/Public/Home/QA/Search/condition/form/content";

export const CategoryMobile = ({ handleCanceling }) => {
    return (
        <React.Fragment>
            <Reset onClick={() => handleCanceling()}>
                検索条件をリセット
            </Reset>
            <Heading>1. カテゴリー</Heading>
            <WarningCategoryMobile>
                どちらか1つを選択してください
            </WarningCategoryMobile>
        </React.Fragment>
    );
};

export const KeywordMobile = ({ select, isClicked, handleKeyword, handleIsClicked }) => {
    return (
        <React.Fragment>
            <Keyword handleKeyword={handleKeyword} />

            {((((select.topic === 0)
                || (select.topic >= 1 && select.topic <= 13)) && select.category === 0)
                || (select.topic >= 14 && select.category === 1)) &&
                <SearchButton
                    onClick={() => handleIsClicked()}
                    variant="outlined"
                    disabled={isClicked}
                >
                    検索
                </SearchButton>
            }
        </React.Fragment>
    );
};
