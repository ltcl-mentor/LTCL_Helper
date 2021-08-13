<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;
use App\Document;
use App\User;
use App\Image;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

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
    public function getApprovedQuestions()
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
    
    
    // 記事関連
    // 全記事受け渡し
    public function getAlldocuments()
    {
        return Document::All();
    }
    
    
    // staff関連
    // 全管理者受け渡し
    public function getAllStaffs()
    {
        return User::where('is_admin','staff')->get();
    }
    
    public function getRelatedDocuments(Question $question)
    {
        return $question->documents()->get();
    }
    
    
    // ログインユーザー情報
    // ログインユーザーid受け渡し
    public function getUserId()
    {
        return Auth::id();
    }

}
