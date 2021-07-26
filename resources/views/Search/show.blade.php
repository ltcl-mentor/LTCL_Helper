@extends('layouts.app')

@section('content')    
    <!--CSS-->
    <link rel="stylesheet" href="{{ asset('css/Search/show.css') }}">
    
    <!--HTML-->
    <div id="Public_Show" question_id={{ $question->id }}></div>
@endsection
