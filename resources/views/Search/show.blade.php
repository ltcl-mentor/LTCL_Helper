@extends('layouts.app')

@section('content')    
    <!--CSS-->
    <link rel="stylesheet" href="{{ asset('css/Search/show.css') }}">
    
    <!--HTML-->
    <div id="Question_public_show" question_id="{{ $question_id }}" category="{{ $category }}" topic="{{ $topic }}"></div>
@endsection
