<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\DocumentRequest;
use App\Question;
use App\Document;
use App\User;
use Illuminate\Support\Facades\Auth;

class DocumentController extends Controller
{
    // 一般に公開される部分
    
    // 公開中の参考記事一覧表示
    public function publicIndex()
    {
        return view('Public.Document.index');
    }
    
    
    // 以下メンターのみがアクセス可能
    
    // 初期画面表示
    public function index()
    {
        return view('Mentor.Document.index');
    }
    
    // 新規作成画面表示
    public function create()
    {
        return view('Mentor.Document.create')->with(['where' => '記事新規登録']);
    }
    
    // 新規作成実行
    public function store(DocumentRequest $request, Document $document)
    {
        $document['user_id'] = Auth::id();
        $document->fill($request['post'])->save();
        return redirect('/documents/index');
    }
    
    // 詳細画面表示
    public function show(Document $document, User $user)
    {
        $author = $user->find($document['user_id']);
        
        if($author){
            $author_name = $author->name;
        } else{
            $author_name = null;
        }
        
        $questions = $document->questions()->get();
        
        return view('Mentor.Document.show')->with([
            'document' => $document,
            'author_name' => $author_name,
            'questions' => $questions,
        ]);
    }
    
    // 編集画面表示
    public function edit(Document $document)
    {
        return view('Mentor.Document.edit')->with(['document' => $document]);
    }
    
    // 編集実行
    public function update(DocumentRequest $request, Document $document)
    {
        $document->fill($request['post'])->save();
        
        return redirect('documents/index');
    }
    
    // 削除実行
    public function delete(Document $document)
    {
        $document->delete();
        
        Document::documentForceDelete();
        
        return redirect('/documents/index');
    }
}
