import React from "react";
import useMedia from "use-media";
import { CategoryPC, KeywordPC } from "./form/contentPC";
import { CategoryMobile, KeywordMobile } from "./form/contentMobile";
import Result from "./result/result";
import { StyleDiv } from "@/Styles/Public/Home/QA/Search/condition/condition";
import BreakingPoint from "@/Styles/BreakingPoint";
import { useCondition } from "@/Logics/Home/QA/Search/condition/condition";
import Select from "./select";

/**
 * 絞り込み検索
 */
const condition = () => {
    const isWide = useMedia({ minWidth: `${BreakingPoint}px` });
    const [{ select, isClicked }, { handleCanceling, handleIsClicked, handleInput, handleCategory }] = useCondition();

    const categoryPart = isWide ? <CategoryPC handleCanceling={handleCanceling} /> : <CategoryMobile handleCanceling={handleCanceling} />;

    const keywordPart = isWide ?
        <KeywordPC select={select} isClicked={isClicked} handleIsClicked={handleIsClicked} handleKeyword={handleInput} />
    :
        <KeywordMobile select={select} isClicked={isClicked} handleIsClicked={handleIsClicked} handleKeyword={handleInput} />

    return (
        <StyleDiv>

            {/* 選択画面 */}
            <Select
                select={select}
                handleInput={handleInput}
                handleCategory={handleCategory}
                keywordPart={keywordPart}
                categoryPart={categoryPart}
            />

            {/* 検索結果 */}
            {isClicked && <Result select={select} />}
        </StyleDiv>
    );
};

export default condition;
