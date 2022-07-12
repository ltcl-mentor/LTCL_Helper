import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";

import Selects from "./selects";

const styleContent = { 
    textAlign: "left", 
    marginTop: 1
};


/**
 * カリキュラム番号
 */
const curriculumNumber = props => {
    const [curriculumNumbers, setCurriculumNumbers] = useState(["1-1-1"]);
    const curriculumNumbersArray = [
        [
            ["1-1-1"],
            ["2-1-1"],
            ["2-1-2"],
            ["2-1-3"],
            ["3-1-1"],
            ["4-1-1", "4-1-2", "4-1-3", "4-1-4"],
            ["5-1-1", "8-1-1", "8-2-1", "8-3-1", "8-4-1", "8-5-1", "8-6-1"],
            ["6-1-1", "6-2-1"],
            ["7-1-1"],
            ["9-1-1"],
            ["9-2-1"],
            ["9-3-1"],
            ["9-4-1"],
            ["その他"]
        ],
        [["成果物"], ["その他"]]
    ];

    // カテゴリーとトピックが変更されたら実行
    useEffect(() => {
        if (props.category === 0 && props.topic <= 13) {
            setCurriculumNumbers(
                curriculumNumbersArray[Number(props.category)][
                    Number(props.topic)
                ]
            );
        } else if (props.category === 1 && props.topic >= 14) {
            if (props.topic == 19) {
                setCurriculumNumbers(
                    curriculumNumbersArray[Number(props.category)][1]
                );
            } else {
                setCurriculumNumbers(
                    curriculumNumbersArray[Number(props.category)][0]
                );
            }
        } else {
            setCurriculumNumbers(curriculumNumbersArray[0][0]);
        }
    }, [props.category, props.topic]);

    return (
        <Box sx={styleContent}>
            <Selects
                setCurriculumNumber={props.setCurriculumNumber}
                curriculumNumbers={curriculumNumbers}
                curriculumNumberValidationError={
                    props.curriculumNumberValidationError
                }
                curriculumNumberValidationMessage={
                    props.curriculumNumberValidationMessage
                }
            />
        </Box>
    );
};

export default curriculumNumber;