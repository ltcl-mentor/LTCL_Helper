<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\QuestionRequest;
use App\Question;
use App\Document;
use App\User;
use App\Image;
use Storage;
use Illuminate\Support\Facades\Auth;

class QuestionController extends Controller
{
    // 初期画面表示
    public function index(Question $question)
    {
        return view('Question.index');
    }
    
    // 新規作成画面表示
    public function create()
    {
        return view('Question.create');
    }
    
    // 新規作成実行
    public function store(QuestionRequest $request, Question $question)
    {
        // 質問に関する処理
        $question->fill($request['post']);
        $question['check'] = 0;
        $question['user_id'] = Auth::id();
        $question->save();
        
        // 画像に関する処理
        $pictures = $request->file('image');
        if($pictures){
            Image::imageCreate($pictures, $question->id);
        }
        
        return redirect('/questions/index');
    }
    
    // 詳細画面表示
    public function show(Question $question, User $user)
    {
        $author = $user->find($question['user_id']);
        if($author){
            $author_name = $author->name;
        } else{
            $author_name = null;
        }
        
        $images = Image::where('question_id', $question->id)->get();
        if(empty($images[0])){
            $images = null;
        }
        
        return view('Question.show')->with([
            'question' => $question,
            'documents' => $question->documents()->get(),
            'category' => Question::$category,
            'topic' => Question::$topic,
            'author_name' => $author_name,
            'isChecked' => $question['check'],
            'images' => $images,
        ]);
    }
    
    // 編集画面表示
    public function edit(Question $question)
    {
        return view('Question.edit')->with([
            'question_id' => $question->id,
        ]);
    }
    
    // 編集実行
    public function update(QuestionRequest $request, Question $question)
    {
        // 質問に関する処理
        $question->fill($request['post']);
        $question->save();
        
        // 画像に関する処理
        // 画像の削除
        if($request['delete_id']){
            $delete_images = Image::whereIn('id', $request['delete_id'])->get();
            Image::imageDelete($delete_images);
        }
        
        // 画像の登録
        $create_images = $request->file('image');
        if($create_images){
            Image::imageCreate($create_images, $question->id);
        }
        
        return redirect('/questions/'. $question->id);
    }
    
    // 削除実行
    public function delete(Question $question)
    {
        // 画像の削除
        $images = Image::where('question_id', $question->id)->get();
        if($images){
            Image::imageDelete($images);
        }
        
        // 質問の削除
        $question->delete();
        Question::questionForceDelete();
        return redirect('/questions/index');
    }
    
    // 承認用一覧画面表示
    public function approval(Question $question)
    {
        return view('Question.approval');
    }
    
    // 承認実行
    public function check(Question $question)
    {
        $question['check'] = 1;
        $question->save();
        // $questions = Question::where('check', 0)->get();
        // return response()->json($questions);
        return redirect('/questions/'. $question->id);
    }
    
    // 承認解除実行
    public function uncheck(Question $question)
    {
        $question['check'] = 0;
        $question->save();
        $questions = Question::where('check', 1)->get();
        // return response()->json($questions);
        return redirect('/questions/'. $question->id);
    }
}
