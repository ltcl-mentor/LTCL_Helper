<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Question;
use App\Http\Controllers\Controller;

class BlogController extends Controller
{
    public function blog()
    {
        // return Question::where('category', 0)->limit(10)->select('id', 'question', 'comment')->get();
        $questions = Question::where('category', 0)->limit(10)->select('id', 'question', 'comment')->get();
        dd($questions);
        return response()->json($questions, JSON_UNESCAPED_UNICODE);
    }
}
