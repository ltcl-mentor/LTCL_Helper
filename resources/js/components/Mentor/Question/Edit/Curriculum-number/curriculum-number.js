import React, {useState, useEffect} from 'react';
import Selects from './select';
import Box from '@mui/material/Box';

/**
 * カリキュラム番号フォーム
 */
function CrriculumNumber(props) {
    const [curriculum_numbers, setCurriculumNumbers] = useState(['1-1-1']);
    
    // カテゴリーとトピックが変更されたら実行
    useEffect(() => {
        // 以下変更箇所
        if (props.category === 0 && props.topic <= 13) {
            setCurriculumNumbers(props.curriculum_numbers[Number(props.category)][Number(props.topic)]);
        } else if (props.category === 1 && props.topic >= 14) {
            if (props.topic == 19) {
                setCurriculumNumbers(props.curriculum_numbers[Number(props.category)][1]);
            } else {
                setCurriculumNumbers(props.curriculum_numbers[Number(props.category)][0]);
            }
        } else {
            setCurriculumNumbers(props.curriculum_numbers[0][0]);
        }
    }, [props.category, props.topic]);
    
    return (
        <div>
            <Box sx={{ textAlign: "center", marginTop: 4 }}>
                <Selects
                    topic={ props.topic }
                    setCurriculumNumber={ props.setCurriculumNumber }
                    curriculum_number={ props.curriculum_number }
                    old_topic={ props.old_topic }
                    old_curriculum_number={ props.old_curriculum_number }
                    curriculum_number_validation_error={ props.curriculum_number_validation_error }
                    items={ curriculum_numbers }
                />
            </Box>
        </div>
    );
}

export default CrriculumNumber;