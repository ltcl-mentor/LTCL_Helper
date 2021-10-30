import React from 'react';
import Selects from './select';

function CrriculumNumber(props) {
    
    let validation_message;
    if (props.curriculum_number_validation_error === 1) {
        validation_message = (<p className="errorMassage">カリキュラム番号を正しく選択してください。</p>);
    } else {
        validation_message = ('');
    }
     
    return (
        <div className="content">
            <h2 className="title">該当カリキュラムの選択</h2>
            <div className="content">
                { validation_message }
                <Selects
                    setCurriculumNumber={ props.setCurriculumNumber }
                    curriculum_number={ props.curriculum_number }
                    old_curriculum_number={ props.old_curriculum_number }
                    items={ props.curriculum_numbers }
                />
            </div>
        </div>
    );
}

export default CrriculumNumber;