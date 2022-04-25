import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@mui/material/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';

const style = {
    color: '#771AF8'
};

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
    
    // マイページ
    const mypage = () => {
        setAnchorEl(null);
        history.push('/my_page');
    };
    
    // 管理者のマイページ
    const adminMypage = () => {
        setAnchorEl(null);
        history.push('/Admin_my_page');
    };
    
    // 質問閲覧履歴
    const historyIndex = () => {
        setAnchorEl(null);
        history.push('/history');
    };
    
    // 検索画面
    const toSearch = () => {
        setAnchorEl(null);
        history.push('/?page=qa');
    };
    
    const toQuestion = () => {
        setAnchorEl(null);
        history.push('/public/questions/create');
    };
    
    // ログアウト
    const logout = () => {
        document.getElementById('logout-form').submit();
    };
    
    let responsive;
    if (!props.isWide) {
        responsive = (
            <React.Fragment>
                <MenuItem onClick={() => toSearch()}>
                    <ListItemIcon>
                        <SearchIcon />
                    </ListItemIcon>
                    検索する
                </MenuItem>
            
                <MenuItem onClick={() => toQuestion()}>
                    <ListItemIcon>
                        <AddIcon />
                    </ListItemIcon>
                    質問する
                </MenuItem>
            </React.Fragment>
        );
    }
    
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
                {props.user.is_admin ? 
                    <div>
                        <MenuItem onClick={() => adminMypage()}>
                            <ListItemIcon>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            マイページ
                        </MenuItem>
                        
                        {responsive}
                    
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <a style={style} onClick={ logout }>ログアウト</a>
                        </MenuItem>
                    </div>
                :
                    <div>
                        <MenuItem onClick={() => mypage()}>
                            <ListItemIcon>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            マイページ
                        </MenuItem>
                    
                        <MenuItem onClick={() => historyIndex()}>
                            <ListItemIcon>
                                <HistoryIcon />
                            </ListItemIcon>
                            質問閲覧履歴
                        </MenuItem>
                        
                        {responsive}
                    
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <a style={style} onClick={ logout }>ログアウト</a>
                        </MenuItem>
                    </div>
                }
            </Menu>
        </div>
    );
};

export default Icon;