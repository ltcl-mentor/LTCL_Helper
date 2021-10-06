import React from 'react';
import Create from './create';
import Infos from './infos';

function Information(props) {
    const csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
    
    let create_btn;
    if(props.is_admin){
        create_btn=(
            <Create 
                csrf_token={ csrf_token }
            />
        );
    }
    
    return (
        <div>
            { create_btn }
            
            <Infos 
                csrf_token={ csrf_token }
                is_admin={ props.is_admin }
            />
        </div>
    );
}

export default Information;