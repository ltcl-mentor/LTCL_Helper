<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;
use App\Document;

class LinkController extends Controller
{
    public function index()
    {
        return view('Link.index');
    }
    
    // 記事1つに対して質問複数の紐付け
    public function getDocumentToQuestions(Document $document, Question $question)
    {
        $related_questions = $document->questions()->get();

         //　記事に紐づいている質問がない場合は質問全て、ある場合はすでに紐付けが完了したものを除いたものを$unlinked_questionsに代入
        if(count($related_questions) === 0){
            $unrelated_questions = $question->get();
        }else{
            $unrelated_questions = $document->getRelatedQuestions();
        }
        
        return view('Link.documentToQuestions')->with([
            'document' => $document,
            'related_questions' => $related_questions,
            'unrelated_questions' => $unrelated_questions,
        ]);
    }
    
    public function postDocumentToQuestions(Request $request,Document $document)
    {
        $document->questions()->detach($request['detach_id']);
        $document->questions()->attach($request['attach_id']);
        return redirect('/links/index');
    }
    
    
    // 質問1つに対して記事複数の紐付け
    public function getQuestionToDocuments(Question $question, Document $document)
    {
        $related_documents = $question->documents()->get();

        if(count($related_documents) === 0){
            $unrelated_documents = $document->get();
        }else{
            $unrelated_documents = $question->getRelatedDocuments();
        }
        
        return view('Link.questionToDocuments')->with([
            'question' => $question,
            'related_documents' => $related_documents,
            'unrelated_documents' => $unrelated_documents,
        ]);
    }
    
    public function postQuestionToDocuments(Request $request,Question $question)
    {
        $question->documents()->detach($request['detach_id']);
        $question->documents()->attach($request['attach_id']);
        return redirect('/links/index');
    }
}
