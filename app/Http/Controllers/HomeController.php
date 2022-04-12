<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;
use App\Document;
use App\User;
use App\Image;
use App\History;
use App\Info;
use App\Event;
use App\Comment;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /** 共通処理 */
    
    /**
     * 質問閲覧履歴受け渡し
     */
    public function getHistory()
    {
        $user = Auth::user();
        $questions = $user->questions()->paginate(20);
        
        foreach($questions as $question){
            $student_yet_comments = Comment::where('question_id', $question->id)->where('is_mentor_commented', true)->get();

            $question->reply = count($student_yet_comments) !== 0 ? true : false;
        }
        // アクセス履歴の情報を質問に付随させる
        foreach($questions as $question){
            $question['whenClicked'] = $question->pivot->created_at;
        }
        
        return $questions;
    }
    
    /**
     * トップ画面表示
     */
    // public function home()
    // {
    //     return view('home');
    // }
    
    
    
    /** 管理者用処理 */
    
    /**
     * お知らせ新規作成処理
     */
    public function storeInfo(Info $info, Request $request)
    {
        $input['information'] = $request['info'];
        $input['body'] = $request['body'];
        $input['targets'] = implode("/", $request['target']);
        $input['slack'] = $request['slack'];
        $input['date'] = $request['date'];
        $input['slackDate'] = $request['slackDate'];
        $info->fill($input)->save();
        return Info::getInfo();
    }
    
    /**
     * お知らせ削除処理
     */
    public function deleteInfo(Info $info)
    {
        $info->delete();
        return Info::getInfo();
    }
    
    /**
     * イベント追加処理
     */
    public function storeEvent(Request $request, Event $event) {
        $input['name'] = $request['name'];
        $input['template'] = $request['template'];
        $event->fill($input)->save();
        return Event::get();
    }
    
    /**
     * イベント編集処理
     */
    public function updateEvent(Request $request, Event $event) {
        $event->name = $request['name'];
        $event->template = $request['template'];
        $event->save();
        return Event::get();
    }
    
    /**
     * イベント削除処理
     */
    public function deleteEvent(Event $event) {
        $event->delete();
        return Event::get();
    }
    
    /**
     * 管理画面表示
     */
    // public function mentorTop()
    // {
    //     return view('Mentor.mentor');
    // }
}
