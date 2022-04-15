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
    /** 共通処理 */
    
    /**
     * 公開中の参考記事一覧表示
     */
    // public function publicIndex()
    // {
    //     return view('Public.Document.index');
    // }
    
    
    
    /** 管理者用処理 */
    
    /**
     * 新規作成実行
     */
    public function store(DocumentRequest $request, Document $document)
    {
        // リクエスト情報の挿入
        $input['title'] = $request['title'];
        $input['link'] = $request['link'];
        $input['beginner'] = $request['targets']['beginner'];
        $input['amature'] = $request['targets']['amature'];
        $input['master'] = $request['targets']['master'];
        $input['all'] = $request['targets']['all'];
        
        // 記事作成者の挿入
        $input['user_id'] = Auth::id();
        
        $document->fill($input)->save();
        logger($document);

        return ["id" => $document->id];
    }
    
    /**
     * 編集実行
     */
    public function update(DocumentRequest $request, Document $document)
    {
        // リクエスト情報の挿入
        $input['title'] = $request['title'];
        $input['link'] = $request['link'];
        $input['beginner'] = $request['targets']['beginner'];
        $input['amature'] = $request['targets']['amature'];
        $input['master'] = $request['targets']['master'];
        $input['all'] = $request['targets']['all'];

        $document->fill($input)->save();

        return ["id" => $document->id];
    }
    
    /**
     * 削除実行
     */
    public function delete(Document $document)
    {
        // 対象を論理削除
        $document->delete();
        
        // 過去に論理削除されたデータの中で３ヶ月経過したものを物理削除
        Document::documentForceDelete();
    }
    
    /**
     * 初期画面表示
     */
    // public function index()
    // {
    //     return view('Mentor.Document.index');
    // }
    
    /**
     * 新規作成画面表示
     */
    // public function create()
    // {
    //     return view('Mentor.Document.create')->with(['where' => '記事新規登録']);
    // }
    
    /**
     * 詳細画面表示
     */
    // public function show(Document $document, User $user)
    // {
    //     $author = $user->find($document['user_id']);
        
    //     if($author){
    //         $author_name = $author->name;
    //     }else{
    //         $author_name = null;
    //     }
        
    //     $questions = $document->questions()->get();
        
    //     return view('Mentor.Document.show')->with([
    //         'document' => $document,
    //         'author_name' => $author_name,
    //         'questions' => $questions,
    //     ]);
    // }
    
    /**
     * 編集画面表示
     */
    // public function edit(Document $document)
    // {
    //     return view('Mentor.Document.edit')->with(['document' => $document]);
    // }
}
