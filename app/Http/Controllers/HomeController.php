<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;
use App\Document;
use App\User;
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
        return view('Search.show')->with([
            'question' => $question,
            'documents' => $documents,
            'category' => Question::$category,
            'topic' => Question::$topic,
        ]);
    }
    
    public function history()
    {
        $user = Auth::user();
        $questions = $user->questions()->get();
        return view('Search.history')->with(['questions' => $questions]);
    }
    
    //以下メンターのみがアクセス可能
    public function mentorTop()
    {
        return view('mentor');
    }
}
