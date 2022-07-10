import React  from 'react';
import useMedia from "use-media";
import { useWeather } from '@/Logics/Home/Top/Information/weather';
import Temperature from './weather/temperature';
import HourlyWeather from './weather/hourlyWeather';
import { Heading } from '@/Styles/Public/Home/Top/Information/weather';
import BreakingPoint from "@/Styles/BreakingPoint";

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

/**
 * 天気表示
 */
const weather = () => {
    const [{ weather, expanded }, handleChange] = useWeather();
    const isWide = useMedia({ minWidth: `${BreakingPoint}px` });

    return (
        <React.Fragment>
            {weather.current &&
                <div>
                    {isWide && <Heading>渋谷の天気情報</Heading>}
                    <Temperature weatherImage={weatherImages[weather.current.main]} weather={weather} />
                    <HourlyWeather
                        expanded={expanded}
                        weather={weather}
                        handleChange={handleChange}
                    />
                </div>
            }
        </React.Fragment>
    );
};

export default weather;
