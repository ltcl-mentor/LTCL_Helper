<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class College extends Model
{
    /**
     * 引数に渡された日付情報に該当する出勤のスプレットシートのデータを取得
     */
    public static function getCollegeData($year, $month, $date)
    {
        $college_datas = [];
        
        $datas = self::getCollegeApiData($year, $month);
        
        // 開校・閉館時間の代入
        $college_datas['start'] = $datas['values'][$date][3] ?: null;
        $college_datas['close'] = $datas['values'][$date][4] ?: null;
        
        // 校舎出勤メンターの代入
        if($datas['values'][$date][5] !== ""){
            $college_datas['staff'] = explode("\n", $datas['values'][$date][5], -1);
        }else{
            $college_datas['staff'][] = "本日校舎に出勤するメンターはいません。";
        }
        
        // オンライン自習室担当の代入
        if(count($datas['values'][$date]) < 6){
            $college_datas['zoom'][] = "データ取得失敗。\nスタッフにご確認ください。";
        }elseif($datas['values'][$date][6] === "なし" && $datas['values'][$date][7] === "なし"){
            $college_datas['zoom'][] = "本日オンライン質問部屋はありません。\n質問のある方はSlackにて出勤メンターへ連絡してください。";
        }else{
            $college_datas['zoom'][] = $datas['values'][$date][6] ?: null;
            $college_datas['zoom'][] = $datas['values'][$date][7] ?: null;
        }
        
        return $college_datas;
    }
    
    /**
     * 引数に渡された年と月の情報から該当するスプレットシートの全データを取得
     */
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
