import React, {useState, useEffect} from 'react';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';

function Icon(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const logout = () => {
        document.getElementById('logout-form').submit();
    };
    
    return (
        <div>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={ handleMenu }
                color="inherit"
            >
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ display: "inline-block" }}
                >
                    { props.user_name }
                </Typography>
                
                <AccountCircle />
            </IconButton>
            
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
                <MenuItem onClick={handleClose}>
                    <a class="dropdown-item" onClick={ logout }>Logout</a>
                </MenuItem>
                
                <MenuItem onClick={handleClose}>
                    <a className="dropdown-item" href="/history">質問閲覧履歴</a>
                </MenuItem>
            </Menu>
        </div>
    );
}

export default Icon;