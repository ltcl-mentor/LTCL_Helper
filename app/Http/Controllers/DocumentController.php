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
    public function index(Document $document, User $user)
    {
        return view('Document.index')->with([
            'documents' => $document->get(),
            'staffs' => $user->where('is_admin', 'staff')->get(),
        ]);
    }
    
    public function show(Document $document, User $user)
    {
        if($user->find($question['user_id'])){
            $author = $user->find($question['user_id']);
            $author_name = $author->name;
        } else{
            $author_name = null;
        }
        $questions = $document->questions()->get();
        return view('Document.show')->with([
            'document' => $document,
            'author_name' => $author_name,
            'questions' => $questions,
        ]);
    }
    
    public function create()
    {
        return view('Document.create')->with(['where' => '記事新規登録']);
    }
    
    public function store(DocumentRequest $request, Document $document)
    {
        $document['user_id'] = Auth::id();
        $document->fill($request['post'])->save();
        return redirect('/documents/index');
    }
    
    public function edit(Document $document)
    {
        return view('Document.edit')->with(['document' => $document]);
    }
    
    public function update(DocumentRequest $request, Document $document)
    {
        $document->fill($request['post'])->save();
        return redirect('documents/index');
    }
    
    public function delete(Document $document)
    {
        $document->delete();
        return redirect('/documents/index');
    }
}
