import React  from 'react';
import { Heading } from '@/Styles/Public/Home/Top/Information/weather';
import Temperature from './temperature';
import HourlyWeather from './hourlyWeather';
import { useWeather } from '@/Logics/Home/Top/Information/weather';

/**
 * 天気表示
 */
const weather = ({ isWide }) => {
    const [{ weatherImages, weather, expanded }, handleChange] = useWeather();

    return (
        <React.Fragment>
            {weather.current &&
                <div>
                    {isWide && <Heading>渋谷の天気情報</Heading>}

                    <Temperature weatherImage={weatherImages[weather.current.main]} weather={weather} />

                    <HourlyWeather expanded={expanded} weather={weather} handleChange={handleChange} />
                </div>
            }
        </React.Fragment>
    );
};

export default weather;
