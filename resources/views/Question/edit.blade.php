@extends('layouts.app')

@section('content')
    <!--CSS-->
    <link href="{{ asset('css/Mentor/Question/create.css') }}" rel="stylesheet">
    
    <!--HTML-->
    <form action="/questions/{{ $question_id }}/update" method="post">
        @csrf
        <!--React-->
        <div id="Edit"></div>
    </form>
    
    <!--reactに受け渡す値（viewには非表示）-->
    <div id="question_id" class="hidden">{{ $question_id }}</div>
    <div id="question_validation" class="hidden">{{ $errors->first('post.question') }}</div>
    <div id="comment_validation" class="hidden">{{ $errors->first('post.comment') }}</div>

@endsection
