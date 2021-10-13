import React, {useState} from 'react';
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
import Link from '@mui/material/Link';

function Content(props) {
    const searchMenu = [
        {"menu": "フリーワード検索", "url": "/search/freeword"},
        {"menu": "絞り込み検索", "url": "/search/condition"}
    ];
    const itemMenu = [
        {"menu": "質問一覧", "url": "/questions/index/public"},
        {"menu": "関連記事一覧", "url": "/documents/index/public"}
    ];
    const formMenu = [
        {"menu": "質問投稿", "url": "/questions/create/public"},
        {"menu": "お問い合わせ", "url": "/contact/create"}
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
                    <Link href="/mentor" underline="none">
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
                    <Link href={ menu.url } underline="none">
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
                    <Link href={ menu.url } underline="none">
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
                    <Link href={ menu.url } underline="none">
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
        </Box>
    );
}

export default Content; 