@extends('layouts.app')

@section('content')
    <!--CSS-->
    <link href="{{ asset('css/Mentor/Question/create.css') }}" rel="stylesheet">
    
    <!--HTML-->
    <div class="container">
        <a href="/mentor">管理ページ</a> > 質問新規登録
    </div>
    <form action="/questions/store" method="post" id="create">
        @csrf
        <!--React-->
        <div id="Create"></div>
    </form>
    
@endsection
