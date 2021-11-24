<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;
use App\Document;
use App\User;

class LinkController extends Controller
{
    /**
     * 単体記事に関する全質問データの受け渡し
     */
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
    
    /**
     * 単体記事と複数質問の紐付け実行
     */
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
        
        // パラメータに渡すために実行内容を確認
        if(count($detach_id) !== 0 && count($attach_id) !== 0){
            $whitch_do = 'attached_and_detached';
        }else if(count($detach_id) !== 0){
            $whitch_do = 'detached';
        }else if(count($attach_id) !== 0){
            $whitch_do = 'attached';
        }else{
            $whitch_do = '';
        }
        
        return redirect('/links/document/'. $document->id .'?link_from_document='. $whitch_do);
    }
    
    /**
     * 単体質問に関する全記事データの受け渡し
     */
    public function getDocumentsFromQuestion(Question $question, Document $document)
    {
        $related_documents = $question->documents()->get();

        if(count($related_documents) === 0){
            $unrelated_documents = $document->get();
        }else{
            $unrelated_documents = $question->getUnrelatedDocuments();
        }
        
        return [ "related_documents" => $related_documents, "unrelated_documents" => $unrelated_documents];
    }
    
    /**
     * 単体質問と複数記事の紐付け実行
     */
    public function linkDocumentsFromQuestion(Request $request, Question $question)
    {
        // 現在指定の記事にリレーションされている質問のidを取得し、配列に変換
        $related_document_ids = $question->getRelatedDocumentsIds();
        
        if($request['detach_id']){
            // リクエストの"detach_id"の文字列を配列に変換
            $request_detach_id = explode(",", $request['detach_id']);
            
            // detachする質問の特定
            // リクエストの"detach_id"に含まれている、リレーション質済み質問のidを取得
            $detach_id = array_intersect($request_detach_id, $related_document_ids);
            
            $question->documents()->detach($detach_id);
        }
        
        if($request['attach_id']){
            // リクエストの"detach_id"の文字列を配列に変換
            $request_attach_id = explode(",", $request['attach_id']);
            
            // attachする質問の特定
            // リクエストの"attach_id"の中で、まだリレーションされていない質問のidを取得
            $attach_id = array_diff($request_attach_id, $related_document_ids);
        
            $question->documents()->attach($attach_id);
        }
        
        // パラメータに渡すために実行内容を確認
        if(count($detach_id) !== 0 && count($attach_id) !== 0){
            $whitch_do = 'attached_and_detached';
        }else if(count($detach_id) !== 0){
            $whitch_do = 'detached';
        }else if(count($attach_id) !== 0){
            $whitch_do = 'attached';
        }else{
            $whitch_do = '';
        }
        
        return redirect('/links/question/'. $question->id .'?link_from_question='. $whitch_do);
    }
    
    
    /**
     * 初期画面表示
     */
    // public function index()
    // {
    //     return view('Mentor.Link.index');
    // }
}
