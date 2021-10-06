<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;
use App\Document;
use App\User;
use App\Image;
use App\Info;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class ReactController extends Controller
{
    // 質問関連
    // 質問検索結果の受け渡し
    public function getSearchQuestions(Request $request)
    {
        if($request->keyword && $request->curriculum_number){
            $results = Question::where('check', 1)
                        ->where('category', $request->category)
                        ->where('topic', $request->topic)
                        ->where('curriculum_number', $request->curriculum_number)
                        ->where('question', 'LIKE', '%'.$request->keyword.'%')
                        ->orderBy('question', 'asc')->get();
        }elseif($request->curriculum_number){
            $results = Question::where('check', 1)
                        ->where('category', $request->category)
                        ->where('topic', $request->topic)
                        ->where('curriculum_number', $request->curriculum_number)
                        ->orderBy('question', 'asc')->get();
        }elseif($request->keyword){
            $results = Question::where('check', 1)
                        ->where('category', $request->category)
                        ->where('topic', $request->topic)
                        ->where('question', 'LIKE', '%'.$request->keyword.'%')
                        ->orderBy('question', 'asc')->get();
        }else{
            $results = Question::where('check', 1)
                        ->where('category', $request->category)
                        ->where('topic', $request->topic)
                        ->orderBy('question', 'asc')->get();
        }
        return $results;
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
        return Question::where('check', 1)->get();
    }
    
    // 未承認質問受け渡し
    public function getUnapprovedQuestions()
    {
        return Question::where('check', 0)->get();
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
        $client = new \GuzzleHttp\Client();
        $url = 'https://api.openweathermap.org/data/2.5/onecall';
        $weather_datas = [];
        $weather_types = [
            'Clouds' => 'くもり',
            'Clear' => '快晴',
            'Snow' => '雪',
            'Rain' => '雨',
            'Drizzle' => '霧雨',
            'Thunderstorm' => '雷雨',
            'Atmosphere' => '異常気象'
        ];
        
        $response = $client->request(
            'GET',
            $url,
            ['query' => ['lat' => 35.6594, 'lon' => 139.7006,'appid' => env('WeatherMapApiKey'), 'lang' => 'ja', 'units' => 'metric']]
        );
        
        $weather = json_decode($response->getBody(), true);
        
        // 現在の天気情報
        $weather_datas['current']['temp'] = $weather['current']['temp'];
        $weather_datas['current']['main'] = $weather_types[$weather['current']['weather'][0]['main']];
        
        // 今日の天気情報
        $weather_datas['today']['temp_ave'] = $weather['daily'][0]['temp']['day'];
        $weather_datas['today']['temp_max'] = $weather['daily'][0]['temp']['max'];
        $weather_datas['today']['temp_min'] = $weather['daily'][0]['temp']['min'];
        
        // 1時間おきの天気情報
        $hourly_datas = array_slice($weather['hourly'], 9, 8);
        foreach($hourly_datas as $data_id => $hourly_data){
            $time = new Carbon($hourly_data['dt']);
            $weather_datas['hourly'][$data_id]['time'] = $time->format('G時');
            $weather_datas['hourly'][$data_id]['temp'] = $hourly_data['temp'];
            $weather_datas['hourly'][$data_id]['main'] = $weather_types[$hourly_data['weather'][0]['main']];
        }
        
        return $weather_datas;
    }
    
    public function getCollegeData($year, $month, $date)
    {
        $client = new \GuzzleHttp\Client();
        $url = 'https://sheets.googleapis.com/v4/spreadsheets/'. env('GoogleSheetsID') .'/values/'. $year .'_'. $month;
        $college_datas = [];
        
        $response = $client->request(
            'GET',
            $url,
            ['query' => ['key' => env('GoogleSheetsKey'), 'majorDimension' => 'COLUMNS']]
        );
        
        $datas = json_decode($response->getBody(), true);
        
        // 開校・閉館時間の代入
        $college_datas['start'] = $datas['values'][$date][2] ?: null;
        $college_datas['close'] = $datas['values'][$date][3] ?: null;
        
        // 校舎出勤メンターの代入
        if($datas['values'][$date][17] !== ""){
            $college_datas['staff'] = explode("\n", $datas['values'][$date][17], -1);
        }else{
            $college_datas['staff'][] = "本日校舎に出勤するメンターはいません。";
        }
        
        // オンライン自習室担当の代入
        if(count($datas['values'][$date]) < 30){
            $college_datas['zoom'][] = "データを取得できませんでした。スタッフに直接ご確認ください。";
        }elseif(count($datas['values'][$date]) === 30){
            $college_datas['zoom'][] = $datas['values'][$date][29] ?: null;
        }else{
            $college_datas['zoom'][] = $datas['values'][$date][29] ?: null;
            $college_datas['zoom'][] = $datas['values'][$date][30] ?: null;
        }
        
        return $college_datas;
    }
    
    public function getInfos(Info $info){
        $infos = [];
        
        // infosテーブルの全日付を取得
        $infos['dates'] = $info->orderBy('date', 'desc')->pluck('date');
        
        // 各日付のデータを取得して配列に代入
        foreach($infos['dates'] as $date){
            $infos['infos'][$date] = $info->where('date', $date)->select('id', 'information')->get();
        }
        // dd($infos['infos']);
        return $infos;
    }
}
