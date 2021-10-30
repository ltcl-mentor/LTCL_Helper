@extends('layouts.app')

@section('content')
    <!--CSS-->
    <link href="{{ asset('css/Mentor/Question/create.css') }}" rel="stylesheet">
    
    <!--HTML-->
    <div class="container">
        <a href="/mentor">管理ページ</a> > <a href="/questions/index">質問一覧</a> > <a href="/questions/{{ $question_id }}">質問詳細</a> > 質問編集
    </div>
    
        <!--React-->
        <div id="Question_mentor_edit" question_id="{{ $question_id }}"></div>
    
    
@endsection
