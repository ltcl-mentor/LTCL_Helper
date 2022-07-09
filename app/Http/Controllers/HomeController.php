<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\Document;
use App\Models\User;
use App\Models\Image;
use App\Models\History;
use App\Models\Info;
use App\Models\Event;
use App\Models\Comment;
use App\Models\College;
use App\Models\Weather;
use Illuminate\Support\Facades\Auth;
use DateTimeInterface;


class HomeController extends Controller
{
    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }

    /** 共通 */
    /**
     * Google Map APIのAPIキーの受け渡し
     */
    public function getHomeData()
    {
        return ["key" => config('app.googleMap'), "zoom" => config('app.zoom')];
    }

    /**
     * URLで指定された日付の校舎情報受け渡し
     */
    public function getCollegeData($year, $month, $date)
    {
        return College::getCollegeData($year, $month, $date);
    }

    /**
     * 記録されているお知らせとイベントの受け渡し
     */
    public function getInfos()
    {
        $infos = Info::getInfo();
        return ["infos" => $infos, "events" => Event::all()];
    }

    /**
     * 今日の天気のデータ受け渡し
     */
    public function getWeather()
    {
        return Weather::getWeatherData();
    }

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
            $question['whenClicked'] = $this->serializeDate($question->pivot->created_at);
        }

        return $questions;
    }

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
