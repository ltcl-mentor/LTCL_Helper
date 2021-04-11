@extends('layouts.app')

@section('content')    
    <div class="document">
        <h2>登録した記事の内容はこちら</h2>
        <div class="title">
            記事タイトル：{{$document->title}}
        </div>
        <div class="link">
            <a href="{{$document->link}}">記事を確認する</a>
        </div>
    </div>
    <div class="questions">
        <h2>関連質問を選択する</h2>
        <form action="/storeLinks/{{$document->id}}" method="POST">
            @csrf
            @foreach($questions as $question)
                <div class="question">
                    <label><input type="checkbox" name="question_id[]" value="{{$question->id}}">{{$question->question}}</label>
                </div>
            @endforeach
            <button type="submit">確定する</button>
        </form>
    </div>
@endsection
