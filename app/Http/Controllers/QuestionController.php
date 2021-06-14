<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\QuestionRequest;
use App\Question;
use App\Document;
use App\User;
use Illuminate\Support\Facades\Auth;

class QuestionController extends Controller
{
    public function index(Question $question)
    {
        return view('Question.index');
    }
    
    public function show(Question $question, User $user)
    {
        if($user->find($question['user_id'])){
            $author = $user->find($question['user_id']);
            $author_name = $author->name;
        } else{
            $author_name = null;
        }
        return view('Question.show')->with([
            'question' => $question,
            'documents' => $question->documents()->get(),
            'category' => Question::$category,
            'topic' => Question::$topic,
            'author_name' => $author_name,
            'isChecked' => $question['check'],
        ]);
    }
    
    public function create()
    {
        return view('Question.create');
    }
    
    public function store(QuestionRequest $request, Question $question)
    {
        $question->fill($request['post']);
        $question['check'] = 0;
        $question['user_id'] = Auth::id();
        $question->save();
        return redirect('/questions/index');
    }
    
    public function edit(Question $question)
    {
        return view('Question.edit')->with([
            'question_id' => $question->id,
        ]);
    }
    
    public function update(QuestionRequest $request, Question $question)
    {
        $question->fill($request['post']);
        $question->save();
        return redirect('/questions/'. $question->id);
    }
    
    public function delete(Question $question)
    {
        $question->delete();
        Question::questionForceDelete();
        return redirect('/questions/index');
    }
    
    public function approval(Question $question)
    {
        return view('Question.approval');
    }
    
    public function check(Question $question)
    {
        $question['check'] = 1;
        $question->save();
        $questions = Question::where('check', 0)->get();
        return response()->json($questions);
    }
    
    public function uncheck(Question $question)
    {
        $question['check'] = 0;
        $question->save();
        $questions = Question::where('check', 1)->get();
        return response()->json($questions);
    }
}
