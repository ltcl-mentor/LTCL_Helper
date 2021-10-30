import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@mui/material/Link';
import User from './user-icon';
import Menu from './side-menu/menu'; 

function Bar() {
    const [user, setUser] = useState([]);
    
    useEffect(() => {
        axios
            .get(`/react/user`)
            .then(response => {
                setUser(response.data);
            }).catch(error => {
                console.log(error);
            });
    }, []);
    
    let user_icon;
    if (user.id) {
        user_icon = (
            <User 
                user_name={ user.name }
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

// if (document.getElementById('Bar')) {
//     ReactDOM.render(<Bar />, document.getElementById('Bar'));
// }