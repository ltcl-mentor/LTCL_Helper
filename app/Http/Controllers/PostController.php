<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;
use App\Document;

class PostController extends Controller
{
    public function search(Question $question)
    {
        return view('search')->with(['questions' => $question->get()]);
    }
    
    public function show(Question $question)
    {
        $documents=$question->documents()->get();
        return view('show')->with(['question'=>$question,'documents'=>$documents]);
    }
    
    public function mentorTop()
    {
        return view('mentor');
    }
    
    public function questionIndex(Question $question)
    {
        $category[]=array();
        $genre[]=array();
        $category=['カリキュラム','成果物'];
        $genre=['AWS','HTML','CSS','JavaScript','PHP','Laravel','DB','Git&GitHub','環境構築','設計図','デプロイ','API'];
        return view('Question.index')->with(['questions'=>$question->get(),'category'=>$category,'genre'=>$genre]);
    }
    
    public function questionCreate()
    {
        return view('Question.create');
    }
    
    public function questionStore(Request $request, Question $question)
    {
        $input=$request['post'];
        $question->fill($input);
        $question['check']=0;
        $question->save();
        return redirect('/questions/index');
    }
    
    public function questionEdit(Question $question)
    {
        $category[]=array();
        $genre[]=array();
        $category=['カリキュラム','成果物'];
        $genre=['AWS','HTML','CSS','JavaScript','PHP','Laravel','DB','Git&GitHub','環境構築','設計図','デプロイ','API'];
        return view('Question.edit')->with(['question'=>$question,'category'=>$category,'genre'=>$genre]);
    }
    
    public function questionUpdate(Request $request, Question $question)
    {
        $input=$request['post'];
        $question->fill($input);
        $question['check']=0;
        $question->save();
        return redirect('/questions/index');
    }
    
    public function questionCheck(Question $question)
    {
        $question['check']=1;
        $question->save();
        return redirect('/questions/index');
    }
    
    
    public function documentIndex(Document $document)
    {
        return view('Document.index')->with(['documents'=>$document->get()]);
    }
    
    public function documentCreate()
    {
        return view('Document.create');
    }
    
    public function documentStore(Request $request, Document $document)
    {
        $input=$request['document'];
        $document->fill($input)->save();
        return redirect(route('link',['document'=>$document->id]));
    }
    
    public function documentEdit(Document $document)
    {
        return view('Document.edit')->with(['document'=>$document]);
    }
    
    public function documentUpdate(Request $request, Document $document)
    {
        $input=$request['document'];
        $document->fill($input)->save();
        return redirect('documents/index');
    }
    
    public function linkDocumentToQuestion(Document $document,Question $question)
    {
        return view('Document.linkDocumentToQuestion')->with(['document'=>$document,'questions'=>$question->get()]);
    }
    
    public function storeLinks(Request $request,Document $document)
    {
        $document->questions()->attach($request['question_id']);
        return redirect('/mentor');
    }
}
