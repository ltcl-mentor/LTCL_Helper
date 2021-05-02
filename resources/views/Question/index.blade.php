@extends('layouts.app')

@section('content')    
    <a href="/mentor">トップに戻る</a>
    <div class="questions">
        <div class="checked">
            <h2>認証済み</h2>
            {{$checked_AWS_questions}}
            @foreach($checked_questions as $question)
                <div class="content">
                    <div class="question">
                        <a href="/questions/{{$question->id}}">{{$question->question}}</a>
                    </div>
                </div>
            @endforeach
        </div>
        <div class="checked">
            <h2>認証待ち</h2>
            @foreach($unchecked_questions as $question)
                <div class="content">
                    <div class="details">
                        カテゴリー：{{$category[$question->category]}}、ジャンル：{{$genre[$question->genre]}}、該当カリキュラム：{{$question->curriculum_number}}
                    </div>
                    <div class="question">
                        質問：{{$question->question}}
                    </div>
                    <div class="comment">
                        @if($question->comment)
                            コメント：{{$question->comment}}
                        @else
                            <p style="color:red">質問の公開にはコメントの入力が必要です。</p>
                        @endif
                    </div>
                    <div class="edit">
                        <a href="/questions/{{$question->id}}/edit">編集する</a>
                    </div>
                    <div class="approval">
                        @if($question->user_id=== Auth::user()->id)
                            <p style="color:red">作成者以外からの承認が必要です。</p>
                        @else
                            <a href="/questions/{{$question->id}}/check">承認する</a>
                        @endif
                    </div>
                </div>
            @endforeach
        </div>
    </div>
@endsection
