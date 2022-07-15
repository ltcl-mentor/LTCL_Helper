import React, { useState, useEffect } from "react";
import { curriculumNumbers } from "@/Components/shared";
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { BoxWidth, CurriculumInput, MaxFormControl } from "@/Styles/Public/Home/QA/Search/condition/form/form";

/**
 * カリキュラム番号
 */
const curriculumNumber = ({ select, handleCurriculum }) => {
    const [curriculumNumber, setCurriculumNumber] = useState(["1-1-1"]);

    // カテゴリーとトピックが変更されたら実行
    useEffect(() => {
        let curriculumNumber = curriculumNumbers[0][0];
        if (select.category === 0 && select.topic <= 13) {
            curriculumNumber = curriculumNumbers[Number(select.category)][Number(select.topic)];
        } else if (select.category === 1 && select.topic >= 14) {
            if (select.topic == 19) {
                curriculumNumber = curriculumNumbers[Number(select.category)][1];
            } else {
                curriculumNumber = curriculumNumbers[Number(select.category)][0];
            }
        }
        setCurriculumNumber(curriculumNumber);
    }, [select.category, select.topic]);

    const MenuItems = curriculumNumber.map(curriculum => {
        return <MenuItem value={curriculum} key={curriculum}>{curriculum}</MenuItem>;
    });

    return (
        <CurriculumInput>
            <BoxWidth>
                <MaxFormControl>
                    <TextField
                        label="カリキュラム番号"
                        select
                        value={select.curriculumNumber}
                        name="curriculumNumber"
                        onChange={event => handleCurriculum(event)}
                    >
                        {MenuItems}
                    </TextField>
                </MaxFormControl>
            </BoxWidth>
        </CurriculumInput>
    );
};

export default curriculumNumber;
