import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import Card from '@mui/material/Card';
import Typography from '@material-ui/core/Typography';

import Content from '../../Layout/side-menu/content';
import Information from './information/information';
import Clendar from './calendar/calendar';
import Weather from './weather';

function Home() {
    const [user, setUser] = useState([]);
    
    useEffect(() => {
        axios
            .get(`/react/user`)
            .then(response => {
                setUser(response.data);
            }).catch(error => {
                console.log(error);
            });
    },[]);
    
    return (
        <div className="home-items">
            <Card sx={{ width: 300 }}>
                <Content is_admin={ user.is_admin }/>
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
                
                <Information  is_admin={ user.is_admin }/>
                
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