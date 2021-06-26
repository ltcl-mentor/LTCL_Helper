@extends('layouts.app')

@section('content')    
    <!--CSS-->
    <link href="{{ asset('css/Mentor/show.css') }}" rel="stylesheet">
    
    <!--HTML-->
    <div class="container">
        <div>
            <a href="/mentor">管理ページ</a> > <a href="/documents/index">記事一覧</a> > 記事詳細
        </div>
        <div class="title">
            <h1>記事詳細</h1>
            <a href="/documents/{{ $document->id }}/edit">編集する</a>
            <form action="/documents/{{ $document->id }}/delete" method="post">
                @csrf
                <input type="submit" class="hidden">
                <p onclick="deleteConfirm()" class="deleteBtn">削除する</p>
            </form>
        </div>
        
        <div class="table">
            <h2 class="columns">タイトル</h2>
            <div class="parameters">{{ $document->title }}</div>
            
            <h2 class="columns">記事URL</h2>
            <div class="parameters"><a href="{{ $document->link }}">{{ $document->link }}</a></div>
        
            <h2 class="columns">作成者</h2>
            @if($author_name)
                <div class="parameters word">{{ $author_name }}</div>
            @else
                <div class="parameters word">削除されたユーザー</div>
            @endif
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
