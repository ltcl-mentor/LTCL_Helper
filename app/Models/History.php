<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class History extends Model
{
    /**
     * 引数に渡された質問閲覧履歴の保持期限を超えたデータを削除
     */
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
