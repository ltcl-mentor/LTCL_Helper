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
    public function getQuestionsFromDocument(Document $document, Question $question)
    {
        $related_questions = $document->questions()->get();

         //　記事に紐づいている質問がない場合は質問全て、ある場合はすでに紐付けが完了したものを除いたものを$unlinked_questionsに代入
        if(count($related_questions) === 0){
            $unrelated_questions = $question->get();
        }else{
            $unrelated_questions = $document->getUnrelatedQuestions();
        }
        
        return [ "related_questions" => $related_questions, "unrelated_questions" => $unrelated_questions];
    }
    
    // 新規作成実行(記事：質問＝１：多)
    public function linkQuestionsFromDocument(Request $request,Document $document)
    {
        // 現在指定の記事にリレーションされている質問のidを取得し、配列に変換
        $related_question_ids = $document->getRelatedQuestionsIds();
        
        if($request['detach_id']){
            // リクエストの"detach_id"の文字列を配列に変換
            $request_detach_id = explode(",", $request['detach_id']);
            
            // detachする質問の特定
            // リクエストの"detach_id"に含まれている、リレーション質済み質問のidを取得
            $detach_id = array_intersect($request_detach_id, $related_question_ids);
            // dd($detach_id);
            $document->questions()->detach($detach_id);
        }
        
        if($request['attach_id']){
            // リクエストの"detach_id"の文字列を配列に変換
            $request_attach_id = explode(",", $request['attach_id']);
            
            // attachする質問の特定
            // リクエストの"attach_id"の中で、まだリレーションされていない質問のidを取得
            $attach_id = array_diff($request_attach_id, $related_question_ids);
        
            $document->questions()->attach($attach_id);
        }
        
        return redirect('/links/document/'. $document->id .'?link=success');
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
