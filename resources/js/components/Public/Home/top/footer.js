import React from 'react';
import { useHistory } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Typography from '@material-ui/core/Typography';

import Location from './location';

const style = {
    backgroundColor: '#b39ddb',
    paddingTop: '16px',
    fontSize: '1.25rem',
};


/**
 * topフッター部分
 */
const Footer = (props) => {
    const history = useHistory();
    
    const contact = () => {
        history.push('/contact');
    };
    
    return (
        <div style={ style }>
            <Grid columns={16} container sx={{ width: '80%', ml: 'auto', mr: 'auto' }}>
                <Grid xs={8} item>
                    <Typography component="div" sx={{ color: 'white', fontWeight: 'bold', fontSize: 26, pl: 2 }}>
                        LTCL Helper
                    </Typography>
                    <Typography 
                        onClick={() => contact()}
                        component="div"
                        sx={{ 
                            color: 'black',
                            fontWeight: 'bold',
                            fontSize: 20,
                            pl: 2,
                            pt: 3,
                            "&:hover": {
                                cursor: "pointer",
                                color: '#771AF8',
                            }
                        }}>
                        お問い合わせ
                    </Typography>
                </Grid>
                <Grid xs={8} item>
                    <Location
                        map_key={ props.map_key }
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default Footer;