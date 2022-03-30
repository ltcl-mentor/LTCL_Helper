<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;


class College extends Model
{
    /**
     * 引数に渡された日付情報に該当する出勤のスプレットシートのデータを取得
     */
    public static function getCollegeData($year, $month, $date)
    {
        $today = Carbon::today();
        $college_datas = [];
        
        $datas = self::getCollegeApiData($year, $month);
        
        // 開校・閉館時間の代入
        $college_datas['start'] = $datas['values'][$date][3] ?: null;
        $college_datas['close'] = $datas['values'][$date][4] ?: null;
        
        // 校舎出勤メンターの代入
        $college_datas['staff'] = self::inputStaff("college", 5, $date, $datas);
        
        // オンライン出勤メンターの代入
        $college_datas['online_staff'] = self::inputStaff("online", 7, $date, $datas);
        
        // オンライン校舎の代入
        if ($datas['values'][$date][9] == "なし") {
            $college_datas['zoom']['message'] = "本日オンライン質問部屋はありません。\n質問のある方はSlackにて出勤メンターへ連絡してください。";
        } elseif ($datas['values'][$date][9] == "あり") {
            $college_datas['zoom']['message'] = $datas['values'][$date][10];
        }
        
        // オンライン校舎のzoomリンクを掲載するかどうか
        // 当日しか見えないようにする
        if ($today->year == $year && $today->month == $month && $today->day == $date) {
            // 出勤メンターが3人以上で校舎を開校するとき
            if ($college_datas['zoom']['exist'] = $datas['values'][$date][9] == "あり") {
                $college_datas['zoom']['exist'] = true;
            } else {
                $college_datas['zoom']['exist'] = false;
            }
        } else {
            $college_datas['zoom']['exist'] = false;
            $college_datas['zoom']['message'] = "zoomリンクは当日しか見れません。";
        }
        
        // オンライン自習室担当の代入
        // if(count($datas['values'][$date]) < 6){
        //     $college_datas['zoom'][] = "データ取得失敗。\nスタッフにご確認ください。";
        // }elseif($datas['values'][$date][6] === "なし" && $datas['values'][$date][7] === "なし"){
        //     $college_datas['zoom'][] = "本日オンライン質問部屋はありません。\n質問のある方はSlackにて出勤メンターへ連絡してください。";
        // }else{
        //     $college_datas['zoom'][] = $datas['values'][$date][6] ?: null;
        //     $college_datas['zoom'][] = $datas['values'][$date][7] ?: null;
        // }
        
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
    
    /**
     * 出勤メンター通知
     * 毎日12時にslackへ通知
     */
    public static function informSlack()
    {
        $date = Carbon::today();
        $message = "";
        
        // 出勤メンター(校舎)
        if (Self::getCollegeData($date->year, $date->month, $date->day)["staff"][0]) {
            $message .= "*■本日の出勤メンター（校舎）*\n";
            $staffs = Self::getCollegeData($date->year, $date->month, $date->day)["staff"];
            foreach($staffs as $staff) {
                $message .= $staff . "\n";
            }
        }
        
        // 出勤メンター(オンライン)
        if (Self::getCollegeData($date->year, $date->month, $date->day)["online_staff"][0]) {
            $message .= "\n*■本日の出勤メンター（オンライン）*\n";
            $online_staffs = Self::getCollegeData($date->year, $date->month, $date->day)["online_staff"];
            foreach($online_staffs as $staff) {
                $message .= $staff . "\n";
            }
        }
        
        // オンライン校舎
        $message .= "\n*■本日のオンライン校舎（質問部屋）*\n";
        $online_time = Self::getCollegeData($date->year, $date->month, $date->day)["zoom"];
        if ($online_time['exist']) {
            $message .= "開校時間は追ってメンターより連絡します:woman-bowing:";
        } else {
            $message .= "*本日は、出勤しているメンターが少ないため、オンライン校舎は開校しておりません。*\n質問のある方は、<#C01JZMKS1K7> または、<#C029T2EBGC9> チャンネルにてご質問ください。";
        }
        
        Slack::sendMessage($message, 'attendance');
    }
    
    /**
     * メンター、出勤時間代入
     **/
    public static function inputStaff($status, $num, $date, $datas) {
        $array = [];
        
        if($datas['values'][$date][$num] !== ""){
            $staffs = explode("\n", $datas['values'][$date][$num], -1);
            
            // メンターと出勤時間を出力
            $i=0;
            foreach($staffs as $staff) {
                for ($j=14; $j < 34; $j++) { // メンター数が変動した場合修正。Max20人想定
                    if ($staff == $datas['values'][0][$j]) {
                        $times = implode(',', explode("\n", $datas['values'][$date][$j]));
                        break;
                    }
                }
                
                // オンライン出勤の場合、時間先頭のアスタリスク削除
                if ($status == "online" && substr($times, 0, 1) == "*") {
                    $times = substr($times, 1);
                }
                
                $array[$i] = $i+1 . ". " . explode("　", $staff)[0] . " (" . $times . ")";
                $i++;
            }
        }else{
            switch($status) {
                case "online":
                    $array[0] = false;
                    break;
                case "college":
                    $array[0] = false;
                    break;
            }
        }

        return $array;
    }
}