<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;
use App\Document;
use App\User;
use Illuminate\Support\Facades\Auth;

class DocumentController extends Controller
{
    public function index(Document $document, User $user)
    {
        return view('Document.index')->with([
            'documents' => $document->get(),
            'staffs' => $user->where('is_admin', 'staff')->get(),
        ]);
    }
    
    public function show(Document $document, User $user)
    {
        $author = $user->find($document['user_id']);
        $questions = $document->questions()->get();
        return view('Document.show')->with([
            'document' => $document,
            'author_name' => $author->name,
            'questions' => $questions,
        ]);
    }
    
    public function create()
    {
        return view('Document.create')->with(['where' => '記事新規登録']);
    }
    
    public function store(Request $request, Document $document)
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
    
    public function edit(Document $document)
    {
        return view('Document.edit')->with(['document' => $document]);
    }
    
    public function update(Request $request, Document $document)
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
    
    public function delete(Document $document)
    {
        $document->delete();
        return redirect('/documents/index');
    }
}
