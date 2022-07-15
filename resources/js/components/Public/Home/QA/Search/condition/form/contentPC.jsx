import React from 'react';
import Keyword from './keyword';
import { Heading, WarningCategory, Reset, GridItem, StyleGrid, SearchButton } from "@/Styles/Public/Home/QA/Search/condition/form/content";
import { StyleBox } from '@/Styles/Public/Home/QA/Search/condition/condition';

export const CategoryPC = ({ handleCanceling }) => {
    return (
        <React.Fragment>
            <Heading>
                1. カテゴリー
                <WarningCategory>どちらか1つを選択してください</WarningCategory>
            </Heading>
            <Reset onClick={() => handleCanceling()}>
                検索条件をリセット
            </Reset>
        </React.Fragment>
    );
};

export const KeywordPC = ({ select, isClicked, handleKeyword, handleIsClicked }) => {
    return (
        <StyleGrid container>

            {/* キーワード入力欄 */}
            <GridItem width="70%" item>
                <Keyword handleKeyword={handleKeyword} />
            </GridItem>

            {/* カテゴリー選択欄 */}
            <GridItem width="30%" item>
                {((((select.topic === 0)
                    || (select.topic >= 1 && select.topic <= 13)) && select.category === 0)
                    || (select.topic >= 14 && select.category === 1)) &&
                    <StyleBox>
                        <SearchButton
                            onClick={() => handleIsClicked()}
                            variant="outlined"
                            disabled={isClicked}
                        >
                            検索
                        </SearchButton>
                    </StyleBox>
                }
            </GridItem>
        </StyleGrid>
    );
};
