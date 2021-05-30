@extends('layouts.app')

@section('content')    
    <!--CSS-->
    <link href="{{ asset('css/Mentor/Document/show.css') }}" rel="stylesheet">
    
    <!--HTML-->
    <div class="container">
        <div class="title">
            <h1>記事詳細</h1>
            <a href="/documents/{{ $document->id }}/edit">編集する</a>
            <form action="/documents/{{ $document->id }}/delete" method="post">
                @csrf
                <a><input type="submit" value="削除する" class="submit"></a>
            </form>
        </div>
        
        <div class="table">
            <h2 class="columns">タイトル</h2>
            <div class="parameters">{{ $document->title }}</div>
            
            <h2 class="columns">記事URL</h2>
            <div class="parameters"><a href="{{ $document->link }}">{{ $document->link }}</a></div>
        
            <h2 class="columns">作成者</h2>
            <div class="parameters word">{{ $staffName }}</div>
        </div>
        
        <div>
            <div class="title">
                <h1>関連質問</h1>
                <a href="/links/document/{{ $document->id }}">編集する</a>
            </div>
            @if(count($questions)!=0)
                @foreach($questions as $question)
                    <div class="question">・<a href="/questions/{{ $question->id }}">{{ $question->question }}</a></div>
                @endforeach
            @else
                <div class="emptyMessage">関連する記事はありません。</div>
            @endif
        </div>
    </div>
    
@endsection
