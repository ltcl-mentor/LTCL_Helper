import React, {useState, useEffect} from 'react';
import axios from "axios";
import Card from '@mui/material/Card';
import Typography from '@material-ui/core/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function Weather() {
    const [weather, setWeather] = useState([]);
    
    useEffect(() => {
        axios
            .get(`/react/weather`)
            .then(response => {
                setWeather(response.data);
            }).catch(error => {
                console.log(error);
            });
    },[]);
    
    let weather_data;
    if(weather.current){
        weather_data = (
            <div>
                <Typography align="center" variant="h5" component="div" >渋谷の天気情報</Typography>
                
                <Typography align="center" variant="h6" component="div" >今の天気</Typography>
                <div>{ weather.current.main }</div>
                <Typography align="center" variant="h7" component="div" >気温：{ weather.current.temp }℃</Typography>
                
                <div>平均気温：{ weather.today.temp_ave }℃</div>
                <div>最高気温：{ weather.today.temp_max }℃</div>
                <div>最低気温：{ weather.today.temp_min }℃</div>
                
                <Typography align="center" variant="h6" component="div" >今後の天気</Typography>
                
                <Table sx={{ width: "100%" }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>時間</TableCell>
                            <TableCell align="right">気温</TableCell>
                            <TableCell align="right">天気</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { weather.hourly.map((hourly_data) => (
                            <TableRow
                                key={hourly_data.main}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{ hourly_data.time }</TableCell>
                                <TableCell align="right">{ hourly_data.temp }℃</TableCell>
                                <TableCell align="right">{ hourly_data.main }</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
    
    return (
        <div>
            { weather_data }
        </div>
    );
}

export default Weather;