<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use App\User;

class History extends Model
{
    public static function historyDelete($day)
    {
        $today = date("Y-m-d H:i:s");
        $limit_day = date("Y-m-d H:i:s", strtotime($today . "-${day} day"));
        $user = Auth::user();
        $limit_over_histories = $user->questions()->wherePivot('created_at', '<', $limit_day)->get();
        
        foreach($limit_over_histories as $limit_over_history){
            $limit_over_history->users()->detach();
        }
    }
}
