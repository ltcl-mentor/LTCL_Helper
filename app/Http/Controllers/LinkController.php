<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;
use App\Document;

class LinkController extends Controller
{
    // 初期画面表示
    public function index()
    {
        return view('Link.index');
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
        
        return view('Link.documentToQuestions')->with([
            'document' => $document,
            'related_questions' => $related_questions,
            'unrelated_questions' => $unrelated_questions,
        ]);
    }
    
    // 新規作成実行(記事：質問＝１：多)
    public function postDocumentToQuestions(Request $request,Document $document)
    {
        $document->questions()->detach($request['detach_id']);
        $document->questions()->attach($request['attach_id']);
        return redirect('/links/index');
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
        
        return view('Link.questionToDocuments')->with([
            'question' => $question,
            'related_documents' => $related_documents,
            'unrelated_documents' => $unrelated_documents,
        ]);
    }
    
    // 新規作成実行(記事：質問＝多：1)
    public function postQuestionToDocuments(Request $request,Question $question)
    {
        $question->documents()->detach($request['detach_id']);
        $question->documents()->attach($request['attach_id']);
        return redirect('/links/index');
    }
}
