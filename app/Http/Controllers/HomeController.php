<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;
use App\Document;
use App\User;
use App\Image;
use App\History;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    // public function index()
    // {
    //     return view('home');
    // }
    
    //一般に公開される部分
    // トップ画面表示
    public function search(Question $question)
    {
        return view('Search.search');
    }
    
    // 質問詳細画面表示
    public function show(Question $question)
    {
        // 質問閲覧履歴への記録
        $question->users()->attach(Auth::id());
        // データベースの容量を考慮して履歴保持の期限は２１日間とする
        History::historyDelete(21);
        
        return view('Search.show')->with(['question_id' => $question->id]);
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
        
        return view('Search.history')->with([
            'today' => date("Y-m-d H:i:s"),
            'questions' => $questions,
        ]);
    }
    
    //以下メンターのみがアクセス可能
    // 管理画面表示
    public function mentorTop()
    {
        return view('mentor');
    }
    
}
