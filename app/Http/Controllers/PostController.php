<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;
use App\Document;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    //一般に公開される部分
    public function search(Question $question)
    {
        return view('Search.search');
        // ->with(['questions' => $question->where('check',1)->get()]);
    }
    
    public function show(Question $question)
    {
        $documents=$question->documents()->get();
        return view('Search.show')->with(['question'=>$question,'documents'=>$documents]);
    }
    
    //以下メンターのみが閲覧可能
    public function mentorTop()
    {
        return view('mentor');
    }
    
    //質問の登録に関する部分
    public function questionIndex(Question $question)
    {
        $category=['カリキュラム','成果物'];
        $genre=['AWS','HTML','CSS','JavaScript','PHP','Laravel','DB','Git&GitHub','環境構築','設計図','デプロイ','API'];
        $unchecked_questions=$question->where('check',0)->get();
        return view('Question.index')->with([
            'checked_questions'=>$checked_questions,
            'checked_AWS_questions'=>$checked_AWS_questions=Question::getCheckedParticalQuestion(0,0),
            'unchecked_questions'=>$unchecked_questions,
            'category'=>$category,
            'genre'=>$genre,
            ]);
    }
    
    public function questionCreate()
    {
        return view('Question.create');
    }
    
    public function questionStore(Request $request, Question $question)
    {
        $validatedInput=$request->validate([
            'post.category'=>'required',
            'post.genre'=>'required',
            'post.curriculum_number'=>'required|max:5',
            'post.question'=>'required|string',
            'post.comment'=>'required|string',
        ],
        [
            'post.question.required'=>'質問内容の入力は必須です。',
            'post.comment.required'=>'コメントの入力は必須です。保留の場合は保留と入力してください。',
        ]);
        $question->fill($validatedInput['post']);
        $question['check']=0;
        $question['user_id']= Auth::id();
        $question->save();
        return redirect('/questions/index');
    }
    
    public function questionShow(Question $question)
    {
        $documents=$question->documents()->get();
        return view('Question.show')->with([
            'question'=>$question,
            'documents'=>$documents,
            ]);
    }
    
    public function questionEdit(Question $question)
    {
        $category=['カリキュラム','成果物'];
        $genre=['AWS','HTML','CSS','JavaScript','PHP','Laravel','DB','Git&GitHub','環境構築','設計図','デプロイ','API'];
        return view('Question.edit')->with(['question'=>$question,'category'=>$category,'genre'=>$genre]);
    }
    
    public function questionUpdate(Request $request, Question $question)
    {
        $validatedInput=$request->validate([
            'post.category'=>'required',
            'post.genre'=>'required',
            'post.curriculum_number'=>'required|max:5',
            'post.question'=>'required|string',
            'post.comment'=>'required|string',
        ],
        [
            'post.question.required'=>'質問内容の入力は必須です。',
            'post.comment.required'=>'コメントの入力は必須です。保留の場合は保留と入力してください。',
        ]);
        $question->fill($validatedInput['post']);
        $question->save();
        return redirect('/questions/index');
    }
    
    public function questionCheck(Question $question)
    {
        $question['check']=1;
        $question->save();
        return redirect('/questions/index');
    }
    
    //記事の登録に関する部分
    public function documentIndex(Document $document)
    {
        $questions=$document->questions()->get();
        return view('Document.index')->with([
            'documents'=>$document->get(),
            'questions'=>$questions,
            ]);
    }
    
    public function documentCreate()
    {
        return view('Document.create');
    }
    
    public function documentStore(Request $request, Document $document)
    {
        $validatedInput=$request->validate([
            'post.title'=>'required|max:50',
            'post.link'=>'required',
        ],
        [
            'post.title.required'=>'記事のタイトルは必須です。',
            'post.title.max'=>'記事のタイトルは字数制限50文字です。',
            'post.link.required'=>'記事のリンクは必須です。',
        ]);
        $document['user_id']=Auth::id();
        $document->fill($validatedInput['post'])->save();
        return redirect(route('link',['document'=>$document->id]));
    }
    
    public function documentEdit(Document $document)
    {
        return view('Document.edit')->with(['document'=>$document]);
    }
    
    public function documentUpdate(Request $request, Document $document)
    {
        $validatedInput=$request->validate([
            'post.title'=>'required|max:50',
            'post.link'=>'required',
        ],
        [
            'post.title.required'=>'記事のタイトルは必須です。',
            'post.title.max'=>'記事のタイトルは字数制限50文字です。',
            'post.link.required'=>'記事のリンクは必須です。',
        ]);
        $document->fill($validatedInput['post'])->save();
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
