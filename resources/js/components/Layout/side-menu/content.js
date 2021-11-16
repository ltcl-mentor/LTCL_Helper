import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Search from '@material-ui/icons/Search';
import Description from '@material-ui/icons/Description';
import PostAdd from '@material-ui/icons/PostAdd';
import ContactPhone from '@material-ui/icons/ContactPhone'; 
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

function Content(props) {
    const [isLinkClicked, setIsLinkClicked] = useState(false);
    
    const searchMenu = [
        {"menu": "フリーワード検索", "url": "/search/freeword"},
        {"menu": "絞り込み検索", "url": "/search/condition"}
    ];
    
    const itemMenu = [
        {"menu": "質問一覧", "url": "/public/questions/index"},
        {"menu": "関連記事一覧", "url": "/public/documents/index"}
    ];
    
    const formMenu = [
        {"menu": "質問投稿", "url": "/public/questions/create"},
        {"menu": "お問い合わせ", "url": "/contact"}
    ];
    
    let admin_menu;
    if (props.is_admin) {
        admin_menu = (
            <div>
                <Divider />
                
                <Typography 
                    variant="h6"
                    component="div"
                    sx={{ 
                        flexGrow: 1,
                        color: "gray",
                        padding: 2,
                    }}
                    align="center"
                >
                    管理者用
                </Typography>
                
                <List>
                    <Link to="/mentor/top" onClick={ () => setIsLinkClicked(true) }>
                        <ListItem button key="管理ページ">
                            <ListItemIcon sx={{ paddingLeft: 4 }}>
                                <SupervisorAccountIcon />
                            </ListItemIcon>
                            
                            <ListItemText 
                                primary="管理ページへ"
                                sx={{ paddingLeft: 2 }}
                            />
                        </ListItem>
                    </Link>
                </List>
            </div>
        );
    }
    
    return (
        <Box
            sx={{ width: 250 }}
            role="presentation"
        >
            <Typography 
                variant="h5"
                component="div"
                sx={{ 
                    flexGrow: 1,
                    paddingTop: 2,
                    color: "gray",
                }}
                align="center"
            >
                詳細メニュー
            </Typography>
            
            <Typography 
                variant="h6"
                component="div"
                sx={{ 
                    flexGrow: 1,
                    color: "gray",
                    padding: 2,
                }}
                align="center"
            >
                検索機能
            </Typography>
            
            <List>
                { searchMenu.map((menu) => (
                    <Link to={ menu.url } onClick={ () => setIsLinkClicked(true) }>
                        <ListItem button key={ menu.menu }>
                            <ListItemIcon sx={{ paddingLeft: 4 }}>
                                <Search />
                            </ListItemIcon>
                            <ListItemText primary={ menu.menu } sx={{ paddingLeft: 2 }}/>
                        </ListItem>
                    </Link>
                ))}
            </List>
            
            <Divider />
            
            <Typography 
                variant="h6"
                component="div"
                sx={{ 
                    flexGrow: 1,
                    color: "gray",
                    padding: 2,
                }}
                align="center"
            >
                資料
            </Typography>
            
            <List>
                { itemMenu.map((menu) => (
                    <Link to={ menu.url } onClick={ () => setIsLinkClicked(true) }>
                        <ListItem button key={ menu.menu }>
                            <ListItemIcon sx={{ paddingLeft: 4 }}>
                               <Description />
                            </ListItemIcon>
                            <ListItemText primary={ menu.menu } sx={{ paddingLeft: 2 }}/>
                        </ListItem>
                    </Link>
                ))}
            </List>
            
            <Divider />
            
            <Typography 
                variant="h6"
                component="div"
                sx={{ 
                    flexGrow: 1,
                    color: "gray",
                    padding: 2,
                }}
                align="center"
            >
                問い合わせ関連
            </Typography>
            <List>
                { formMenu.map((menu) => (
                    <Link to={ menu.url } onClick={ () => setIsLinkClicked(true) }>
                        <ListItem button key={ menu.menu }>
                            <ListItemIcon sx={{ paddingLeft: 4 }}>
                                { menu === "質問投稿" ? <PostAdd /> : <ContactPhone /> }
                            </ListItemIcon>
                            <ListItemText primary={ menu.menu } sx={{ paddingLeft: 2 }}/>
                        </ListItem>
                    </Link>
                ))}
            </List>
            
            { admin_menu }
            { props.isMenu ? props.setIsLinkClicked(isLinkClicked) : '' }
        </Box>
    );
}

export default Content; 