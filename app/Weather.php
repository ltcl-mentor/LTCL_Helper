<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

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
    
    public static function getWeatherData()
    {
        $client = new \GuzzleHttp\Client();
        $url = 'https://api.openweathermap.org/data/2.5/onecall';
        $weather_datas = [];
        
        $response = $client->request(
            'GET',
            $url,
            ['query' => ['lat' => 35.6594, 'lon' => 139.7006,'appid' => env('WeatherMapApiKey'), 'lang' => 'ja', 'units' => 'metric']]
        );
        
        return json_decode($response->getBody(), true);
    }
}
