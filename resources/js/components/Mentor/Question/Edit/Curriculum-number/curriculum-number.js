import React from 'react';
import Selects from './select';
import Box from '@mui/material/Box';

function CrriculumNumber(props) {
    
    let validation_message;
    if (props.curriculum_number_validation_error === 1) {
        validation_message = (<p className="errorMassage">カリキュラム番号を正しく選択してください。</p>);
    } else {
        validation_message = ('');
    }
     
    return (
        <div>
            { validation_message }
    
            <Box sx={{ textAlign: "center", marginTop: 4 }}>
                <Selects
                    setCurriculumNumber={ props.setCurriculumNumber }
                    curriculum_number={ props.curriculum_number }
                    old_curriculum_number={ props.old_curriculum_number }
                    items={ props.curriculum_numbers }
                />
            </Box>
        </div>
    );
}

export default CrriculumNumber;