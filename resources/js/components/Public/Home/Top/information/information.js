import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@material-ui/core/Typography';

import Create from './create';
import Infos from './infos';
import Weather from '../weather';


/**
 * お知らせ
 */
const Information = (props) => {
    const [infoChanging, setInfoChanging] = useState(false);
    
    let create_btn;
    if (props.is_admin) {
        create_btn = (
            <Create
                setInfoChanging={ setInfoChanging }
                events={ props.events }
            />
        );
    }
    
    return (
        <div className="information">
            <Grid columns={16} container sx={{ width: '80%', ml: 'auto', mr: 'auto' }}>
                <Grid xs={8} item>
                    <Typography component="div" sx={{ color: '#771AF8', fontWeight: 'bold', fontSize: 24, pl: 2 }}>
                        お知らせ
                        { create_btn }
                    </Typography>
                    <Infos
                        infoChanging={ infoChanging }
                        is_admin={ props.is_admin }
                    />
                </Grid>
                <Grid xs={8} item>
                    <Weather />
                </Grid>
            </Grid>
        </div>
    );
};

export default Information;