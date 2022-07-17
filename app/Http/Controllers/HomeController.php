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
        return ["infos" => Info::getInfo(), "events" => Event::all()];
    }

    /**
     * 今日の天気のデータ受け渡し
     */
    public function getWeather()
    {
        return Weather::getWeatherData();
    }

    /**
     * 各トピックの質問数と関連記事数を取得
     */
    public function getQuestionArticle()
    {
        $achievement = Question::getAchievement();
        $curriculum_questions = [];
        $project_questions = [];
        $questions = array_count_values(Question::where('check', 1)->pluck('topic')->all());
        $documents = array_count_values(Document::pluck('category')->all());

        // 質問、関連記事カウント
        for ($i=0; $i <= 19; $i++) {
            $question_count = 0;
            $document_count = 0;

            if (array_key_exists($i, $questions)) {
                $question_count = $questions[$i];
            }

            if (array_key_exists($i, $documents)) {
                $document_count = $documents[$i];
            }

            if ($i <= 13) {  // カリキュラム
                array_push($curriculum_questions, ['topic' => $i, 'questions' => $question_count, 'documents' => $document_count]);
            } else {         // 成果物
                array_push($project_questions, ['topic' => $i, 'questions' => $question_count, 'documents' => $document_count]);
            }
        }

        return ['curriculum' => $curriculum_questions, "project" => $project_questions, 'achievement' => $achievement];
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

    /**
     * お問い合わせ送信処理
     */
    public function sendContactMessage(Request $request)
    {
        $user = User::getStudentName(Auth::user()->name);
        $message = $user . "さんから次のような問い合わせがありました。\n----------------\n" . $request['message'] . "\n----------------";
        Slack::sendMessage($message, "mentor");
    }

    /** 管理者用処理 */
    /**
     * 管理画面へイベント、受講生、スタッフ情報を受け渡す
     */
    public function getAllMentorInfo()
    {
        $events = Event::get();
        $staffs = User::where('is_admin','staff')->paginate(10);
        $students = User::getAllStudentsName();

        return compact('events', 'staffs', 'students');
    }

    /**
     * お知らせ新規作成処理
     */
    public function storeInfo(Request $request)
    {
        Info::store($request);
    }

    /**
     * お知らせ削除処理
     */
    public function deleteInfo(Info $info)
    {
        $info->delete();
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
}
