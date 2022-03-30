<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Slack;
use Carbon\Carbon;

class Info extends Model
{
    protected $fillable = ['information', 'body', 'slack', 'targets', 'date', 'slackDate'];
    
    /**
     * イベント通知
     * 毎日13時にslackに通知
     */
    public static function eventSlack() {
        $today = Carbon::parse('2022-04-01 00:00:00')->format('Y-m-d');
        $events = self::whereNotNull('slack')->where('slackDate', $today)->get();

        // slack通知するイベントがあれば1つずつ通知
        foreach ($events as $event) {
            $message = "";
            $message .= "*【" . $event->information . "】*" . PHP_EOL;
            $message .= "`対象：" . $event->targets . "`" . PHP_EOL . PHP_EOL;
            $message .= $event->slack;

            Slack::sendMessage($message, 'student');
        }
        
        // 本日以前のイベントは削除
        self::where('date', '<', $today)->delete();
    }
}
