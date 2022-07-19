<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Slack;
use App\Models\User;

class ContactController extends Controller
{
    /**
     * お問い合わせ送信処理
     */
    public function sendContactMessage(Request $request)
    {
        $user = User::getStudentName(Auth::user()->name);
        $message = $user . "さんから次のような問い合わせがありました。\n----------------\n" . $request['message'] . "\n----------------";
        Slack::sendMessage($message, "mentor");
    }
}
