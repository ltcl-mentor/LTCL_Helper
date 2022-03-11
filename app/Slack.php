<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\College;
use Carbon\Carbon;

class Slack extends Model
{
    /**
     * Slackの「ltcl_helper」、「ltcl_helper_student」チャンネルへのメッセージ送信処理
     */
    public static function sendMessage($message, $target)
    {
        $client = new \GuzzleHttp\Client();
        
        if($target === "mentor"){
            $url = env('Slack_URL');
        }elseif($target === "student"){
            $url = env('Slack_Student_URL');
        }elseif($target === "mentor_attendance"){
            $url = env('Slack_Mentor_Attendance_URL');
        }
        
        $response = $client->request(
            'POST',
            $url,
            ['json' => ['text' => "<!channel>\n" . $message]]
        );
    }
    
    /**
     * 当日のカレッジ出勤メンター、オンライン質問校舎の有無などを「メンター出勤状況」チャンネルに送信
     */
    public static function dailyInform()
    {
        // 現在日時取得
        $now = Carbon::now('Asia/Tokyo');
        
        // 該当スプレッドシートから今日の出勤メンター情報を取得
        $datas = college::getCollegeApiData(substr($now, 0, 4), abs(substr($now, 5,2)));
        
        // 必要情報の摘出
        // 現状だとスプレッドシート側の都合で校舎出勤とオンライン出勤を区別していないので、シート側を調整した後にこっちも変更
        if($datas['values'][abs(substr($now ,8, 2))][5] !== ""){
            $today_staff = $datas['values'][abs(substr($now ,8, 2))][5];
        }else{
            $today_staff = "本日は出勤可能なメンターがいないため休校です。";
        }
        
        // オンライン校舎の有無を記載する欄がシフト表に追加されるらしいので、あればそれを利用して条件分岐
        if(true){
            $onlineCollege = env('ZoomLinksNote');
        }else{
            $onlineCollege = "本日は出勤メンターが少ないため、オンライン校舎は開校しません。\n質問チャンネルやHelperアプリをご利用ください。";
        }
        
        $message = 
            "*本日の出勤メンター（校舎）*\n
            $today_staff\n\n
            *本日の出勤メンター（オンライン）*\n
            $today_staff\n\n
            *本日のオンライン校舎（質問部屋）*\n
            $onlineCollege";
        
        // 確認用にechoしているが、問題なければ下のsendMessageを利用する
        echo $message;
        
        // self::sendMessage($message, 'mentor_attendance');
    }
}
