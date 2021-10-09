<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;
use App\Document;
use App\User;
use App\Image;
use App\History;
use App\Info;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    //一般に公開される部分
    
    // トップ画面表示
    public function home()
    {
        return view('home');
    }
    
    // 履歴画面表示
    public function history()
    {
        $user = Auth::user();
        $questions = $user->questions()->get();
        // アクセス履歴の情報を質問に付随させる
        foreach($questions as $question){
            $question['whenClicked'] = $question->pivot->created_at;
        }
        
        return view('history')->with([
            'today' => date("Y-m-d H:i:s"),
            'questions' => $questions,
        ]);
    }
    
    
    // 以下メンターのみがアクセス可能
    
    // 管理画面表示
    public function mentorTop()
    {
        return view('Mentor.mentor');
    }
    
    // お知らせ新規作成処理
    public function storeInfo(Info $info, Request $request)
    {
        $input = $request['info'];
        $info->fill($input)->save();
        return redirect('/');
    }
    
    // お知らせ削除処理
    public function deleteInfo(Info $info)
    {
        $info->delete();
        return redirect('/');
    }
}
