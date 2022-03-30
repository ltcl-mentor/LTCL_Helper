import React, {useState} from 'react';
import Create from './create';
import Infos from './infos';
import Typography from '@material-ui/core/Typography';

/**
 * お知らせ
 */
function Information(props) {
    const [infoChanging, setInfoChanging] = useState(false);
    
    let create_btn;
    if (props.is_admin) {
        create_btn=(
            <Create
                setInfoChanging={ setInfoChanging }
                events={ props.events }
            />
        );
    }
    
    return (
        <div>
            <Typography 
                variant="h6"
                component="div"
                align="center"
                sx={{
                    paddingTop: 3,
                }}
            >
                現在の質問解決率：<font color="green">{ props.achievement }</font>%
            </Typography>
            
            { create_btn }
            
            <Infos
                infoChanging={ infoChanging }
                is_admin={ props.is_admin }
            />
        </div>
    );
}

export default Information;