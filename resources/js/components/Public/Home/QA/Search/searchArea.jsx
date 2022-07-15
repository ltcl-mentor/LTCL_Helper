import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Freeword from "./freeword/freeword";
import Condition from "./condition/condition";
import FreewordButton from "./freewordButton";
import ConditionButton from "./conditionButton";
import { StyleCard } from "@/Styles/Public/Home/QA/Search/searchArea";

/**
 * 検索エリア
 */
const searchArea = () => {
    const [searchValue, setSearchValue] = useState(1);

    const search = searchValue == 0 ? <Freeword /> : <Condition />;

    return (
        <React.Fragment>
            <StyleCard variant="outlined">
                {/* 検索タブ */}
                <Stack direction="row">
                    <FreewordButton searchValue={searchValue} setSearchValue={setSearchValue} />
                    <ConditionButton searchValue={searchValue} setSearchValue={setSearchValue} />
                </Stack>

                {/* 検索内容 */}
                {search}
            </StyleCard>
        </React.Fragment>
    );
};

export default searchArea;
