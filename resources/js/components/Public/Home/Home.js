import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import '../../../../../public/css/Public/top.css';

import Typography from '@material-ui/core/Typography';

import Alert from '../../Alert';

import { LoginUser } from '../../Route.js';
import TabPanel from './tabPanel';

const styleHome = {
    width: '100%',
    paddingRight: 0,
    paddingLeft: 0,
};

const styleFooterText = { 
    fontWeight: 'bold',
    fontSize: 20,
    pt: 1,
    pb: 1
};


/**
 * トップ画面のメインコンポーネント
 */
const Home = () => {
    const parameter = useLocation();
    const user = useContext(LoginUser);
    
    return (
        <div className={styleHome}>
        
            {/* アラート */}
            <Alert
                type={ parameter.state && parameter.state.type }
                status={ parameter.state && parameter.state.status }
                info={ parameter.state && parameter.state.info }
            />
            {user.reply_count > 0 &&
                <Alert
                    type="info"
                    status="question"
                />
            }
            
            {/* タブ */}
            <TabPanel is_admin={user.is_admin} />
            
            <Typography component="div" align="center" sx={styleFooterText}>
                レバテックカレッジ
            </Typography>
        </div>
    );
};

export default Home;