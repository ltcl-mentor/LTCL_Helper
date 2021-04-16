@extends('layouts.app')

@section('content')    
    <a href="/mentor">トップに戻る</a>
    <div class="documents">
        @foreach($documents as $document)
            <div class="document">
                <h2>・{{$document->title}}</h2>
                <!--詳細ページへのリンクをここに-->
            </div>
            <div class="edit">
                <a href="/documents/{{$document->id}}/edit">編集する</a>
            </div>
        @endforeach
    </div>
@endsection
