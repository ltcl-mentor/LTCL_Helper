import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import '../../../../../public/css/Public/top.css';

import Typography from '@material-ui/core/Typography';

import Alert from '../../Alert';

import {LoginUser} from '../../Route.js';
import TabPanel from './tabPanel';

const style = {
    width: '100%',
    pr: 0,
    pl: 0,
};


/**
 * トップ画面のメインコンポーネント
 */
const Home = () => {
    const parameter = useLocation();
    
    // ログインユーザー情報取得
    const user = useContext(LoginUser);
    
    return (
        <div className={style}>
        
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
            
            <Typography component="div" align="center" sx={{ fontWeight: 'bold', fontSize: 20, pt: 1, pb: 1 }}>
                レバテックカレッジ
            </Typography>
        </div>
    );
};

export default Home;