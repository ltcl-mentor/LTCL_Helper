import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import Card from '@mui/material/Card';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import Content from '../../Layout/side-menu/content';
import Clendar from './calendar/calendar';
import Weather from './weather';

function Home() {
    
    return (
        <div className="home-items">
            <Card sx={{ width: 300 }}>
                <Content />
            </Card>
            
            <Card sx={{ marginLeft: "1%", width: "45%" }}>
                
                <Typography 
                    variant="h5"
                    component="div"
                    sx={{ 
                        borderBottom: "1px solid",
                        paddingTop: 3,
                        marginLeft: "5%",
                        width: "90%",
                    }}
                >
                    お知らせ
                </Typography>
                
                <List
                    sx={{
                        width: '80%',
                        bgcolor: 'background.paper',
                        position: 'relative',
                        overflow: 'auto',
                        maxHeight: 300,
                        paddingLeft: "10%",
                        '& ul': { padding: 0 },
                    }}
                    subheader={<li />}
                >
                    {["2021/9/25", "2021/9/26", "2021/9/27"].map((sectionId) => (
                        <li key={ sectionId }>
                            <ul>
                                <ListSubheader>{ sectionId }</ListSubheader>
                                {[0, 1, 2].map((item) => (
                                    <ListItem key={`${sectionId}-${item}`}>
                                        <ListItemText primary={`news ${item}`} />
                                    </ListItem>
                                ))}
                            </ul>
                        </li>
                    ))}
                </List>
                
                <Typography
                    variant="h5"
                    component="div"
                    sx={{
                        borderBottom: "1px solid",
                        paddingTop: 4,
                        marginLeft: "5%",
                        width: "90%",
                    }}
                >
                    校舎情報
                </Typography>
                
                <Clendar />
            
            </Card>
            
            <Card sx={{ width: "25%", marginLeft: "1%" }}>
                <Weather />
            </Card>
        </div>
    );
}

export default Home;

if (document.getElementById('Home')) {
    ReactDOM.render(<Home />, document.getElementById('Home'));
}