<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Slack extends Model
{
    /**
     * Slackの「ltcl_helper」、「ltcl_helper_student」チャンネルへのメッセージ送信処理
     */
    public static function sendMessage($message, $target)
    {
        $client = new \GuzzleHttp\Client();
        
        if ($target === "mentor") {
            $url = env('Slack_URL');
        } elseif ($target === "student") {
            $url = env('Slack_Student_URL');
        } elseif ($target === "attendance") {
            $url = env('Slack_Mentor_Attendance_URL');
        }
        
        $response = $client->request(
            'POST',
            $url,
            ['json' => ['text' => "<!channel>\n" . $message]]
        );
    }
}
