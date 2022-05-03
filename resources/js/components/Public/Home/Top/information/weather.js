import React, {useState, useEffect} from 'react';
import axios from "axios";

import Typography from '@material-ui/core/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// 各パーツのスタイル設定
const styleWeatherPosition = { width: '200px' };
const styleHeading = { mt: 1 };
const styleTableRow = { '&:last-child td, &:last-child th': { border: 0 } };
const styleWeatherSize = {
    height: '150px',
    width: '150px'
};
const styleWeatherInfos = {
    mb: 1,
    fontSize: 20
};
const styleWeatherInfosPosition = { 
    mt: 3, 
    mb: 3 
};
const styleAccordionTable = {
    width: "90%", 
    ml: "5%"
};

/**
 * 
 * 天気表示
 */
const weather = (props) => {
    const [weather, setWeather] = useState([]);
    const weatherImages = {
        "くもり": "images/clouds.jpg",
        "快晴": "images/clear.jpg",
        "雪": "images/snow.jpg",
        "雨": "images/rain.jpg",
        "霧": "images/drizzle.jpg",
        "霧雨": "images/drizzle.jpg",
        "雷雨": "images/thunderstorm.jpg",
        "異常気象": "images/atmosphere.jpg",
    };
    const [expanded, setExpanded] = useState(false);
    
    // 画面描画時に実行
    useEffect(() => {
        // 天気情報取得
        axios
            .get(`/react/weather`)
            .then(response => {
                setWeather(response.data);
            }).catch(error => {
                console.log(error);
            });
    }, []);

    // アコーディオンの開閉
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    let weatherData;
    if (weather.current) {
        weatherData = (
            <div>
                {props.isWide && 
                    <Typography align="center" variant="h6" component="div" sx={styleHeading}>
                        渋谷の天気情報
                    </Typography>
                }
                
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item sx={styleWeatherPosition}>
                        <img src={ weatherImages[weather.current.main] } style={styleWeatherSize}/>
                    </Grid>
                    
                    <Grid item sx={styleWeatherInfosPosition}>
                        <Typography align="center" component="div" sx={styleWeatherInfos}>
                            気温：{ weather.current.temp }℃
                        </Typography>
                        <Typography align="center" component="div" sx={styleWeatherInfos}>
                            平均気温：{ weather.today.temp_ave }℃
                        </Typography>
                        <Typography align="center" component="div" sx={styleWeatherInfos}>
                            最高気温：{ weather.today.temp_max }℃
                        </Typography>
                        <Typography align="center" component="div" sx={styleWeatherInfos}>
                            最低気温：{ weather.today.temp_min }℃
                        </Typography>
                    </Grid>
                </Grid>
                
                <Accordion expanded={expanded === 1} onChange={handleChange(1)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography align="center" variant="h6" component="div">
                            今後8時間の天気
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Table sx={styleAccordionTable} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>時間</TableCell>
                                    <TableCell align="right">気温</TableCell>
                                    <TableCell align="right">天気</TableCell>
                                </TableRow>
                            </TableHead>
                            
                            <TableBody>
                                {weather.hourly.map((hourlyData, index) => (
                                    <TableRow
                                        key={ `${index}-${hourlyData.temp}` }
                                        sx={styleTableRow}
                                    >
                                        <TableCell component="th" scope="row">{ hourlyData.time }</TableCell>
                                        <TableCell align="right">{ hourlyData.temp }℃</TableCell>
                                        <TableCell align="right">{ hourlyData.main }</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </AccordionDetails>
                </Accordion>
            </div>
        );
    }
    
    return (
        <React.Fragment>
            { weatherData }
        </React.Fragment>
    );
};

export default weather;