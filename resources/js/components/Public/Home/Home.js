import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import axios from "axios";
import Card from '@mui/material/Card';
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import Content from '../../Layout/side-menu/content';
import Information from './information/information';
import Clendar from './calendar/calendar';
import Weather from './weather';

function Home() {
    const parameter = useLocation().search.substr(1).split('=');
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
    
    
    let success_message;
    switch (parameter[0]) {
        case "contact":
            if (parameter[1] === "success") {
                success_message = (
                    <Alert
                        variant="outlined"
                        severity="success"
                        sx={{
                            margin: "0 auto",
                            width: "70%",
                        }}
                    >
                        <AlertTitle>Success</AlertTitle>
                        お問い合わせの送信に成功しました。
                    </Alert>
                );
            }
            break;
        
        case "question":
            if (parameter[1] === "success") {
                success_message = (
                    <Alert
                        variant="outlined"
                        severity="success"
                        sx={{
                            margin: "0 auto",
                            width: "70%",
                        }}
                    >
                        <AlertTitle>Success</AlertTitle>
                        質問の投稿に成功しました。
                    </Alert>
                );
            }
            break;
    }
    
    return (
        <div className="container">
        
            { success_message }
        
            <Box
                sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    marginTop: 3,
                }}
            >
                <Card sx={{ width: "24%" }}>
                    <Content
                        is_admin={ user.is_admin }
                        isMenu={false}
                    />
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
            
                <Card sx={{ width: "29%", marginLeft: "1%" }}>
                    <Weather />
                </Card>
            </Box>
        </div>
    );
}

export default Home;

// if (document.getElementById('Home')) {
//     ReactDOM.render(<Home />, document.getElementById('Home'));
// }