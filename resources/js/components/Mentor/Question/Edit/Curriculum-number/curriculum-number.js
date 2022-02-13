import React from 'react';
import Selects from './select';
import Box from '@mui/material/Box';

/**
 * カリキュラム番号フォーム
 */
function CrriculumNumber(props) {
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
                    items={ props.curriculum_numbers }
                />
            </Box>
        </div>
    );
}

export default CrriculumNumber;