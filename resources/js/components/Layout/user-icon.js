import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';

import Button from '@mui/material/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';

/**
 * ユーザアイコン
 */
const Icon = (props) => {
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const mypage = () => {
        setAnchorEl(null);
        history.push('/my_page');
    };
    
    const historyIndex = () => {
        setAnchorEl(null);
        history.push('/history');
    };
    
    const logout = () => {
        document.getElementById('logout-form').submit();
    };
    
    return (
        <div>
            <Button
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={ handleMenu }
                color="inherit"
                sx={{ mr: 1 }}
            >
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ display: "inline-block" }}
                >
                    { props.user.name }
                </Typography>
            </Button>
            
            <Menu
                id="menu-appbar"
                anchorEl={ anchorEl }
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={ Boolean(anchorEl) }
                onClose={ handleClose }
            >
                <MenuItem onClick={() => mypage()}>
                    マイページ
                </MenuItem>
                
                <MenuItem onClick={() => historyIndex()}>
                    質問閲覧履歴
                </MenuItem>
                
                <MenuItem onClick={handleClose}>
                    <a onClick={ logout }>ログアウト</a>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default Icon;