import React, {useContext} from 'react';
import { useHistory, Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Button from '@mui/material/Button';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Links from '@mui/material/Link';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

import User from './user-icon';
import Menu from './side-menu/menu';

import {LoginUser} from '../Route.js';

const QuestionTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: 'white',
        color: 'rgba(0, 0, 0, 0.87)',
        width: 85,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}));


/**
 * メニューバーのメインコンポーネント
 */
const Bar = () => {
    const history = useHistory();
    
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
                <Links className="navbar-brand" href="/login" underline="none">Login</Links>
            </div>
        );
    }
    
    // 検索画面へ
    const toSearch = () => {
        history.push('/?page=qa');
    };

    return (
        <Box
            sx={{ 
                flexGrow: 1,
                paddingBottom: 2,
            }}
        >
            <AppBar position="static" color="default" sx={{ boxShadow: 'none', backgroundColor: 'white' }}>
                <Toolbar>
                    {/*<Menu 
                        is_admin={ user.is_admin }
                    />*/}
                    
                    <Typography component="div" sx={{ flexGrow: 1 }}>
                        <Links sx={{ color: '#808080', fontSize: '25px', '&:hover': { color: '#771AF8' } }} href="/" underline="none">
                            LTCL Helper
                        </Links>
                    </Typography>
                    
                    { user_icon }
                    <Button 
                        variant="contained"
                        sx={{ 
                            backgroundColor: '#771AF8',
                            borderRadius: 0,
                            padding: '6px 20px',
                            boxShadow: 'none',
                            '&:hover': { 
                                backgroundColor: '#6633CC',
                                boxShadow: 'none',
                            }
                        }}
                        onClick={() => toSearch()}
                    >
                        検索する
                    </Button>
                    <QuestionTooltip
                        title={
                            <Typography color="inherit">質問する</Typography>
                        }
                    >
                        <IconButton sx={{ '&:hover': { color: '#771AF8' } }} size="large" component={Link} to={'/public/questions/create'}>
                            <AddIcon fontSize="inherit" />
                        </IconButton>
                    </QuestionTooltip>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Bar;