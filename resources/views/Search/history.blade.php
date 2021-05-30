@extends('layouts.app')

@section('content')    
    <div class="container">
        <h1>閲覧履歴</h1>
        <div class="questions">
            @foreach($questions as $question)
                <div class="question">
                    <a href="/show/{{ $question->id }}">{{ $question->question }}</a>
                </div>
            @endforeach
        </div>
    </div>
@endsection
