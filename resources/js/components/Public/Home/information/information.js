import React, {useState} from 'react';
import Create from './create';
import Infos from './infos';

function Information(props) {
    const [infoChanging, setInfoChanging] = useState(false);
    
    let create_btn;
    if (props.is_admin) {
        create_btn=(
            <Create
                setInfoChanging={ setInfoChanging }
            />
        );
    }
    
    return (
        <div>
            { create_btn }
            
            <Infos
                infoChanging={ infoChanging }
                is_admin={ props.is_admin }
            />
        </div>
    );
}

export default Information;