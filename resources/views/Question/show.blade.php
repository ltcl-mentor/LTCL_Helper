@extends('layouts.app')

@section('content')    
    <!--CSS-->
    <link href="{{ asset('css/Mentor/show.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/Search/show.css') }}">
    
    
    <!--HTML-->
    <div class="container">
        <div>
            <a href="/mentor">管理ページ</a> > <a href="/questions/index">質問一覧</a> > 質問詳細
        </div>
        <div id="Show" question_id="{{ $question_id }}"></div>
    </div>
    
@endsection
