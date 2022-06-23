<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Slack;
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

    public static function getInfo() {
        // infosテーブルの本日以降の日付を取得（重複はなし）
        $infos['dates'] = self::groupBy('date')->orderBy('date', 'desc')->where('date', '>=', Carbon::now()->format('Y-m-d'))->pluck('date');

        // 各日付のデータを取得して配列に代入
        foreach($infos['dates'] as $date){
            $infos['infos'][$date] = self::where('date', $date)->select('id', 'information', 'targets', 'body', 'slackDate')->get();
        }

        return $infos;
    }
}
