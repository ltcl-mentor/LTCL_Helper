@extends('layouts.app')

@section('content')    
    <a href="/questions/index">質問一覧へ</a>
    <div class="details">
        <h2>質問詳細</h2>
        <div class="question">
            質問内容：{{$question->question}}
        </div>
        <div class="comment">
            コメント：{{$question->comment}}
        </div>
        <div class="edit">
            <a href="/questions/{{$question->id}}/edit">編集する</a>
        </div>
    </div>
    <div class="documents">
        <h2>関連記事</h2>
        @if(count($documents)!=0)
            @foreach($documents as $document)
                <a href="{{$document->link}}">{{$document->title}}</a>
            @endforeach
        @else
            <div>関連する記事はありません。</div>
        @endif
    </div>
@endsection
