<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Weather extends Model
{
    public static $weather_types = [
        'Clouds' => 'くもり',
        'Clear' => '快晴',
        'Snow' => '雪',
        'Rain' => '雨',
        'Mist' => '霧',
        'Drizzle' => '霧雨',
        'Thunderstorm' => '雷雨',
        'Atmosphere' => '異常気象'
    ];
    
    /**
     * 表示に必要な天気情報を取得
     */
    public static function getWeatherData()
    {
        $weather_datas = [];
        
        $weather = self::getWeatherApiData();
        
        $weather_datas['current'] = self::getCurrentWeather($weather);
        $weather_datas['today'] = self::getTodayWeather($weather);
        $weather_datas['hourly'] = self::getHourLyWeather($weather);
        
        return $weather_datas;
    }
    
    /**
     * 天気情報をAPIで取得
     */
    public static function getWeatherApiData()
    {
        $client = new \GuzzleHttp\Client();
        $url = 'https://api.openweathermap.org/data/2.5/onecall';
        
        $response = $client->request(
            'GET',
            $url,
            ['query' => ['lat' => 35.6594, 'lon' => 139.7006,'appid' => env('WeatherMapApiKey'), 'lang' => 'ja', 'units' => 'metric']]
        );
        
        return json_decode($response->getBody(), true);
    }
    
    /**
     * 現在の天気情報
     */
    public static function getCurrentWeather($data)
    {
        $current_weather['temp'] = $data['current']['temp'];
        $current_weather['main'] = self::$weather_types[$data['current']['weather'][0]['main']];
        
        return $current_weather;
    }
    
    /**
     * 今日の天気情報
     */
    public static function getTodayWeather($data)
    {
        $today_weather['temp_ave'] = $data['daily'][0]['temp']['day'];
        $today_weather['temp_max'] = $data['daily'][0]['temp']['max'];
        $today_weather['temp_min'] = $data['daily'][0]['temp']['min'];
        
        return $today_weather;
    }
    
    /**
     * 1時間おきの天気情報
     */
    public static function getHourlyWeather($data)
    {
        $hourly_datas = array_slice($data['hourly'], 9, 8);
        
        foreach($hourly_datas as $data_id => $hourly_data){
            $time = new Carbon($hourly_data['dt']);
            $hourly_weather[$data_id]['time'] = $time->format('G時');
            $hourly_weather[$data_id]['temp'] = $hourly_data['temp'];
            $hourly_weather[$data_id]['main'] = self::$weather_types[$hourly_data['weather'][0]['main']];
        }
        
        return $hourly_weather;
    }
}
