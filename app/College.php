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
        $college_datas = [];
        
        $datas = self::getCollegeApiData($year, $month);
        
        // 開校・閉館時間の代入
        $college_datas['start'] = $datas['values'][$date][3] ?: null;
        $college_datas['close'] = $datas['values'][$date][4] ?: null;
        
        // 校舎出勤メンターの代入
        if($datas['values'][$date][5] !== ""){
            $staffs = explode("\n", $datas['values'][$date][5], -1);
            
            // メンターと出勤時間を出力
            for($i=0; $i < count($staffs); $i++) {
                $staff = $staffs[$i];
                $j = 11;
                while($staff != $datas['values'][0][$j]) {
                    $j++;
                }
                $times = implode(',', explode("\n", $datas['values'][$date][$j]));
                $college_datas['staff'][$i] = $staff . " (" . $times . ")";
            }
        }else{
            $college_datas['staff'][] = "本日校舎に出勤するメンターはいません。";
        }
        
        // オンライン出勤メンターの代入
        if($datas['values'][$date][8] !== ""){
            $staffs = explode("\n", $datas['values'][$date][8], -1);
            
            // メンターと出勤時間を出力
            for($i=0; $i < count($staffs); $i++) {
                $staff = $staffs[$i];
                $j = 12;
                while($staff != $datas['values'][0][$j]) {
                    $j++;
                }
                $times = implode(',', explode("\n", $datas['values'][$date][$j]));
                
                // オンライン出勤時間先頭のアスタリスク削除
                if (substr($times, 0, 1) == "*") {
                    $times = substr($times, 1);
                }
                $college_datas['online_staff'][$i] = $staff . " (" . $times . ")";
            }
        }else{
            $college_datas['online_staff'][] = "本日オンライン出勤するメンターはいません。";
        }
        
        // オンライン校舎の代入
        if ($datas['values'][$date][9] == "なし") {
            $college_datas['zoom']['message'] = "本日オンライン質問部屋はありません。\n質問のある方はSlackにて出勤メンターへ連絡してください。";
            $college_datas['zoom']['exist'] = false;
        } else {
            $college_datas['zoom']['message'] = $datas['values'][$date][9];
            $college_datas['zoom']['exist'] = true;
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
     * 平日14時、休日12時にslackへ通知
     */
    public static function informSlack()
    {
        $date = new Carbon();
        $message = "";
        
        // 出勤メンター(校舎)
        $message .= "本日の出勤メンター（校舎）\n";
        $staffs = Self::getCollegeData($date->year, $date->month, $date->day)["staff"];
        foreach($staffs as $staff) {
            $message .= $staff . "\n";
        }
        
        // 出勤メンター(オンライン)
        $message .= "\n本日の出勤メンター（オンライン）\n";
        $online_staffs = Self::getCollegeData($date->year, $date->month, $date->day)["online_staff"];
        for ($i=0; $i < count($online_staffs); $i++) {
            $message .= $online_staffs[$i] . "\n";
        }
        
        // オンライン校舎
        $message .= "\n本日のオンライン校舎（質問部屋）\n";
        $online_time = Self::getCollegeData($date->year, $date->month, $date->day)["zoom"];
        if ($online_time['exist']) {
            $message .= "質問部屋・開校時間帯：" . $online_time['message']. "\n" . env('ZoomLinksNote');
        } else {
            $message .= "本日は、出勤しているメンターが少ないため、オンライン校舎は開校しておりません。\n質問のある方は、#ltcl-カリキュラム質問 または、#ltcl-成果物質問 チャンネルにてご質問ください。";
        }

        Slack::sendMessage($message, 'attendance');
    }
}
