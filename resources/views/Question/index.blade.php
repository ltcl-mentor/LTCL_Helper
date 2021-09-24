@extends('layouts.app')

@section('content')
    <!--CSS-->
    <link href="{{ asset('css/Mentor/index.css') }}" rel="stylesheet">
    
    <!--React-->
    <div class="container">
        <div><a href="/mentor">管理ページ</a> > 質問一覧</div>
        <div id="Question_mentor_index"></div>
    </div>

@endsection
