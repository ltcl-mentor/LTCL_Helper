import React from 'react';
import CurriculumNamber from './curriculum-number';
import Keyword from './keyword';

function Addition(props) {
        
    return(
        <div className="container">
            <CurriculumNamber 
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
