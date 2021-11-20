<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class College extends Model
{
    public static function getCollegeData($year, $month, $date)
    {
        $college_datas = [];
        
        $datas = self::getCollegeApiData($year, $month);
        
        // 開校・閉館時間の代入
        $college_datas['start'] = $datas['values'][$date][2] ?: null;
        $college_datas['close'] = $datas['values'][$date][3] ?: null;
        
        // 校舎出勤メンターの代入
        if($datas['values'][$date][17] !== ""){
            $college_datas['staff'] = explode("\n", $datas['values'][$date][17], -1);
        }else{
            $college_datas['staff'][] = "本日校舎に出勤するメンターはいません。";
        }
        
        // オンライン自習室担当の代入
        if(count($datas['values'][$date]) < 30){
            $college_datas['zoom'][] = "データ取得失敗。\nスタッフにご確認ください。";
        }elseif(count($datas['values'][$date]) === 30){
            $college_datas['zoom'][] = $datas['values'][$date][29] ?: null;
        }else{
            $college_datas['zoom'][] = $datas['values'][$date][29] ?: null;
            $college_datas['zoom'][] = $datas['values'][$date][30] ?: null;
        }
        
        return $college_datas;
    }
    
    public static function getCollegeApiData($year, $month)
    {
        $client = new \GuzzleHttp\Client();
        $url = 'https://sheets.googleapis.com/v4/spreadsheets/'. env('GoogleSheetsID') .'/values/'. $year .'_'. $month;
        
        $response = $client->request(
            'GET',
            $url,
            ['query' => ['key' => env('GoogleSheetsKey'), 'majorDimension' => 'COLUMNS']]
        );
        
        return json_decode($response->getBody(), true);
    }
}
