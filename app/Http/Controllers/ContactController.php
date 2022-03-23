<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Slack;
use App\User;

class ContactController extends Controller
{
    /**
     * お問い合わせ送信処理
     */
    public function sendContactMessage(Request $request)
    {
        $user = Auth::user()->name;
        $users = User::getStudentsApiData()["values"];
        array_splice($users, 0, 2);
        
        foreach($users as $student) {
            if ($student[7] == $user) {
                $user = $student[5] . "(ID：" . $student[7] . ")";
                break;
            }
        }
        
        $message = $user . "さんから次のような問い合わせがありました。\n----------------\n" . $request['message'] . "\n----------------";
        
        Slack::sendMessage($message, "mentor");
    }
    
    /**
     * お問い合わせ入力画面表示
     */
    // public function create()
    // {
    //     return view('Public.Contact.create');
    // }
}
