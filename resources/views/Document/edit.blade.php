@extends('layouts.app')

@section('content') 
<form action="/documents/{{$document->id}}/update" method="post">
    @csrf
    <div class="title">
        <h2>記事のタイトル</h2>
        <input name="document[title]" type="text" value="{{$document->title}}">
    </div>
    <div class="link">
        <h2>記事のリンク</h2>
        <input name="document[link]" type="text" value="{{$document->link}}">
    </div>
    <input type="submit" value="更新">
</form>
@endsection
