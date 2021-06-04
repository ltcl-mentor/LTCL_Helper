@extends('layouts.app')

@section('content')
    <!--CSS-->
    <link href="{{ asset('css/Mentor/Question/create.css') }}" rel="stylesheet">
    
    <!--HTML-->
    <div class="container">
        <a href="/mentor">管理ページ</a> > 質問新規登録
    </div>
    <form action="/questions/store" method="post">
        @csrf
        <!--React-->
        <div id="Create"></div>
    </form>
    
    <!--reactに受け渡す値（viewには非表示）-->
    <div id="question_validation" class="hidden">{{ $errors->first('post.question') }}</div>
    <div id="question_old" class="hidden">{{ old('post.question') }}</div>
    <div id="comment_validation" class="hidden">{{ $errors->first('post.comment') }}</div>
    <div id="comment_old" class="hidden">{{ old('post.comment') }}</div>
    
@endsection
