import React from 'react';
import { GridTemperature, Temperature, Weather, WeatherImg, WeatherInfo } from '@/Styles/Public/Home/Top/Information/weather';

/**
 * 気温
 */
const temperature = ({ weatherImage, weather }) => {
    return (
        <GridTemperature container>
            <Weather item>
                <WeatherImg src={weatherImage}/>
            </Weather>

            <WeatherInfo item>
                <Temperature>気温：{ weather.current.temp }℃</Temperature>
                <Temperature>平均気温：{ weather.today.temp_ave }℃</Temperature>
                <Temperature>最高気温：{ weather.today.temp_max }℃</Temperature>
                <Temperature>最低気温：{ weather.today.temp_min }℃</Temperature>
            </WeatherInfo>
        </GridTemperature>
    );
};

export default temperature;
