<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\QuestionRequest;
use App\Question;
use App\Document;
use App\User;
use App\Image;
use App\History;
use App\Slack;
use Storage;
use Illuminate\Support\Facades\Auth;

class QuestionController extends Controller
{
    // 一般に公開される部分
    
    // 公開中の質問一覧表示
    public function publicIndex()
    {
        return view('Public.Question.index');
    }
    
    // 質問詳細画面表示
    public function publicShow(Question $question)
    {
        // 質問閲覧履歴への記録
        $question->users()->attach(Auth::id());
        
        // データベースの容量を考慮して履歴保持の期限は２１日間とする
        History::historyDelete(21);
        
        return view('Public.Question.show')->with([
            'question_id' => $question->id,
            'category' => $question->category,
            'topic' => $question->topic,
        ]);
    }
    
    public function publicCreate()
    {
        return view('Public.Question.create');
    }
    
    public function publicStore(QuestionRequest $request, Question $question)
    {
        // 質問に関する処理
        $question->fill($request['post']);
        $question['check'] = false;
        $question['user_id'] = 1;
        $question->save();
        
        // 画像に関する処理
        $pictures = $request->file('image');
        if($pictures){
            Image::imageCreate($pictures, $question->id);
        }
        
        $message = "受講生によって質問が投稿されました。\n以下のリンクから確認してください。\nhttps://~/" . $question->id;
        Slack::sendMessage($message);
        
        return redirect('/');
    }
    
    // 以下メンターのみがアクセス可能
    
    // 初期画面表示
    public function index(Question $question)
    {
        return view('Mentor.Question.index');
    }
    
    // 新規作成画面表示
    public function create()
    {
        return view('Mentor.Question.create');
    }
    
    // 新規作成実行
    public function store(QuestionRequest $request, Question $question)
    {
        // 質問に関する処理
        $question->fill($request['post']);
        $question['check'] = false;
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
        return view('Mentor.Question.show')->with(['question_id' => $question->id]);
    }
    
    // 編集画面表示
    public function edit(Question $question)
    {
        return view('Mentor.Question.edit')->with(['question_id' => $question->id]);
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
    
    // 公開処理
    public function check(Question $question)
    {
        $question['check'] = true;
        $question->save();
        return redirect('/questions/'. $question->id);
    }
    
    // 非公開処理
    public function uncheck(Question $question)
    {
        $question['check'] = false;
        $question->save();
        return redirect('/questions/'. $question->id);
    }
}
