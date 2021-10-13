<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;
use App\Document;
use App\User;
use App\Image;
use App\Info;
use App\Weather;
use App\College;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class ReactController extends Controller
{
    // 質問関連
    // 絞り込み質問検索結果の受け渡し
    public function getSearchQuestions(Request $request)
    {
        return Question::conditionSearch($request->category, $request->topic, $request->curriculum_number, $request->keyword);
    }
    
    // 全質問受け渡し
    public function getAllQuestions()
    {
        return Question::All();
    }
    
    // 個別質問データの受け渡し
    public function getQuestion(Question $question)
    {
        return $question;
    }
    
    // 承認済み質問受け渡し
    public function getCheckedQuestions()
    {
        return Question::where('check', true)->get();
    }
    
    // 未承認質問受け渡し
    public function getUnapprovedQuestions()
    {
        return Question::where('check', false)->get();
    }
    
    // カリキュラム範囲質問受け渡し
    public function getCurriculumQuestions()
    {
        return Question::where('category', 0)->get();
    }
    
    // 成果物範囲質問受け渡し
    public function getPortfolioQuestions()
    {
        return Question::where('category', 1)->get();
    }
    
    // 質問に関連する画像の受け渡し
    public function getImages($question_id)
    {
        return Image::where('question_id', $question_id)->get();
    }
    
    
    // 参考記事関連
    // 全記事受け渡し
    public function getAlldocuments()
    {
        return Document::All();
    }
    
    public function getRelatedDocuments(Question $question)
    {
        return $question->documents()->get();
    }
    
    
    // staff関連
    // 全管理者受け渡し
    public function getAllStaffs()
    {
        return User::where('is_admin','staff')->get();
    }
    
    
    // ログインユーザー情報
    // ログインユーザーid受け渡し
    public function getUserId()
    {
        return Auth::id();
    }
    
    public function getUser()
    {
        return Auth::user();
    }
    
    
    // home画面用データ受け渡し
    // 今日の天気のデータ受け渡し
    public function getWeather()
    {
        return Weather::getWeatherData();
    }
    
    
    // URLで指定された日付の校舎情報受け渡し
    public function getCollegeData($year, $month, $date)
    {
        return College::getCollegeData($year, $month, $date);
    }
    
    
    // 記録されているお知らせの受け渡し
    public function getInfos(Info $info)
    {
        // infosテーブルの全日付を取得
        $infos['dates'] = $info->orderBy('date', 'desc')->pluck('date');
        
        // 各日付のデータを取得して配列に代入
        foreach($infos['dates'] as $date){
            $infos['infos'][$date] = $info->where('date', $date)->select('id', 'information')->get();
        }
        
        return $infos;
    }
}
