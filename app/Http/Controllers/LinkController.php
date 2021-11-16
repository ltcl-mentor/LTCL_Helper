<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;
use App\Document;
use App\User;

class LinkController extends Controller
{
    // 初期画面表示
    public function index()
    {
        return view('Mentor.Link.index');
    }
    
    // 新規作成画面表示(記事：質問＝１：多)
    public function getDocumentToQuestions(Document $document, Question $question)
    {
        $related_questions = $document->questions()->get();

         //　記事に紐づいている質問がない場合は質問全て、ある場合はすでに紐付けが完了したものを除いたものを$unlinked_questionsに代入
        if(count($related_questions) === 0){
            $unrelated_questions = $question->get();
        }else{
            $unrelated_questions = $document->getUnrelatedQuestions();
        }
        
        return view('Mentor.Link.documentToQuestions')->with([
            'document' => $document,
            'related_questions' => $related_questions,
            'unrelated_questions' => $unrelated_questions,
            'topic' => Question::$topic,
        ]);
    }
    
    // 新規作成実行(記事：質問＝１：多)
    public function postDocumentToQuestions(Request $request,Document $document)
    {
        if($request['detach_id']){
            $document->questions()->detach($request['detach_id']);
        }
        
        if($request['attach_id']){
            $document->questions()->attach($request['attach_id']);
        }
        
        return redirect('/links/index?link=success');
    }
    
    
    // 新規作成画面表示(記事：質問＝多：1)
    public function getQuestionToDocuments(Question $question, Document $document)
    {
        $related_documents = $question->documents()->get();

        if(count($related_documents) === 0){
            $unrelated_documents = $document->get();
        }else{
            $unrelated_documents = $question->getUnrelatedDocuments();
        }
        
        return view('Mentor.Link.questionToDocuments')->with([
            'question' => $question,
            'related_documents' => $related_documents,
            'unrelated_documents' => $unrelated_documents,
            'staffs' => User::where('is_admin', 'staff')->get(),
        ]);
    }
    
    // 新規作成実行(記事：質問＝多：1)
    public function postQuestionToDocuments(Request $request,Question $question)
    {
        if($request['detach_id']){
            $question->documents()->detach($request['detach_id']);
        }
        
        if($request['attach_id']){
            $question->documents()->attach($request['attach_id']);
        }
        
        return redirect('/links/index?link=success');
    }
}
