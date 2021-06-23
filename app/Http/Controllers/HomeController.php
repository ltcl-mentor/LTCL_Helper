<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;
use App\Document;
use App\User;
use App\Image;
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
    public function search(Question $question)
    {
        return view('Search.search');
    }
    
    public function show(Question $question)
    {
        $question->users()->attach(Auth::id());
        $documents = $question->documents()->get();
        $images = Image::where('question_id', $question->id)->get();
        if(empty($images[0])){
            $images = null;
        }
        return view('Search.show')->with([
            'question' => $question,
            'documents' => $documents,
            'category' => Question::$category,
            'topic' => Question::$topic,
            'images' => $images,
        ]);
    }
    
    public function history()
    {
        $user = Auth::user();
        $questions = $user->questions()->get();
        $today = date("Y-m-d H:i:s");
        foreach($questions as $question){
            $question['whenClicked'] = $question->pivot->created_at;
            $day_diff = $question['whenClicked']->diffInDays($today);
            $month_diff = $question['whenClicked']->diffInMonths($today);
            if($day_diff === 0){
                $today_histories[] = $question;
            }elseif(0 < $day_diff && $day_diff <= 7){
                $last_week_histories[] = $question;
            }elseif($month_diff === 1){
                $last_month_histories[] = $question;
            }
        }
        
        if(empty($today_histories)){
            $today_histories = null;
        }
        
        if(empty($last_week_histories)){
            $last_week_histories = null;
        }
        
        if(empty($last_month_histories)){
            $last_month_histories = null;
        }
        
        return view('Search.history')->with([
            'today_histories' => $today_histories,
            'last_week_histories' => $last_week_histories,
            'last_month_histories' => $last_month_histories,
        ]);
    }
    
    //以下メンターのみがアクセス可能
    public function mentorTop()
    {
        return view('mentor');
    }
}
