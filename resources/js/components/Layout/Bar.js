import React, {useContext} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@mui/material/Link';
import User from './user-icon';
import Menu from './side-menu/menu'; 

import {LoginUser} from '../Route.js';

/**
 * メニューバーのメインコンポーネント
 */
function Bar() {
    
    // ログインユーザー情報取得
    const user = useContext(LoginUser);
    
    let user_icon;
    if (user.id) {
        user_icon = (
            <User 
                user={ user }
            />
        );
    } else {
        user_icon = (
            <div>
                <Link className="navbar-brand" href="/login" underline="none">Login</Link>
            </div>
        );
    }

    return (
        <Box
            sx={{ 
                flexGrow: 1,
                paddingBottom: 2,
            }}
        >
            <AppBar position="static" color="default">
                <Toolbar>
                    <Menu 
                        is_admin={ user.is_admin }
                    />
                    
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link className="navbar-brand" href="/" underline="none">
                            LTCL Helper
                        </Link>
                    </Typography>
                    
                    { user_icon }
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Bar;