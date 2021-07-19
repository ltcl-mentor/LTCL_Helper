@extends('layouts.app')

@section('content')
    <!--CSS-->
    <link href="{{ asset('css/Mentor/index.css') }}" rel="stylesheet">
    
    <!--HTML-->
    <div class="container">
        <div><a href="/mentor">管理ページ</a> > 記事一覧</div>
        @foreach($staffs as $staff)
            <div class="content">
                <details>
                    <summary class="title">{{ $staff->name }}  ({{ $documents->where('user_id', $staff->id)->count() }}件)</summary>
                    @foreach($documents as $document)
                        @if($document->user_id === $staff->id)
                            <div class="document">
                                ・<a href="/documents/{{ $document->id }}">{{ $document->title }}</a>
                            </div>
                        @endif
                    @endforeach
                </details>
            </div>
        @endforeach
    </div>
    
@endsection
