import React from "react";
import useMedia from "use-media";
import CurriculumButton from "./curriculumButton";
import CurriculumNumber from "./form/curriculumNumber";
import ProjectButton from "./projectButton";
import Topic from "./form/topicForm";
import { Buttons, Heading, Warning } from "@/Styles/Public/Home/QA/Search/condition/condition";
import BreakingPoint from "@/Styles/BreakingPoint";

/**
 * 絞り込み検索の選択部分
 */
const select = ({ select, handleInput, handleCategory, keywordPart, categoryPart }) => {
    const isWide = useMedia({ minWidth: `${BreakingPoint}px` });
    return (
        <>
            {/* カテゴリー */}
            {categoryPart}
            <Buttons direction="row">
                <CurriculumButton category={select.category} handleCategory={handleCategory} />
                <ProjectButton category={select.category} handleCategory={handleCategory} />
            </Buttons>

            {/* トピック */}
            <Heading>
                2. トピック
                {isWide && <Warning>以下から1つを選択してください</Warning>}
            </Heading>
            {!isWide && <Warning>以下から1つを選択してください</Warning>}
            <Topic select={select} handleTopic={handleInput} />

            {/* カリキュラム番号 */}
            <Heading>
                3. カリキュラム番号
                {isWide && <Warning>※ 任意です</Warning>}
            </Heading>
            {!isWide && <Warning>※ 任意です</Warning>}
            <CurriculumNumber select={select} handleCurriculum={handleInput} />

            {/* カリキュラム番号 */}
            <Heading>
                4. キーワード入力
                {isWide && <Warning>※ 任意です</Warning>}
            </Heading>
            {!isWide && <Warning>※ 任意です</Warning>}

            {keywordPart}
        </>
    );
};

export default select;
