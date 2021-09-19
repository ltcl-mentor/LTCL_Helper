import React from 'react';
import CurriculumNumber from './curriculum-number';
import Keyword from './keyword';

function Addition(props) {
        
    return(
        <div className="container">
            <CurriculumNumber 
                category={ props.category }
                topic={ props.topic }
                setCurriculumNumber={ props.setCurriculumNumber }
            />
            <Keyword
                setKeyword={ props.setKeyword }
            />
        </div>
    );
}

export default Addition;
