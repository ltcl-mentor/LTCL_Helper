<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Slack;

class ContactController extends Controller
{
    public function create()
    {
        return view('Public.Contact.create');
    }
    
    public function post(Request $request)
    {
        $user = Auth::user()->name;
        
        $message = $user . "さんから次のような問い合わせがありました。\n----------------\n" . $request['message'] . "\n----------------";
        
        Slack::sendMessage($message);
        
        return redirect('/?contact=created');
    }
}
