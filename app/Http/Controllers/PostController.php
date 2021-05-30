<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;
use App\Document;
use App\User;
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
        $question->users()->attach(Auth::id());
        $documents = $question->documents()->get();
        $category = ['カリキュラム', '成果物'];
        $topic = ['AWS', 'HTML', 'CSS', 'JavaScript', 'PHP', 'Laravel', 'DB', 'Git&GitHub', '環境構築', '設計図', 'デプロイ', 'API'];
        return view('Search.show')->with([
            'question' => $question,
            'documents' => $documents,
            'category' => $category,
            'topic' => $topic,
        ]);
    }
    
    public function history()
    {
        $user = Auth::user();
        $questions = $user->questions()->get();
        return view('Search.history')->with(['questions' => $questions]);
    }
    
    //以下メンターのみがアクセス可能
    public function mentorTop()
    {
        return view('mentor');
    }
    
    
    //記事の登録に関する部分
    public function documentIndex(Document $document, User $user)
    {
        $staffs = $user->where('is_admin', 'stuff')->get();
        return view('Document.index')->with([
            'documents' => $document->get(),
            'staffs' => $staffs,
        ]);
    }
    
    public function documentShow(Document $document, User $user)
    {
        $staff = $user->where('id', $document['user_id'])->get();
        $questions = $document->questions()->get();
        return view('Document.show')->with([
            'document' => $document,
            'staffName' => $staff[0]['name'],
            'questions' => $questions,
        ]);
    }
    
    public function documentCreate()
    {
        return view('Document.create');
    }
    
    public function documentStore(Request $request, Document $document)
    {
        $validatedInput = $request->validate([
            'post.title' => 'required|max:50',
            'post.link' => 'required',
        ],
        [
            'post.title.required' => '記事のタイトルは必須です。',
            'post.title.max' => '記事のタイトルは字数制限50文字です。',
            'post.link.required' => '記事のリンクは必須です。',
        ]);
        $document['user_id'] = Auth::id();
        $document->fill($validatedInput['post'])->save();
        return redirect('/documents/index');
    }
    
    public function documentEdit(Document $document)
    {
        return view('Document.edit')->with(['document' => $document]);
    }
    
    public function documentUpdate(Request $request, Document $document)
    {
        $validatedInput = $request->validate([
            'post.title' => 'required|max:50',
            'post.link' => 'required',
        ],
        [
            'post.title.required' => '記事のタイトルは必須です。',
            'post.title.max' => '記事のタイトルは字数制限50文字です。',
            'post.link.required' => '記事のリンクは必須です。',
        ]);
        $document->fill($validatedInput['post'])->save();
        return redirect('documents/index');
    }
    
    public function userIndex(User $user)
    {
        // staffのスペルが違う
        $staffs = $user->where('is_admin', 'stuff')->get();
        $publics = $user->where('is_admin', null)->get();
        return view('user')->with([
            'staffs' => $staffs,
            'publics' => $publics,
        ]);
    }
    
    public function userDelete(User $user)
    {
        $user->delete();
        return redirect('/users/index');
    }
}
