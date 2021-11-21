<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Slack extends Model
{
    /**
     * Slackの「ltcl_Helper」チャンネルへのメッセージ送信処理
     */
    public static function sendMessage($message)
    {
        $client = new \GuzzleHttp\Client();
        $url = env('Slack_URL');
        
        $response = $client->request(
            'POST',
            $url,
            ['json' => ['text' => $message]]
        );
    }
}
