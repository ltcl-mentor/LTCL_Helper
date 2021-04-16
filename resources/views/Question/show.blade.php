@extends('layouts.app')

@section('content')    
    <a href="/mentor">質問一覧へ</a>
    <div class="question">
        <h2>{{$question->question}}</h2>
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
