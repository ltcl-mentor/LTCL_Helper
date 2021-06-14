@extends('layouts.app')

@section('content')    
    <!--CSS-->
    <link href="{{ asset('css/Mentor/show.css') }}" rel="stylesheet">
    
    <!--HTML-->
    <div class="container">
        <div>
            <a href="/mentor">管理ページ</a> > <a href="/questions/index">質問一覧</a> > 質問詳細
        </div>
        <div class="title">
            <h1>質問詳細</h1>
            <a href="/questions/{{ $question->id }}/edit">編集する</a>
            <form action="/questions/{{ $question->id }}/delete" method="post" id="delete">
                @csrf
                <input type="submit" class="hidden">
                <p onclick="deleteConfirm()" class="deleteBtn">削除する</p>
            </form>
        </div>
        
        <div class="table">
            <h2 class="columns">カテゴリー</h2>
            <div class="parameters word">{{ $category[$question->category] }}</div>
            
            <h2 class="columns">トピック</h2>
            <div class="parameters word">{{ $topic[$question->topic] }}</div>
        
            <h2 class="columns">カリキュラム番号</h2>
            <div class="parameters word">{{ $question->curriculum_number }}</div>
        
            <h2 class="columns">作成者</h2>
            @if($author_name)
                <div class="parameters word">{{ $author_name }}</div>
            @else
                <div class="parameters word">削除されたユーザー</div>
            @endif
            
            <h2 class="columns">承認状況</h2>
            @if($isChecked===1)
                <div class="parameters word">承認済み</div>
            @else
                <div class="parameters word">未承認</div>
            @endif
        
            <h2 class="columns">質問内容</h2>
            <div class="parameters">{{ $question->question }}</div>
        
            <h3 class="columns">コメント</h3>
            <div class="parameters">{{ $question->comment }}</div>
        </div>
        
        <div>
            <div class="title">
                <h1>関連記事</h1>
                <a href="/links/question/{{ $question->id }}">編集する</a>
            </div>
            @if(count($documents)!=0)
                @foreach($documents as $document)
                    <div class="document">・<a href="/documents/{{ $document->id }}">{{ $document->title }}</a></div>
                @endforeach
            @else
                <div class="emptyMessage">関連する記事はありません。</div>
            @endif
        </div>
    </div>
    
@endsection
