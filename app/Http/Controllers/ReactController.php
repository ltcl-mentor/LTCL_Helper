<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;
use App\Document;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ReactController extends Controller
{
    // 質問関連
    public function getAllQuestions()
    {
        return Question::All();
    }
    
    public function getApprovedQuestions()
    {
        return Question::where('check', 1)->get();
    }
    
    public function getUnapprovedQuestions()
    {
        return Question::where('check', 0)->get();
    }
    
    public function getCurriculumQuestions()
    {
        return Question::where('category', 0)->get();
    }
    
    public function getPortfolioQuestions()
    {
        return Question::where('category', 1)->get();
    }
    
    public function getQuestion(Question $question)
    {
        return $question;
    }
    
    // 記事関連
    public function getAlldocuments()
    {
        return Document::All();
    }
    
    // staff関連
    public function getAllStaffs()
    {
        return User::where('is_admin','staff')->get();
    }
    
    // ログインユーザー情報
    public function getUserId()
    {
        return Auth::id();
    }
}
