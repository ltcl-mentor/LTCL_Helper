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
            <h1 class="title">記事詳細</h1>
            <a href="/documents/{{ $document->id }}/edit" class="editBtn">編集する</a>
            <form action="/documents/{{ $document->id }}/delete" method="post">
                @csrf
                <input type="submit" class="hidden">
                <p onclick="deleteConfirm()" class="deleteBtn">削除する</p>
            </form>
        </div>
        
        <div class="table_q_detail">
            <h2 class="columns_q_detail">タイトル</h2>
            <div class="parameters_q_detail">{{ $document->title }}</div>
            
            <h2 class="columns_q_detail">記事URL</h2>
            <div class="parameters_q_detail"><a href="{{ $document->link }}">{{ $document->link }}</a></div>
        
            <h2 class="columns_q_detail">作成者</h2>
            @if($author_name)
                <div class="parameters_q_detail word">{{ $author_name }}</div>
            @else
                <div class="parameters_q_detail word">削除されたユーザー</div>
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
