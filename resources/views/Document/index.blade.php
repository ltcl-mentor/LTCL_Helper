@extends('layouts.app')

@section('content')
    <!--CSS-->
    <link href="{{ asset('css/Mentor/index.css') }}" rel="stylesheet">
    
    <!--HTML-->
    <div class="container">
        @foreach($staffs as $staff)
            <div class="content">
                <h1 class="title">{{ $staff->name }}</h1>
                @foreach($documents as $document)
                    @if($document->user_id === $staff->id)
                        <div class="document">
                            ・<a href="/documents/{{ $document->id }}">{{ $document->title }}</a>
                        </div>
                    @endif
                @endforeach
            </div>
        @endforeach
    </div>
    
@endsection
