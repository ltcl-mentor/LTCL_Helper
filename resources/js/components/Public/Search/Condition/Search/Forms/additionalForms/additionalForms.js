import React, {useEffect} from 'react';
import CurriculumNumber from './curriculum-number/curriculum-number';
import Keyword from './keyword';

function Addition(props) {
    
    useEffect(() => {
        props.setIsCanceling(false);
    }, []);
    
    return(
        <div className="container">
            <CurriculumNumber 
                category={ props.category }
                topic={ props.topic }
                setCurriculumNumber={ props.setCurriculumNumber }
                isCanceling={ props.isCanceling }
            />
            <Keyword
                setKeyword={ props.setKeyword }
                isCanceling={ props.isCanceling }
            />
        </div>
    );
}

export default Addition;
