<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
        $documents = $question->documents()->get();
        $category = ['カリキュラム', '成果物'];
        $topic = ['AWS', 'HTML', 'CSS', 'JavaScript', 'PHP', 'Laravel', 'DB', 'Git&GitHub', '環境構築', '設計図', 'デプロイ', 'API'];
        $userName = $user->select('name')->find($question['user_id']);
        $isChecked = $question['check'];
        return view('Question.show')->with([
            'question' => $question,
            'documents' => $documents,
            'category' => $category,
            'topic' => $topic,
            'userName' => $userName['name'],
            'isChecked' => $isChecked,
        ]);
    }
    
    public function create()
    {
        return view('Question.create');
    }
    
    public function store(Request $request, Question $question)
    {
        $validatedInput = $request->validate([
            'post.category' => 'required',
            'post.topic' => 'required',
            'post.curriculum_number' => 'required|max:5',
            'post.question' => 'required|string',
            'post.comment' => 'required|string',
        ],
        [
            'post.question.required' => '質問内容の入力は必須です。',
            'post.comment.required' => 'コメントの入力は必須です。保留の場合は保留と入力してください。',
        ]);
        $question->fill($validatedInput['post']);
        $question['check'] = 0;
        $question['user_id'] = Auth::id();
        $question->save();
        return redirect('/questions/index');
    }
    
    public function edit(Question $question)
    {
        $category = ['カリキュラム', '成果物'];
        $topic = ['AWS', 'HTML', 'CSS', 'JavaScript', 'PHP', 'Laravel', 'DB', 'Git&GitHub', '環境構築', '設計図', 'デプロイ', 'API'];
        return view('Question.edit')->with([
            'question' => $question,
            'category' => $category,
            'topic' => $topic,
        ]);
    }
    
    public function update(Request $request, Question $question)
    {
        $validatedInput = $request->validate([
            'post.category' => 'required',
            'post.topic' => 'required',
            'post.curriculum_number' => 'required|max:5',
            'post.question' => 'required|string',
            'post.comment' => 'required|string',
        ],
        [
            'post.question.required' => '質問内容の入力は必須です。',
            'post.comment.required' => 'コメントの入力は必須です。保留の場合は保留と入力してください。',
        ]);
        $question->fill($validatedInput['post']);
        $question->save();
        return redirect('/questions/'. $question->id);
    }
    
    public function delete(Question $question)
    {
        $question->delete();
        return redirect('/questions/index');
    }
    
    public function approval(Question $question)
    {
        // 余計な処理多数→削除
        $category = ['カリキュラム', '成果物'];
        $topic = ['AWS', 'HTML', 'CSS', 'JavaScript', 'PHP', 'Laravel', 'DB', 'Git&GitHub', '環境構築', '設計図', 'デプロイ', 'API'];
        $unchecked_questions = $question->where('check',0)->get();
        $checked_questions = $question->where('check',1)->get();
        return view('Question.approval')->with([
            'checked_questions' => $checked_questions,
            'checked_AWS_questions' => $checked_AWS_questions=Question::getCheckedParticalQuestion(0,0),
            'unchecked_questions' => $unchecked_questions,
            'category' => $category,
            'topic' => $topic,
        ]);
    }
    
    public function check(Question $question)
    {
        $question['check'] = 1;
        $question->save();
        return redirect('/questions/approval');
    }
    
    public function uncheck(Question $question)
    {
        $question['check'] = 0;
        $question->save();
        return redirect('/questions/approval');
    }
}
