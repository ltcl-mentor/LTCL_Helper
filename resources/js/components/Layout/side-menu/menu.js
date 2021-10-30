import React, {useState, useEffect} from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';

import Content from './content';

function Menu(props) {
    const [menu, setMenu] = useState(false);
    const [isLinkClicked, setIsLinkClicked] = useState(false);
    
    useEffect(() => {
        if(isLinkClicked) {
            setMenu(false);
        }
    }, [isLinkClicked]);
    
    const toggleDrawer = (isOpen) => (event) => {
        setMenu(isOpen);
    };
    
    console.log(menu);
    
    return(
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
        >
            <React.Fragment>
                <MenuIcon onClick={ toggleDrawer(true) }/>
                
                <Drawer
                    anchor="left"
                    open={ menu }
                    onClose={ toggleDrawer(false) }
                >
                    <Content 
                        is_admin={ props.is_admin }
                        isMenu={true}
                        setIsLinkClicked={ setIsLinkClicked }
                    />
                </Drawer>
            </React.Fragment>
        </IconButton>
    );
}

export default Menu;