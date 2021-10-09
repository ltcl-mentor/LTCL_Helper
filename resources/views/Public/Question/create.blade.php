@extends('layouts.app')

@section('content')
    <!--CSS-->
    <link href="{{ asset('css/Mentor/Question/create.css') }}" rel="stylesheet">
    
    <!--HTML-->
    <div class="container">
        <a href="/mentor">管理ページ</a> > 質問新規登録
    </div>
    <form action="/questions/store/public" method="post" id="create" enctype="multipart/form-data">
        @csrf
        <!--React-->
        <div id="Question_public_create"></div>
    </form>
    
@endsection
